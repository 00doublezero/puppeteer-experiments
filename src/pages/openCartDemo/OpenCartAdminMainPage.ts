"use strict";
import PuppeteerPage from '../PuppeteerPage';
import { Page } from 'puppeteer-core';

export default class OpenCartAdminMainPage extends PuppeteerPage {
    constructor(page: Page) {
        super(page);
    }

    private logoutButtonSelector: string = ".nav > li:nth-child(2)";
    private profileLableSelector: string = "header>div>ul>li.dropdown>a";
    private profileLableText: string = "demo demo ";

    logout() {
        this.page.click(this.logoutButtonSelector);
    }
}
