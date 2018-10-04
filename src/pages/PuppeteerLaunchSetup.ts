import puppeteer, { Page, Browser } from 'puppeteer-core';
import launchConfig from "../launchConfig";
import viewportConfig from "../viewportConfig";

export default class PuppeteerLaunchSetup {
    private browser: any;
    protected page: any;
    constructor() {

    }
    async setup() {
        this.browser = await puppeteer.launch(launchConfig);
        this.page = await this.browser.newPage();
        await this.page.setViewport(viewportConfig);
        return this.page;
    }
    async quit() {
        await this.browser!.close();
    }
}