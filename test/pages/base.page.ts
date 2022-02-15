

export default class BasePage {

    /**
     * open
     */
    public open(path: string): Promise<string> {
        return browser.url(path);
    }
}