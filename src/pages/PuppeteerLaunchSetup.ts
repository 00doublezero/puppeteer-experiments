import puppeteer, { Page, Browser } from 'puppeteer-core';
import launchConfig from "../launchConfig";
import viewportConfig from "../viewportConfig";
import logger from "../loggerConfig"

export default class PuppeteerLaunchSetup {
    private browser: any;
    private page: any;

    async setup() {
        this.browser = await puppeteer.launch(launchConfig);
        this.page = await this.browser.newPage();
        await this.page.setViewport(viewportConfig);
        if (typeof this.browser !== "undefined" || typeof this.page !== "undefined") logger.info("Settings loaded. User may start using browser")
        return this.page;
    }
    async quit() {
        await this.browser!.close().then(() => {
            logger.info(`Browser window was closed. Program exiting`)
        });
    }
}