"use strict"
export default class Page {
    page: any;
    constructor(page: any) {
        this.page = page;
    }

    async open(path: string) {
        await this.page.goto(path);
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
}
