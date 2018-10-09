import PuppeteerLaunchSetup from "../../pages/PuppeteerLaunchSetup";
import ExamplePage from "../../pages/example/ExamplePage";

(async () => {
    const puppeteerLaunchSetup = new PuppeteerLaunchSetup();
    const page = await puppeteerLaunchSetup.setup();
    {
        const googlePage = new ExamplePage(page);
        await googlePage.open('https://example.com');
        await googlePage.waitUntilPageLoaded();
        await googlePage.screenshot();
    }
    await puppeteerLaunchSetup.quit();
})();
