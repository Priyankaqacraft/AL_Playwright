import { teardown, setup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import LandingPage from '../pages/landingPage';
import { Paths } from '../utils/path';
import EditPersonalInfoPage from '../pages/editPersonalInfoPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { afterAll } from '@jest/globals';
const assert = require('assert');

jest.setTimeout(200000);

describe('Edit Personal Info Page Tests', () => {
  let page,
    timestampUTC,
    commonPage,
    landingPage,
    editPersonalInfo,
    existingData,
    date,
    email1,
    email,
    expectedPersonalInfoFields,
    error_msg,
    error_msg_email_not_available

  beforeAll(async () => {

    const setupResults = await setup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    landingPage = new LandingPage(page);
    editPersonalInfo = new EditPersonalInfoPage(page);
    await page.goto(activeBaseUrl + Paths.MyAccount);
  }, 60000);


  date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  email1 = "rahul+qaadmin@acelabusa.com";
  email = `${date}@acelabusa.com`;
  expectedPersonalInfoFields = `Personal Info Edit First Name ${date} Last Name ${date} Email ${email1} Role Architect / Architectural Designer Job Title ${date} Phone Number ${date} AIA Number ${date} LinkedIn URL ${date} Home Address Test WayEnglandUnited Kingdom`;


  afterAll(async () => {
    await teardown();
  });

  it('A verified user can successfully sign in and view edit personal info page', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();
      const isDisplayed = await commonPage.isElementDisplayed(editPersonalInfo.edit_personal_info_headline);
      expect(isDisplayed).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'EditPersonalInfoHeadline');
      throw error;
    }

  }, 50000);

  it('A verified user can successfully sign in and view edit personal info page', async () => {

    try {
      const pageTitle = await commonPage.getPageTitle(page);
      assert.strictEqual("acelab | edit personal info", pageTitle, 'Page Title is not matched');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Title_EditPersonalInfo');
      throw error;
    }
  }, 50000);

  it('User Type dropdown functions as expected', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(editPersonalInfo.user_type_field);
      const dropdownOptions = await page.$x(editPersonalInfo.user_type_list);

      const userTypeOptions = [];
      for (let option of dropdownOptions) {
        const text = await page.evaluate(el => el.textContent.trim().replace(/\s+/g, ' '), option);
        userTypeOptions.push(text);
      }
      const actualOptions = userTypeOptions.join(',');
      const expectedOptions = "-- Select -- Architect / Architectural Designer Interior Designer Project Manager Specification Writer Consultant Engineer Firm Leader Owner / Developer General Contractor Manufacturer / Brand Other";
      assert.equal(actualOptions, expectedOptions);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'dropdownOptions');
      throw error;
    }

  }, 50000);

  it('A verified user can successfully edit personal info page', async () => {

    try {

      await commonPage.navigateTo(Paths.MyAccount);
      await commonPage.waitForLoadComplete();
      existingData = await commonPage.getElementText(editPersonalInfo.personal_info_section);
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();
      await editPersonalInfo.inputEachField(editPersonalInfo.all_form_fields, date);
      await commonPage.clearAndSendKeys(editPersonalInfo.home_address, "123 Test Way, Southampton, UK");
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(editPersonalInfo.first_option_location);
      await commonPage.waitForLoadComplete();

      const element = await page.$x(editPersonalInfo.email_field);
      if (element.length === 1) {
        await page.evaluate(el => el.value = '', element[0]);
        await element[0].click({ clickCount: 3 });
        await element[0].type(email1);
      } else if (element.length === 0) {
        throw new Error(`Element not found`);
      } else {
        console.warn("Multiple elements found using XPath. Using the first one.");
        await element[0].click();
      }

      await commonPage.clearAndSendKeys(editPersonalInfo.user_type_field, "Architect");
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(editPersonalInfo.save_button);
      await commonPage.waitForLoadComplete();

      const isDisplayed = await page.waitForXPath(editPersonalInfo.my_account_page_headline, { visible: true });
      expect(isDisplayed).toBeTruthy();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'myaccountpageheadline');
      throw error;
    }
  }, 80000);

  it('A verified user can successfully edit personal info page', async () => {

    try {

      await commonPage.waitForLoadComplete();

      const newData1 = await commonPage.getElementText(editPersonalInfo.personal_info_section);
      console.log(newData1);
      console.log("***********");
      console.log("Existing Text" + expectedPersonalInfoFields);
      assert.strictEqual(newData1, expectedPersonalInfoFields, "The 'My Account' page did not contain the expected personal info");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'personal_info_section_text_equal');
      throw error;
    }
  }, 50000);

  it('A verified user can successfully edit personal info page', async () => {
    try {
      assert.notStrictEqual(existingData, expectedPersonalInfoFields, "The 'My Account' page did not contain the expected personal info");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'personal_info_section_text_notequal');
      throw error;
    }
  }, 50000);

  it('A verified user can successfully edit personal info page', async () => {
    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();
      await commonPage.clearAndSendKeys(editPersonalInfo.email_field, email);
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(editPersonalInfo.save_button);
      await commonPage.waitForLoadComplete();

      if (await commonPage.isElementDisplayed(editPersonalInfo.popUp_Close_Button)) {
        await commonPage.performClick(editPersonalInfo.popUp_Close_Button);
        await commonPage.waitForLoadComplete();
      }

      const isDisplayed1 = await page.waitForXPath(editPersonalInfo.my_account_page_headline, { visible: true });
      expect(isDisplayed1).toBeTruthy();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'my_account_page_headline');
      throw error;
    }
  }, 50000);

  it('A verified user can successfully edit personal info page', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();
      await commonPage.clearAndSendKeys(editPersonalInfo.email_field, email1);
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(editPersonalInfo.save_button);
      await commonPage.waitForLoadComplete();

      if (await commonPage.isElementDisplayed(editPersonalInfo.popUp_Close_Button)) {
        await commonPage.performClick(editPersonalInfo.popUp_Close_Button);
        await commonPage.waitForLoadComplete();
      }

      const isDisplayed2 = await page.waitForXPath(editPersonalInfo.my_account_page_headline, { visible: true });
      expect(isDisplayed2).toBeTruthy();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'my_account_page_headline');
      throw error;
    }

  }, 50000);

  it('Edit personal info page required fields have error message when empty', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();
      const headline = await page.waitForXPath(editPersonalInfo.edit_personal_info_headline, { visible: true });
      expect(headline).toBeTruthy();
      await editPersonalInfo.clearEachField(editPersonalInfo.all_form_fields);
      await commonPage.performClick(editPersonalInfo.save_button);

    } catch (error) {
      await captureAndAttachScreenshot(page, 'edit_personal_info_headline');
      throw error;
    }

  }, 50000);

  it('Edit personal info page required fields have error message when empty', async () => {

    try {
      await commonPage.waitForLoadComplete();
      error_msg = await commonPage.getList(editPersonalInfo.error_message_elements);
      console.log("Error message:\n" + error_msg);
      await page.waitForTimeout(3000);
      expect(error_msg).toContain("Please enter your first name.");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'error_message_elements');
      throw error;
    }

  }, 50000);

  it('Edit personal info page required fields have error message when empty', async () => {

    try {
      expect(error_msg).toContain("Please enter your last name.");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'error_message_elements');
      throw error;
    }

  }, 50000);

  it('Edit personal info page required fields have error message when empty', async () => {

    try {
      expect(error_msg).toContain("Please enter your email.");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'error_message_elements');
      throw error;
    }

  }, 50000);


  it('A user cannot enter an email that is already in the database', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();

      const emailfield = await page.waitForXPath(editPersonalInfo.edit_personal_info_headline, { visible: true });
      expect(emailfield).toBeTruthy();

      await commonPage.clearAndSendKeys(editPersonalInfo.email_field, "regressionuser@autotest.net");
      await commonPage.performClick(editPersonalInfo.save_button);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'enter_invalid_email');
      throw error;
    }

  }, 50000);

  it('A user cannot enter an email that is already in the database', async () => {
    3

    try {
      error_msg_email_not_available = await commonPage.getList(editPersonalInfo.email_not_available_error);
      console.log("Error message:\n" + error_msg_email_not_available);
      await page.waitForTimeout(3000);
      expect(error_msg_email_not_available).toBeTruthy();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'error_msg_email_not_available');
      throw error;
    }

  }, 50000);

  it('Edit personal info page cancel button returns to my account page', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();

      const headlineEdit = await page.waitForXPath(editPersonalInfo.edit_personal_info_headline, { visible: true });
      expect(headlineEdit).toBeTruthy();

      await commonPage.performClick(editPersonalInfo.cancel_button);
      await commonPage.waitForLoadComplete();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'headlineEdit');
      throw error;
    }
  }, 50000);

  it('Edit personal info page cancel button returns to my account page', async () => {
    try {
      const headline = await page.waitForXPath(editPersonalInfo.my_account_page_headline, { visible: true });
      expect(headline).toBeTruthy();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'headline');
      throw error;
    }
  }, 50000);

  it('Back to My Account link returns user to my account page when there are no changes', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();

      const headlineEdit = await page.waitForXPath(editPersonalInfo.edit_personal_info_headline, { visible: true });
      expect(headlineEdit).toBeTruthy();
      await commonPage.performClick(editPersonalInfo.back_to_my_account_button);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'headlineEdit');
      throw error;
    }

  }, 50000);

  it('Back to My Account link returns user to my account page when there are no changes', async () => {
    try {
      const headlineEdit1 = await page.waitForXPath(editPersonalInfo.edit_personal_info_headline, { visible: true });
      expect(headlineEdit1).toBeTruthy();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'headlineEdit1');
      throw error;
    }
  }, 50000);

  it('Back to My Account link returns opens modal when there are changes', async () => {

    try {
      await commonPage.navigateTo(Paths.MyAccount + Paths.Edit);
      await commonPage.waitForLoadComplete();

      const headlineEdit = await page.waitForXPath(editPersonalInfo.edit_personal_info_headline, { visible: true });
      expect(headlineEdit).toBeTruthy();

      await commonPage.performClick(editPersonalInfo.back_to_my_account_button);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'headlineEdit');
      throw error;
    }

  }, 50000);

  it('Back to My Account link returns opens modal when there are changes', async () => {

    try {
      const headlineEdit1 = await page.waitForXPath(editPersonalInfo.edit_personal_info_headline, { visible: true });
      expect(headlineEdit1).toBeTruthy();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'headlineEdit1');
      throw error;
    }

  }, 50000);

});