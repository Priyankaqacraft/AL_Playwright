import { teardown, noLoginsetup } from './setup.js';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl, acelabRegressionCredentials } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import HeaderPage from '../pages/headerPage';
import { performLogins, } from '../utils/logins';
import loginPage from '../pages/loginPage';
import webinarRegistrationPage from '../pages/webinarRegistrationPage';
import { web } from 'webpack';
const assert = require('assert')
jest.setTimeout(60000);



describe('Author: ', () => {
  let page,
    timestampUTC,
    commonPage,
    headerPage,
    loginpage,
    window,
    context,
    browser,
    webinar


  beforeAll(async () => {

    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    loginpage = new loginPage(page);
    headerPage = new HeaderPage(page);
    webinar = new webinarRegistrationPage(page)
    browser = setupResults.browser;
    context = browser.defaultBrowserContext();
  });

  afterAll(async () => {
    await teardown();
  });


  it('It should verify that After logged in , user can redirect to webinar Registration page from landing page...', async () => {

    try {
      await performLogins(page, "editable");
      await commonPage.isElementDisplayed(webinar.text);
      await commonPage.performClick(webinar.webinarRegistrationbutton);
      await commonPage.isElementDisplayed(webinar.webinarPageHeading);
      const pageTitle = await commonPage.getPageTitle(page);
      assert.strictEqual(pageTitle, 'Register for Webinar | Acelab');


    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });


  it('It should verify that with logged in user , webinar registration page is available with prefilled detail', async () => {

    try {
      const fname = await commonPage.getElementValue(webinar.fName);
      expect(fname).toEqual("FN");
      const lname = await commonPage.getElementValue(webinar.lName);
      expect(lname).toEqual("LN");
      const eml = await commonPage.getElementValue(webinar.eml);
      expect(eml).toEqual("irfan+5@acelabusa.com");
      const cmpname = await commonPage.getElementValue(webinar.companyName);
      expect(cmpname).toEqual("230925143700");
      const cmpwebsite = await commonPage.getElementValue(webinar.companywebsite);
      expect(cmpwebsite).toEqual("www.test.com/");
      const jobtitle = await commonPage.getElementValue(webinar.jobtitle);
      expect(jobtitle).toEqual("QA");
      const Aianum = await commonPage.getElementValue(webinar.aianum);
      expect(Aianum).toEqual("240305202329");
      await commonPage.performClick(webinar.signoutButton);



    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }

  });
  it('It Should verify that webinar Registration page is showing validation message for null values', async () => {

    try {
      await commonPage.performClick(webinar.registerButton);
      const fname = await commonPage.getElementText(webinar.fnamevalidation);
      expect(fname).toEqual("Please enter your first name.");
      const lname = await commonPage.getElementText(webinar.lnamevalidation);
      expect(lname).toEqual("Please enter your last name.");
      const eml = await commonPage.getElementText(webinar.emailexist);
      expect(eml).toEqual("Please enter your email.");
      const cmpname = await commonPage.getElementText(webinar.compnamevalidation);
      expect(cmpname).toEqual("Please search for & select a company");
      const cmpLocation = await commonPage.getElementText(webinar.compLocationvalidation);
      expect(cmpLocation).toEqual("Please select a location.");
      const password = await commonPage.getElementText(webinar.passwordvalidation);
      expect(password).toEqual("Please enter a password");
    }
    catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  })
  it('It should verify that webinar registration is showing error message when we try to do register with already existed email id', async () => {

    try {
      await commonPage.clearAndSendKeys(webinar.fNameinput, 'qa');
      await commonPage.clearAndSendKeys(webinar.lNameinput, 'test');
      await commonPage.clearAndSendKeys(webinar.emlinput, 'qaautomation+signup_01@acelabusa.com');
      await commonPage.clearAndSendKeys(webinar.password, 'Rain999@');
      await commonPage.performClick(webinar.registerButton);
      const emailmessage = await commonPage.getElementText(webinar.emailexist);
      console.log("validation message for email exist is:" + emailmessage);

    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
  it('It should verify that without login...a user can do signup process from webinar registration page', async () => {

    try {
      await page.reload({ waitUntil: 'domcontentloaded' }); // Refresh the page and wait for DOM to load
      console.log('Page refreshed successfully.');
      await commonPage.performClick(webinar.signoutButton);
      await commonPage.clearAndSendKeys(webinar.fNameinput, 'qa');
      const randomNum = await commonPage.createRandomNumber(200);
      await commonPage.clearAndSendKeys(webinar.lNameinput, 'Test' + randomNum);
      await commonPage.clearAndSendKeys(webinar.emlinput, ('qaautomation+' + randomNum) + 'webinarreg@acelabusa.com');
      await commonPage.clearAndSendKeys(webinar.companyNameInput, 'abc');
      await commonPage.performClick(webinar.selectCompampany);
      await commonPage.clearAndSendKeys(webinar.password, 'Rain999@');
      await commonPage.performClick(webinar.registerButton);
      const modaltext = await commonPage.getElementText(webinar.heading);
      assert.strictEqual(modaltext, "You're all Set!");
      await commonPage.isElementExists(webinar.continueButton);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });

})