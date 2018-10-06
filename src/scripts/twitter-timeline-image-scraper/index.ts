import PuppeteerLaunchSetup from "../../pages/PuppeteerLaunchSetup";

(async () => {
    const puppeteerLaunchSetup = new PuppeteerLaunchSetup();
    const page = await puppeteerLaunchSetup.setup();
    {
    }
    await puppeteerLaunchSetup.quit();
})();
