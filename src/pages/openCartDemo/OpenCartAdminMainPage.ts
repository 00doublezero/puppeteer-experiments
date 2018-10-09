"use strict";
import PuppeteerPage from '../PuppeteerPage';
import { Page } from 'puppeteer-core';
import logger from "../../loggerConfig"

export default class OpenCartAdminMainPage extends PuppeteerPage {
    private logoutButtonSelector: string = ".nav > li:nth-child(2)";
    protected towHitch: string = `footer#footer>a[href="http://www.opencart.com"]`
    async logout() {
        await Promise.all([
            this.page.click(this.logoutButtonSelector),
            this.page.waitForNavigation()
        ])
        logger.info(`User logged out`);
        logger.info(`User currently on page: ${this.page.url()}`)
    }
}