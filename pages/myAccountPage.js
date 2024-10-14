import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class MyAccountPage extends CommonPage {
    constructor(page){
        super(page);
        this.profile_dropdown = "//button[@id='profile-dropdown']";
        this.signOut = "//span[contains(text(),'Sign Out')]";
        this.settings_section = "//div[@id='settings-and-preferences-card']";
        this.email_Verified = "//span[contains(text(),'Email Verified')]";
        this.personal_info_edit_link = "//div[@id='user-info-card']//a";
        this.settings_edit_link = "//div[@id='settings-and-preferences-card']//a";
        this.change_password_link = "//a[@id='change-password-link']";
        this.commonPage = new CommonPage(page);
    }

    async logOut(){
        await this.commonPage.performClick(this.profile_dropdown);
        await this.commonPage.performClick(this.signOut);
    }
}
export default MyAccountPage;