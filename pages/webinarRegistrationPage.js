import puppeteer from 'puppeteer';
import HomePage from './homePage';
import CommonPage from './commonPage';
import { Path } from 'glob';
const extensions = ['Courses'];
import { activeBaseUrl } from '../utils/config';

class webinar extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page; 
        this.text='//p[contains(text(),"Upcoming")]';
        this.webinarRegistrationbutton='//button[contains(text(),"Register")]';
        this.webinarPageHeading='//p[contains(text(),"Webinar")]';
        this.fName='(//div[@class="space-y-5"]//input)[1]';
        this.lName='(//div[@class="space-y-5"]//input)[2]';
        this.eml='//input[@aria-label="Work Email"]';
        this.aianum='//input[contains(@id,"YWlhLW")]'
        this.companyName='(//input[contains(@id,"Y29tcGF")])[1]';
        this.companywebsite='(//input[contains(@id,"Y29tcGF")])[2]';
        this.companyLocation='//input[@placeholder="Search by City, Country or Zip Code"]';
        this.jobtitle='//input[contains(@id,"dGl")]'
        this.password='//input[@id="signin-pass"]';
        this.signoutButton='//button[contains(text(),"Sign")]';
        this.selectCompampany='//p[contains(text()," Auto")]';
        this.selectLocation='//p[contains(text(),"Timor")]';
        this.registerButton='//span[contains(text(),"Create")]';
        this.continueButton='//a[@href="/home"]';
        this.heading='//h1';
        //this.closeSigninModal='//button[@id="close-modal-button"]'
        /*****************/
        this.fNameinput='//input[@name="registration-fn"]';
        this.lNameinput='//input[@name="registration-ln"]';
        this.emlinput='//input[@name="signin-email"]';
        this.companyNameInput='//input[@placeholder="Find your company"]';
        this.emailexist ='//span[@id="vee_Email"]';
        this.fnamevalidation='//span[@id="vee_First Name"]';
        this.lnamevalidation='//span[@id="vee_Last Name"]';
        this.compnamevalidation='//span[contains(@id,"vee_Company")]';
        this.compLocationvalidation='//span[contains(text(),"location")]';
        this.passwordvalidation='//span[contains(@id,"vee_pass")]'
       
        


    }

    async getInputValues() {
      const locators = [
        this.fName,
        this.lName,
        this.eml,
        this.companyName,
        this.companywebsite,
      ];
      const values = [];

      for (let locator of locators) {
        try {
          // Wait for the element to appear
          await this.page.waitForXPath(locator, { timeout: 5000 });
          
          // Find the element using XPath
          const [element] = await this.page.$x(locator);
    
          if (!element) {
            throw new Error(`Element not found for locator: ${locator}`);
          }
    
          // Get the value or innerText, depending on the element type
          const value = await this.page.evaluate(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
              return el.value || ''; // For input/textarea elements
            } else {
              return el.textContent.trim(); // For other elements
            }
          }, element);
    
          values.push(value);
        } catch (error) {
          console.error(`Error fetching value for locator: ${locator}`, error);
          values.push(null); // Keep array structure intact on error
        }
      }
    
      return values;
    }

   
    
  }

export default webinar