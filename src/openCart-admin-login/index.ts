'use strict';
import puppeteer from 'puppeteer-core';
import launchConfig from '../launchConfig';
import viewportConfig from '../viewportConfig';
import OpenCartAdminLoginPage from '../pages/openCartDemo/OpenCartAdminLoginPage';
import OpenCartAdminMainPage from '../pages/openCartDemo/OpenCartAdminMainPage';
import loginData from "./loginData";

(async () => {
    const browser = await puppeteer.launch(launchConfig);
    const page = await browser.newPage();
    await page.setViewport(viewportConfig);
    {
        const openCartAdminLoginPage = new OpenCartAdminLoginPage(page);
        await openCartAdminLoginPage.open("https://demo.opencart.com/admin/");
        await openCartAdminLoginPage.clearLoginForm();
        await openCartAdminLoginPage.submitLoginForm(loginData);
    }
    {
        const openCartAdminMainPage = new OpenCartAdminMainPage(page);
        //TODO: rename waitForSelectorText() method for better semantic
        await openCartAdminMainPage.waitForSelectorText();
        await openCartAdminMainPage.logout();
    }
    {
        const openCartAdminLoginPage = new OpenCartAdminLoginPage(page);
        await openCartAdminLoginPage.waitForSelectorText();
        /*await page.screenshot({path:"asdas.png"});*/
    }
    await browser.close();
})();