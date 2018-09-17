'use strict';
const puppeteer = require('puppeteer-core');
const launchConfig = require('../launchConfig.js');
const viewportConfig = require('../viewportConfig.js');
const OpenCartAdminLoginPage = require('../pages/openCartDemo/OpenCartAdminLoginPage');
const OpenCartAdminMainPage = require('../pages/openCartDemo/OpenCartAdminMainPage');
const loginData = require("./loginData.js");

(async ()=> {
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
        await openCartAdminMainPage.waitForSelectorText("header>div>ul>li.dropdown>a", "demo demo ");
        await openCartAdminMainPage.logout();
    }
    {
        const openCartAdminLoginPage = new OpenCartAdminLoginPage(page);
        await openCartAdminLoginPage.waitForSelectorText(".panel-title", " Please enter your login details.");
        /*await page.screenshot({path:"asdas.png"});*/
    }
    await browser.close();
})();