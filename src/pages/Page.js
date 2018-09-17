"use strict"
class Page {
	constructor(page) {
		this.page = page;
	}

	async open(path) {
		await this.page.goto(path);
    }
    
    async clearInput(selector) {
        await this.page.evaluate((selector) => {
            document.body.querySelector(selector).setAttribute('value','');
        },selector);
    }

    async waitForSelectorText(selector , text) {
        await this.page.waitFor((selector, text) => {
            if (document.querySelector(selector) === null ) {
                return false;
            } else {
                if (document.querySelector(selector).textContent === text) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {}, selector, text)
    }
}
module.exports = Page; 