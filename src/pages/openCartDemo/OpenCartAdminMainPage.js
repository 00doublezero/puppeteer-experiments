"use strict";
const Page = require('../Page');

class OpenCartAdminMainPage extends Page {
    constructor(page) {
        super(page);
    }
    logout() {
        this.page.click(".nav > li:nth-child(2)");
    }
}
module.exports = OpenCartAdminMainPage;