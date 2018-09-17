"use strict";
const Page = require('../Page');

class OpenCartAdminLoginPage extends Page {
    constructor(page) {
        super(page);
    }

    async clearLoginForm() {
        await this.clearInput("#input-username");
        await this.clearInput("#input-password");
    }
    async submitLoginForm(loginData) {
        await this.page.type("#input-username", loginData.login);
        await this.page.type("#input-password", loginData.password);
        await this.page.click("button");
    }
}
module.exports = OpenCartAdminLoginPage;