import PuppeteerPage from "./PuppeteerPage";
import { Page } from "puppeteer-core";
import logger from "../loggerConfig"

export default abstract class LoginPage extends PuppeteerPage {
    protected usernameInputSelector!: string;
    protected passwordInputSelector!: string;
    protected submiteLoginSelector!: string;

    async clearLoginForm() {
        await this.clearInput(this.usernameInputSelector);
        await this.clearInput(this.passwordInputSelector);
        logger.info(`Login form cleared`);
    }
    async submitLoginForm(loginData: { login: string; password: string; }) {
        await this.page.type(this.usernameInputSelector, loginData.login, { delay: 60 });
        await this.page.type(this.passwordInputSelector, loginData.password, { delay: 60 });
        await Promise.all([
            this.page.click(this.submiteLoginSelector),
            this.page.waitForNavigation()
        ])
        logger.info(`Login form was filled with data and then submitted`);
        logger.info(`User currenly on page: ${this.page.url()}`);
    }
}