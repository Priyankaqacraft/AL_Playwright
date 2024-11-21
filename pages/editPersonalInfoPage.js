import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class EditPersonalInfoPage extends CommonPage {

    constructor(page) {
        super(page);
        this.page = page;
        this.edit_personal_info_headline = "//h2[contains(text(),'Edit Personal Info')]";
        this.user_type_field = "//input[@id='role-input']";
        this.user_type_list = "//ul[@id='vs1__listbox']";
        this.personal_info_section = "//div[@id='user-info-card']";
        this.all_form_fields = "//form[@id='edit-user-form']//following::input";
        this.home_address = "//input[@name='personal-location-input']";
        this.first_option_location = "//input[@name='personal-location-input']//following::p[1]";
        this.email_field = "//input[@id='email-input']"
        // this.user_type_field = "//input[@id='userType-input']";
        this.save_button = "(//button[contains(text(), 'Save')])[2]";
        this.my_account_page_headline = "//main//h1[contains(text(),'My Account')]";
        this.popUp_Close_Button = "(//button[contains(.,'Close')])[2]";
        this.error_message_elements = "//span[contains(@class,'error')]";
        this.email_field = "//input[@id='email-input']";
        this.email_not_available_error = "//span[contains(text(), 'This email address is not available')]";
        this.cancel_button = "//button[contains(text(), 'Cancel')]";
        this.back_to_my_account_button = "//span[contains(text(), 'Back to My Account')]";
        

    }

    async inputEachField(xpath, date) {

        const allFormFields = await this.page.$x(xpath);

        for (const element of allFormFields) {
            if (element) {

                await element.focus();

                await this.page.keyboard.down('Control');
                await this.page.keyboard.press('A');
                await this.page.keyboard.up('Control');

                await this.page.keyboard.press('Backspace');

                await element.type(date);
            } else {
                console.error("Element not found for the given XPath");
            }
        }
    }

    async clearEachField(viewXPath) {
        await this.page.waitForXPath(viewXPath, { timeout: 40000 });
        
         const allFormFields = await this.page.$x(viewXPath);

         for (const element of allFormFields) {
         if (element) {
         await element.click({ clickCount: 3 });
         await element.press('Delete'); 
         }
         else {
            throw new Error(`Element not found for XPath: ${viewXPath}`);
         }
        }
       }
}
export default EditPersonalInfoPage;