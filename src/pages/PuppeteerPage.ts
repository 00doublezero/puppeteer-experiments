"use strict"
import { Page } from "puppeteer-core";
import logger from "../loggerConfig"
import uuidv4 from 'uuid/v4';
export default abstract class PuppeteerPage {
    protected towHitch!: string;
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async open(path: string) {
        await this.page.goto(path);
        logger.info(`User navigated to page ${path}`);
    }

    async clearInput(selector: string) {
        await this.page.evaluate((selector: string) => {
            document.body.querySelector(selector)!.setAttribute('value', '');
        }, selector);
        logger.info(`Text input for "${selector}" selector cleared`);
    }

    async screenshot() {
        const uuid = await uuidv4();
        await this.page.screenshot({ path: uuid + ".png" });
        logger.info(`The screenshot was taken`)
    }

    async waitUntilPageLoaded() {
        await this.page.waitForSelector(this.towHitch, { timeout: 10000 });
        await this.page.waitForSelector("body");
        logger.info(`After load page user on page: ${this.page.url()}`);
    }
}
