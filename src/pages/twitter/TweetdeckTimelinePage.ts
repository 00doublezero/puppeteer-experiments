import PuppeteerPage from "../PuppeteerPage";
import logger from "../../loggerConfig";
import uuidv4 from 'uuid/v4';
import fs from 'fs';

export default class TweetdeckTimelinePage extends PuppeteerPage {
    protected towHitch: string = `div.js-chirp-container.chirp-container`;

    async observeToImages(followingArray: any) {
        let uuid = await uuidv4();
        fs.appendFileSync(uuid + ".html", `
        <!DOCTYPE html>
            <html><head><meta charset="utf-8"></head><body>
        `);
        logger.info("Start Observer");
        this.page.on('console', msg => {

            for (let i = 0; i < msg.args().length; ++i) {
                const asd = JSON.parse(`${msg.args()[i]}`.slice(9));
                const rtwtd: boolean = asd.retweeted ? true : false;
                // let inFollowingList: boolean;
                // if (rtwtd) {
                //     followingArray.indexOf(asd.retweeted) === -1 ? inFollowingList = true : inFollowingList = false;
                // }
                //console.log(asd.link);
                let htmlString = `<div ${followingArray.indexOf(asd.retweeted) === -1 ? 'style="background-color:rgba(236, 240, 241,0.8);border: 1px solid rgba(0,137,255,.3);"' : 'style="background-color:#rgba(241, 196, 15,0.7)"'}>
                                        <span><a href="${asd.link}">${asd.name}</a></span> / <br>
                                        <span>${rtwtd ? '<a href="https://twitter.com/' + asd.retweeted + '">' + asd.retweeted + '</a>' : ''}</span>
                                        <div>${asd.message}</div>
                                        <div>${asd.images.map((image: any) => '<img src="' + image + '">')}</div>
                                    </div>`;
                fs.appendFileSync(uuid + ".html", htmlString);
            }
        });
        return this.page.evaluate(() => {
            return new Promise((resolve, rejects) => {
                let tweetStack = document.body.querySelector(`div.js-chirp-container.chirp-container`);
                let urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm;
                const observeMutations = (element: any, callback: Function, options?: Object) => {
                    const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
                    observer.observe(element,
                        Object.assign(
                            {
                                childList: true,
                                subtree: true
                            }, options)
                    );
                    return observer;
                };
                const obs = observeMutations(tweetStack, (tweetpost: any) => {
                    if (tweetpost.target.querySelector(`article`)) {
                        let j = 0;
                        let tweetsList: any = {};
                        tweetsList['images'] = [];
                        const tweet = tweetpost.target.querySelector(`article`);
                        const retweetOrNot = tweet.querySelectorAll(`.nbfc`).length > 2;
                        tweetsList['name'] = tweet.querySelectorAll(`.nbfc`)[0].textContent;
                        tweetsList['message'] = tweet.querySelector(`.js-tweet-text.tweet-text`).innerHTML;
                        tweetsList['link'] = tweet.querySelector(`time.tweet-timestamp > a`).getAttribute("href");
                        Array.from(tweet.querySelectorAll(`.js-media-image-link`)).map((image: any) => {
                            tweetsList['images'][j] = image.outerHTML.match(urlRegexp).map((a: any) => { return a.slice(0, a.indexOf("?")) })[0];
                            j++;
                        });
                        if (retweetOrNot) {
                            tweetsList['retweeted'] = tweet.querySelectorAll(`.nbfc`)[1].querySelector(`.username.txt-mute`).textContent.slice(1)
                        }
                        console.dir(JSON.stringify(tweetsList));
                        if (0 > 10) {
                            resolve();
                        }
                    }
                });
            })
        })
    };
}

