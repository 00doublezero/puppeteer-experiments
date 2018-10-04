import { Page } from "puppeteer-core";

"use strict"
export default abstract class PuppeteerPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async open(path: string) {
        await Promise.all([
            this.page.goto(path),
            this.waitForNavigation(),
        ])
        //await this.page.goto(path);
    }

    async clearInput(selector: string) {
        await this.page.evaluate((selector: string) => {
            document.body.querySelector(selector)!.setAttribute('value', '');
        }, selector);
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
        //await this.page.waitForFunction('document.readyState === "Complite"')
        await this.page.waitForNavigation({ timeout: 10000, waitUntil: 'load' });
    }
}
