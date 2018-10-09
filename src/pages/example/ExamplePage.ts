import PuppeteerPage from "../PuppeteerPage";

export default class ExamplePage extends PuppeteerPage {
    protected towHitch: string = `a[href="http://www.iana.org/domains/example"]`;
}