import puppeteer, { Page } from 'puppeteer';
import CommonPage from './commonPage';

class MyaccountPage extends CommonPage{

    
    

    constructor(page) {
        super(page);
        this.page = page;
        this.myAccountPageHeading = "//main//h1[contains(text(),'My Account')]";
        this.personal_info_edit_link="//a[@href='/myaccount/edit']";
        this.setting_edit_link="//a[@href='/myaccount/settings/edit']";
        
    }
}
export default MyaccountPage