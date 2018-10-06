"use strict";
import { Page } from 'puppeteer-core';
import LoginPage from '../LoginPage';

export default class OpenCartAdminLoginPage extends LoginPage {
    constructor(page: Page) {
        super(page);
    }

    protected usernameInputSelector: string = "#input-username";
    protected passwordInputSelector: string = "#input-password";
    protected submiteLoginSelector: string = "button";

    public loginFormTitleSelector: string = ".panel-title";
    private loginFormTitleText: string = " Please enter your login details.";


}