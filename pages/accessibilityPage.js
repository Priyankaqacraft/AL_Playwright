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
}

export default AccessibilityPage;