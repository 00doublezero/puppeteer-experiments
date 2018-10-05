import PuppeteerPage from "../PuppeteerPage";

import { Page } from "puppeteer-core";


export default class ExamplePage extends PuppeteerPage {
    constructor(page: Page) {
        super(page);
    }
}