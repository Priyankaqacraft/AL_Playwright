import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class MyAccountPage extends CommonPage {
    constructor(page){
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
        this.profile_dropdown = "//button[@id='profile-dropdown']";
        this.signOut = "(//button[@id='logout-button'])[1]";
        this.settings_section = "//div[@id='settings-and-preferences-card']";
        this.email_Verified = "//span[contains(text(),'Email Verified')]";
        this.personal_info_edit_link = "//div[@id='user-info-card']//a";
        this.settings_edit_link = "//div[@id='settings-and-preferences-card']//a";
        this.change_password_link = "//a[@id='change-password-link']";
        this.commonPage = new CommonPage(page);
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

    async logOut(){
        await this.commonPage.performClick(this.profile_dropdown);
        await this.commonPage.performClick(this.signOut);
    }
}
export default MyAccountPage;