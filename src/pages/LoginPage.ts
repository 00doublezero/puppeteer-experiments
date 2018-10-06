import PuppeteerPage from "./PuppeteerPage";
import { Page } from "puppeteer-core";
import logger from "../loggerConfig"

export default abstract class LoginPage extends PuppeteerPage {
    constructor(page: Page) {
        super(page)
    }
    protected usernameInputSelector!: string;
    protected passwordInputSelector!: string;
    protected submiteLoginSelector!: string;

    async clearLoginForm() {
        await this.clearInput(this.usernameInputSelector);
        await this.clearInput(this.passwordInputSelector);
        logger.info(`Login form cleared`);
    }
    async submitLoginForm(loginData: { login: string; password: string; }) {
        await this.page.type(this.usernameInputSelector, loginData.login);
        await this.page.type(this.passwordInputSelector, loginData.password);
        await Promise.all([
            this.page.click(this.submiteLoginSelector),
            this.waitForNavigation(),
        ])
        logger.info(`Login form was filled with data and then submitted`)
    }
}