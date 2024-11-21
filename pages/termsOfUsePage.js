import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class TermsOfUsePage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.first_paragraph = "//p[2]";
        this.second_paragraph = "//p[3]";
        this.acelabEmailLink = "//a[@href = 'mailto:support@acelabusa.com']";
        this.aiaEmailLink = "//a[@href = 'mailto:cessupport@aia.org']";
        this.privacyPolicyLinks = "//a[text()='Privacy Policy']";
    }
   
   
}

export default TermsOfUsePage;