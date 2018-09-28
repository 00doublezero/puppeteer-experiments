import puppeteer, { Browser, Page } from 'puppeteer-core';
import launchConfig from "../launchConfig";
import viewportConfig from '../viewportConfig';
import OpenCartAdminLoginPage from '../pages/openCartDemo/OpenCartAdminLoginPage';

describe("Login to OpenCart admin page", async () => {
    //let browser: Browser;
    let page: Page;
    beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        //browser = await puppeteer.launch(launchConfig);
        //page = await browser.newPage();
        await page.setViewport(viewportConfig);
    })
    afterAll(async () => {
        //page.close();
        page.close();
    })
    it("Open OpenCart Login Page", async () => {
        const openCartAdminLoginPage = new OpenCartAdminLoginPage(page);
        await openCartAdminLoginPage.open("https://demo.opencart.com/admin/");
        await openCartAdminLoginPage.waitForNavigation();

        //const text = await page.evaluate(() => document.body.querySelector(".panel-title")!.textContent)
        //expect(text).toContain(" Please enter your login details.");
    })
})