import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class FooterPage extends CommonPage {
    constructor(page){
        super(page);
        this.page = page;
        this.articles_link = "//a[contains(text(),'Articles')]";
        this.courses_link = "//a[contains(text(),'Building Science Courses')]";
        this.contact_us_link = "//a[contains(text(),'Contact Us')]";
        this.web_accessibility_link = "//a[contains(text(),'Web Accessibility')]";
        this.about_us_link = "(//a[@href='/about-us'])[2]";
        this.log_in_link = "(//button[text()='Sign In'])[2]";
        this.email_field = "//input[@id='signin-email']";
        this.sign_up_link = "//li//button[contains(text(), 'Join')]";
        this.privacy_policy_link = "//a[text()='Privacy Policy']";
        this.terms_of_use_link = "//a[text()='Terms of Use']";
        this.linkedin_link = "//*[@id='Icons_Linked_In']";
        this.instagram_link = "//*[@id='Icons_Instagram']";
        this.youtube_link = "//*[@id='Icons_YouTube']";
        this.footerText = "//span[text()='Copyright © 2024 Acelab Inc. All rights reserved']";
        this.construction_details = "//a[contains(text(),'Construction Details')]";
    }

}
export default FooterPage;