"use strict";
import PuppeteerPage from '../PuppeteerPage';
import { Page } from 'puppeteer-core';
import logger from "../../loggerConfig"

export default class OpenCartAdminLoginPage extends PuppeteerPage {
    constructor(page: Page) {
        super(page);
    }

    private usernameInputSelector: string = "#input-username";
    private passwordInputSelector: string = "#input-password";
    private submiteLoginSelector: string = "button";
    public loginFormTitleSelector: string = ".panel-title";
    private loginFormTitleText: string = " Please enter your login details.";

    async clearLoginForm() {
        await this.clearInput(this.usernameInputSelector);
        await this.clearInput(this.passwordInputSelector);
        logger.info(`Login form cleared from previous input`);
    }
    async submitLoginForm(loginData: { login: string; password: string; }) {
        await this.page.type(this.usernameInputSelector, loginData.login);
        await this.page.type(this.passwordInputSelector, loginData.password);
        await Promise.all([
            this.page.click(this.submiteLoginSelector),
            this.waitForNavigation(),
        ])
        logger.info(`Login for was filled with data and then submitted`)
    }
}