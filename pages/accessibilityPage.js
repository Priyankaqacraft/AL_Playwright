import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class AccessibilityPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.metaKeywordsSelector = 'meta[name="keywords"]';
        this.metaDescriptionSelector = 'meta[name="description"]';
        this.metaRobotsSelector = 'meta[name="robots"]';
        this.metaViewportSelector = 'meta[name="viewport"]';
        this.metaCharsetSelector = 'meta[charset="utf-8"]';
        this.metaFormatDetectionSelector = 'meta[name="format-detection"]';
        this.metaPinterestSelector = 'meta[name="pinterest"]';
        this.first_paragraph = "//main//p";
        this.second_paragraph = "//p[2]";
        this.email_link = "//a[@href = 'mailto:support@acelabusa.com']";
    }
   
    async getParagraphText(xpath) {
        const element = await this.page.$x(xpath);
        if (element.length > 0) {
            return await this.page.evaluate(el => el.innerText.trim(), element[0]);
        } else {
            throw new Error(`Element with XPath ${xpath} not found`);
        }
    }

    async isElementDisplayed(xpath) {
        const elements = await this.page.$x(xpath);
        return elements.length > 0 && await this.page.evaluate(el => el.offsetParent !== null, elements[0]);
    }
}

export default AccessibilityPage;