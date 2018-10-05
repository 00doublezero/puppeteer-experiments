"use strict"
import { Page } from "puppeteer-core";
import logger from "../loggerConfig"
import uuidv4 from 'uuid/v4';
export default abstract class PuppeteerPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async open(path: string) {
        await Promise.all([
            this.page.goto(path),
            this.waitForNavigation(),
        ]).then(() => {
            logger.info(`User navigated to page ${path}`);
        })
    }

    async clearInput(selector: string) {
        await this.page.evaluate((selector: string) => {
            document.body.querySelector(selector)!.setAttribute('value', '');
        }, selector).then(() => {
            logger.info(`Text input for "${selector}" selector cleared`)
        });
    }

    async waitForSelectorText(selector: string, text: string) {
        await this.page.waitFor((selector: string, text: string) => {
            if (document.querySelector(selector) === null) {
                return false;
            } else {
                if (document.querySelector(selector)!.textContent === text) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {}, selector, text)
    }

    async waitForNavigation() {
        await this.page.waitForNavigation({ timeout: 10000, waitUntil: 'load' });
    }
    async screenshot() {
        const uuid = await uuidv4();
        await this.page.screenshot({ path: uuid + ".png" });
        logger.info(`The screenshot was taken`)
    }
}
