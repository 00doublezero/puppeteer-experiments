"use strict";
import Page from '../Page';

export default class OpenCartAdminMainPage extends Page {
    page: any;
    constructor(page: any) {
        super(page);
    }
    logout() {
        this.page.click(".nav > li:nth-child(2)");
    }
}
//module.exports = OpenCartAdminMainPage;