"use strict";
import Page from '../Page';

export default class OpenCartAdminLoginPage extends Page {
    constructor(page: any) {
        super(page);
    }

    async clearLoginForm() {
        await this.clearInput("#input-username");
        await this.clearInput("#input-password");
    }
    async submitLoginForm(loginData: { login: string; password: string; }) {
        await this.page.type("#input-username", loginData.login);
        await this.page.type("#input-password", loginData.password);
        await this.page.click("button");
    }
}
//module.exports = OpenCartAdminLoginPage;