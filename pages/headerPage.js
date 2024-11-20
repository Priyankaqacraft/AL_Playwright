import puppeteer from 'puppeteer';
import HomePage from './homePage';
import CommonPage from './commonPage';
import { Path } from 'glob';
const extensions = ['Courses'];
import { activeBaseUrl } from '../utils/config';

class HeaderPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.Researchparaghraph='//p[contains(text(),"Research")]'
        this.acelab_logo='(//*[local-name()="svg" and @aria-hidden=\'true\']/*[local-name()="g"])[1]'
        this.close_modal='//button[@id="close-modal-button"]'
        this.join_us_button='(//a[@href="/signup"])[1]'
        this.signupwith_google_button='//span[@class="L6cTce"]'
        this.signup_heading='//h1'
        this.profile_dropdown = '//button[@id="profile-dropdown"]'
        this.manage_account='(//a[@href="/myaccount"])[1]'
        this.manage_account_title ='//h1'
        this.searchbar='//input[@id="search-bar-input"]'
        this.search_suggest_input='//a[@class="flex cursor-pointer justify-between py-4 px-8 hover:bg-light-gray"]'
        this.logout_button='(//button[@id="logout-button"])[1]'
        this.start_search_button='(//a[@href="/divisions/new-search"])[1]'
        this.searchnot_found='//p[contains(text(),"No")]'
        this.manufactureLink = '//a[contains(text(),"Manufacturers")]'
        this.profile_dropdown_link='//*[name() = "svg"][contains(@class, "h-3 ")]'
        this.manage_account_link='(//a[@href="/myaccount"])[1]//span'
        this.my_account_page_headline='//main//h1[contains(text(),"My Account")]'
        this.product_window='//a[@title="Windows"]'
        this.resources ='(//a[@href="/resources"])[1]'
        this.resource_heading='//h1'
        this.Aboutus='(//header//a[@href="/about-us"])[1]'
        this.forManufacturer='(//a[@href="/for-manufacturers"])[1]'
        this.dashboardbutton='//span[contains(text(),"Dashboard")]'  
        this.projectButton='(//span[contains(text(),"Projects")])[1]' 
        this.publicsiteButton='//span[contains(text(),"Public")]'     
    }

    
    async signOut(){
      await this.performClick(this.profile_dropdown);
      await this.performClick(this.logout_button);  

  }

  
}
export default HeaderPage;