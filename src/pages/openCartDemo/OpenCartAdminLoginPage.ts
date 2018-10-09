"use strict";
import { Page } from 'puppeteer-core';
import LoginPage from '../LoginPage';

export default class OpenCartAdminLoginPage extends LoginPage {

    protected usernameInputSelector: string = "#input-username";
    protected passwordInputSelector: string = "#input-password";
    protected submiteLoginSelector: string = "button";

    protected towHitch: string = `form[action="https://demo.opencart.com/admin/index.php?route=common/login"]`;
}