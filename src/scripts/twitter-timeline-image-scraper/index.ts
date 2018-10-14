import PuppeteerLaunchSetup from "../../pages/PuppeteerLaunchSetup";
import loginData from "./loginData";
import TwitterLoginPage from "../../pages/twitter/TwitterLoginPage";
import TwitterTimelinePage from "../../pages/twitter/TwitterTimelinePage";
import TwitterFollowingPage from "../../pages/twitter/TwitterFollowingPage"
import TweetdeckTimelinePage from "../../pages/twitter/TweetdeckTimelinePage";
import fs from "fs";

(async () => {
    const puppeteerLaunchSetup = new PuppeteerLaunchSetup();
    const page = await puppeteerLaunchSetup.setup();
    let followingsFileName = "followings.json";
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
        if (fs.existsSync(followingsFileName)) {
            let buffer = fs.readFileSync(followingsFileName);
            followingLis = JSON.parse(buffer.toString());
        } else {
            await twitterFollowingPage.scrollDownPage();
            followingLis = await twitterFollowingPage.getFollowingsList(true);
            await fs.writeFile(followingsFileName, JSON.stringify(followingLis), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }

    }
    {
        const tweetdeckTimelinePage = new TweetdeckTimelinePage(page);
        await tweetdeckTimelinePage.open(`https://tweetdeck.twitter.com/`);
        await tweetdeckTimelinePage.waitUntilPageLoaded();
        await tweetdeckTimelinePage.observeToImages(followingLis);
        //console.dir(followingLis);
    }
    await puppeteerLaunchSetup.quit();
})();
