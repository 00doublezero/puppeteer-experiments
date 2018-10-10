import PuppeteerLaunchSetup from "../../pages/PuppeteerLaunchSetup";
import loginData from "../twitter-timeline-image-scraper/loginData";
import TwitterLoginPage from "../../pages/twitter/TwitterLoginPage";
import TweetdeckTimelinePage from "../../pages/twitter/TweetdeckTimelinePage";
import TwitterTimelinePage from "../../pages/twitter/TwitterTimelinePage";

(async () => {
    const puppeteerLaunchSetup = new PuppeteerLaunchSetup();
    const page = await puppeteerLaunchSetup.setup();
    {
        const twitterLoginPAge = new TwitterLoginPage(page);
        await twitterLoginPAge.open("https://twitter.com/login");
        await twitterLoginPAge.waitUntilPageLoaded();
        await twitterLoginPAge.submitLoginForm(loginData)
    }
    {
        const twitterTimelinePage = new TwitterTimelinePage(page);
        await twitterTimelinePage.waitUntilPageLoaded();
    }
    {
        const tweetdeckTimelinePage = new TweetdeckTimelinePage(page);
        await tweetdeckTimelinePage.open(`https://tweetdeck.twitter.com/`);
        await tweetdeckTimelinePage.waitUntilPageLoaded();
        await tweetdeckTimelinePage.observeToImages();
    }
    {

    }
    await puppeteerLaunchSetup.quit();
})();

