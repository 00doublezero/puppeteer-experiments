import PuppeteerLaunchSetup from "../../pages/PuppeteerLaunchSetup";
import loginData from "./loginData";
import TwitterLoginPage from "../../pages/twitter/TwitterLoginPage";
import TwitterTimelinePage from "../../pages/twitter/TwitterTimelinePage";
import TwitterFollowingPage from "../../pages/twitter/TwitterFollowingPage"
import TweetdeckTimelinePage from "../../pages/twitter/TweetdeckTimelinePage";

(async () => {
    const puppeteerLaunchSetup = new PuppeteerLaunchSetup();
    const page = await puppeteerLaunchSetup.setup();

    let userName: string = '';
    let followingLis: Array<string> = []
    {
        const twitterLoginPAge = new TwitterLoginPage(page);
        await twitterLoginPAge.open("https://twitter.com/login");
        await twitterLoginPAge.waitUntilPageLoaded();
        await twitterLoginPAge.submitLoginForm(loginData)
    }
    {
        const twitterTimelinePage = new TwitterTimelinePage(page);
        await twitterTimelinePage.waitUntilPageLoaded();
        userName = await twitterTimelinePage.getTwitterName();
    }
    {
        const twitterFollowingPage = new TwitterFollowingPage(page);
        await twitterFollowingPage.open(`https://twitter.com/${userName}/following`);
        await twitterFollowingPage.waitUntilPageLoaded();
        await twitterFollowingPage.scrollDownPage();
        followingLis = await twitterFollowingPage.getFollowingsList(true);
        //console.log(followingLis);
    }
    {
        const tweetdeckTimelinePage = new TweetdeckTimelinePage(page);
        await tweetdeckTimelinePage.open(`https://tweetdeck.twitter.com/`);
        await tweetdeckTimelinePage.waitUntilPageLoaded();
    }
    await puppeteerLaunchSetup.quit();
})();
