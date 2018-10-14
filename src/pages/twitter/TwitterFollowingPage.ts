import PuppeteerPage from "../PuppeteerPage";

export default class TwitterFollowingPage extends PuppeteerPage {
    protected towHitch: string = `.ProfileCard`;

    async getFollowingsList(sort?: boolean): Promise<Array<string>> {
        let arr = await this.page.evaluate(() => [...document.body.querySelectorAll("b.u-linkComplex-target")].map((name) => name.textContent!.toLowerCase()));
        if (sort === true) arr.sort();
        return arr;
    }
}