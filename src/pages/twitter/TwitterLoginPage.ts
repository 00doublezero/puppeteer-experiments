"use strict";
import { Page } from 'puppeteer-core';
import LoginPage from '../LoginPage';

export default class TwitterLoginPage extends LoginPage {
    constructor(page: Page) {
        super(page);
    }

    protected usernameInputSelector: string = "input.js-username-field.email-input.js-initial-focus";
    protected passwordInputSelector: string = "input.js-password-field";
    protected submiteLoginSelector: string = "button.submit.EdgeButton";

    protected towHitch: string = `form[action="https://twitter.com/sessions"]`;

}