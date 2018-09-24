"use strict";
import Page from '../Page';

export default class OpenCartAdminLoginPage extends Page {
    constructor(page: any) {
        super(page);
    }

    private usernameInputSelector: string = "#input-username";
    private passwordInputSelector: string = "#input-password";
    private submiteLoginSelector: string = "button";
    private loginFormTitleSelector: string = ".panel-title";
    private loginFormTitleText: string = " Please enter your login details.";

    async clearLoginForm() {
        await this.clearInput(this.usernameInputSelector);
        await this.clearInput(this.passwordInputSelector);
    }
    async submitLoginForm(loginData: { login: string; password: string; }) {
        await this.page.type(this.usernameInputSelector, loginData.login);
        await this.page.type(this.passwordInputSelector, loginData.password);
        await this.page.click(this.submiteLoginSelector);
    }

    async waitForSelectorText() {
        await super.waitForSelectorText(this.loginFormTitleSelector, this.loginFormTitleText);
    }
}