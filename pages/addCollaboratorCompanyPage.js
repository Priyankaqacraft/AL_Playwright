import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class Collaborator extends CommonPage {
  constructor(page) {
    super(page);
    this.company_Edit_Link = "//a[@href='/myaccount/company/edit'][contains(.,'Edit')]";
    this.add_Team_Member_Button = "//button[contains(.,'+ Add Team Member')]";
    this.email_TextField = "//input[@aria-label='Email']";
    this.passwordField = "//input[@aria-label='Password']";
    this.btnSubmit = "//button[@type='submit']";
    this.send_Invitation_Button = "//button[@type='button'][contains(.,'Send Invitation')]";
    this.btnCreateAccount = "//span[contains(text(),'Create Account')]";
    this.btnDeleteAccount = "//button[@id='delete-account-button']";
    this.btnDeleteAccountPopup = "//button[text()='Delete Account']"
    this.btnDone = "//button[contains(text(),'Done')]";
    this.company_TextField = "//input[@aria-label='Company']";
    this.dropdownOp = "//div[contains(@class,'search-custom-scrollbar')]//p";
    this.roleTextField = "//div[@id='vs1__combobox']";
    this.btnRemindMeLater = "//button[contains(text(),'Remind Me Later')]";
    this.dropdownRole = "//span[contains(@class,'pointer-events-none')]";
    this.dropdownOpRole = "(//span[contains(@class,'pointer-events-none')]//preceding-sibling::select)";
    this.btnSave = "//button[text()='Save']";
  }

  async selectDropdownByValue(dropdownXPath, valueToSelect) {
    // Select the option by its value attribute
    await this.page.select(dropdownXPath, valueToSelect);
    console.log(`Selected option with value: ${valueToSelect}`);
  }

  async selectOptionFromCustomDropdown(optionToSelect) {
    const [optionElement] = await this.page.$x(`//p[text()="${optionToSelect}"]`);
    if (optionElement) {
      await optionElement.click();
      console.log(`Selected option: ${optionToSelect} from custom dropdown.`);
    } else {
      console.error(`Option with text "${optionToSelect}" not found in custom dropdown.`);
    }
  }
}

export default Collaborator;