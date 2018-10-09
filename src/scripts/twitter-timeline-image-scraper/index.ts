import PuppeteerLaunchSetup from "../../pages/PuppeteerLaunchSetup";
import loginData from "./loginData";
import TwitterLoginPage from "../../pages/twitter/TwitterLoginPage";

(async () => {
    const puppeteerLaunchSetup = new PuppeteerLaunchSetup();
    const page = await puppeteerLaunchSetup.setup();
    {
        const twitterLoginPAge = new TwitterLoginPage(page);
        await twitterLoginPAge.open("https://twitter.com/login");
        await twitterLoginPAge.submitLoginForm(loginData)
    }
    await puppeteerLaunchSetup.quit();
})();
