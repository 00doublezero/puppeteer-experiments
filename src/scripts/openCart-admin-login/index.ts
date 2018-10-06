'use strict';
import PuppeteerLaunchSetup from "../../pages/PuppeteerLaunchSetup";
import OpenCartAdminLoginPage from '../../pages/openCartDemo/OpenCartAdminLoginPage';
import OpenCartAdminMainPage from '../../pages/openCartDemo/OpenCartAdminMainPage';
import loginData from "./loginData";

(async () => {
    const puppeteerLaunchSetup = new PuppeteerLaunchSetup();
    const page = await puppeteerLaunchSetup.setup();
    {
        const openCartAdminLoginPage = new OpenCartAdminLoginPage(page);
        await openCartAdminLoginPage.open("https://demo.opencart.com/admin/");
        await openCartAdminLoginPage.clearLoginForm();
        await openCartAdminLoginPage.submitLoginForm(loginData);
    }
    {
        const openCartAdminMainPage = new OpenCartAdminMainPage(page);
        await openCartAdminMainPage.logout();
    }
    await puppeteerLaunchSetup.quit();
})();