import puppeteer from 'puppeteer';
import CommonPage from './commonPage';


class MyaccountPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.myAccountPageHeading = "//main//h1[contains(text(),'My Account')]";
        this.personal_info_edit_link="//a[@href='/myaccount/edit']";
        this.setting_edit_link="//a[@href='/myaccount/settings/edit']";
        this.emailid = "//input[@id='email-input']";
        this.save_button= "(//button[contains(text(), 'Save')])[2]";
        this.myproject= "//button[@id='workspace-button']";
        this.projectTitlesXPath = "//h3";
        //this.projectTitles = this.page.$$(this.projectTitlesXPath);
        
    }
    async getProjectTitles() {
        return this.projectTitlesXPath; // Returning the XPath as a string
      }

    async printProjectTitles() {
        const projectTitles = await this.getProjectTitles();
        for (let element of projectTitles) {
            const text = await this.page.evaluate(el => el.textContent, element);
            console.log(text);
        }
    }


}
export default MyaccountPage