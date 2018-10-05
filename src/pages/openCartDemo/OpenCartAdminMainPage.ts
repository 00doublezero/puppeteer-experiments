"use strict";
import PuppeteerPage from '../PuppeteerPage';
import { Page } from 'puppeteer-core';
import logger from "../../loggerConfig"

export default class OpenCartAdminMainPage extends PuppeteerPage {
    constructor(page: Page) {
        super(page);
    }

    private logoutButtonSelector: string = ".nav > li:nth-child(2)";
    private profileLableSelector: string = "header>div>ul>li.dropdown>a";
    private profileLableText: string = "demo demo ";

    async logout() {
        await Promise.all([
            this.page.click(this.logoutButtonSelector),
            this.waitForNavigation(),
        ]).then(() => {
            logger.info(`User logged out`)
        })
    }
}
