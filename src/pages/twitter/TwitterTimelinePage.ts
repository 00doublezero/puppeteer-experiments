import PuppeteerPage from "../PuppeteerPage";

export default class TwitterTimelinePage extends PuppeteerPage {
    protected towHitch: string = `b.u-linkComplex-target`;

    public async getTwitterName(): Promise<string> {
        return this.page.evaluate(
            (userNameSelector) => document.body.querySelector(userNameSelector)!.textContent, this.towHitch);
    }
    async scrapPosts() {

    }
}