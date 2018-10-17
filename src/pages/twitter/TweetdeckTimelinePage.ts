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
            <html>
                <head>
                <script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@8.17.0/dist/lazyload.min.js"></script>
                     <style>.emoji{width:17px; height:17px}</style>
                     <meta charset="utf-8">
                     <script>
                     var myLazyLoad = new LazyLoad();
                     setTimeout(function(){ myLazyLoad.update(); console.log(1) }, 3000);
                     </script>
                </head>
                <body>
                <div style="margin: 0 auto 2rem; width: 99%; max-width: 105ch;">

        `);
        logger.info("Start Observer");
        this.page.on('console', async msg => {
            let htmlString: String;
            for (let i = 0; i < msg.args().length; ++i) {
                const asd = JSON.parse(`${msg.args()[i]}`.slice(9));
                const rtwtd: boolean = asd.retweeted ? true : false;
                let tweetStyle = '';
                if (rtwtd) {
                    if (followingArray.indexOf(asd.retweeted) === -1) {
                        tweetStyle = 'style="margin-bottom: 1rem;padding: .5rem .5rem .5rem 70px;background-color:rgba(236, 240, 241,0.8);border: 1px solid rgba(0,137,255,.3);"'
                    } else {
                        tweetStyle = 'style="margin-bottom: 1rem;padding: .5rem .5rem .5rem 70px;background-color:rgba(241, 196, 15,0.2)"'
                    }
                } else {
                    tweetStyle = 'style="margin-bottom: 1rem;padding: .5rem .5rem .5rem 70px;background-color:rgba(241, 196, 15,0.2)"'
                }
                htmlString = await `<div ${tweetStyle}>
                                        <span><a href="${asd.link}">${asd.name}</a></span> / <br>
                                        <span style="margin-bottom: 0.4rem;">${rtwtd ? '<a href="https://twitter.com/' + asd.retweeted + '">' + asd.retweeted + '</a>' : ''}</span>
                                        <div style="margin-bottom: 0.4rem;">${asd.message}</div>
                                        <div>${asd.images.map((image: any) => '<a href="' + image + '" target="_blank"><img class="lazy" style="max-height: 260px; display:inline-block;" data-src="' + image + '"></a>')}</div>
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

