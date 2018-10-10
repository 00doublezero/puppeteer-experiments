import PuppeteerPage from "../PuppeteerPage";
import logger from "../../loggerConfig"
export default class TweetdeckTimelinePage extends PuppeteerPage {
    protected towHitch: string = `div.js-chirp-container.chirp-container`;

    async observeToImages() {

        this.page.on('console', msg => {
            for (let i = 0; i < msg.args().length; ++i)
                console.log(`${i}: ${msg.args()[i]}`);
        });
        logger.info("StartObserve")
        await this.page.evaluate(() => {
            let i = 0;
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
            const obs = observeMutations(document.querySelector(`div.js-chirp-container`), (muts: any) => {
                i++;
                if (muts.target.querySelector(`article`)) {
                    let tweet: any = {}
                    const retweetOrNot = muts.target.querySelectorAll(`.nbfc`).length > 2
                    //const elementName = muts.target.querySelector(``)
                    tweet['name'] = muts.target.querySelectorAll(`.nbfc`)[0].querySelector("b").textContent
                    if (retweetOrNot) tweet['retweeted'] = muts.target.querySelector(`article`).querySelectorAll(`.nbfc`)[1].querySelector(`.username.txt-mute`).textContent.slice(1)
                    tweet['message'] = muts.target.querySelector(`article`).querySelector(`.js-tweet-text.tweet-text`).innerHTML
                    tweet['images'] = muts.target.querySelector(`article`).querySelectorAll(`.js-media-image-link`).map((image: any) => { image.outerHTML })
                    console.dir(tweet);
                }
            });
            console.dir(i)
        })
        logger.info("End Observe")

    };
}

