"use strict";
import Page from '../Page';

export default class OpenCartAdminMainPage extends Page {
    page: any;
    constructor(page: any) {
        super(page);
    }

    private logoutButtonSelector: string = ".nav > li:nth-child(2)";
    private profileLableSelector: string = "header>div>ul>li.dropdown>a";
    private profileLableText: string = "demo demo ";

    logout() {
        this.page.click(this.logoutButtonSelector);
    }

    async waitForSelectorText() {
        await super.waitForSelectorText(this.profileLableSelector, this.profileLableText);
    }

}
