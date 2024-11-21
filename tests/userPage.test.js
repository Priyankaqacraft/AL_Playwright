import { teardown, setup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import AccessibilityPage from '../pages/accessibilityPage'; 
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import AboutUs from '../pages/aboutusPage';
import UserPage from '../pages/usersPage';
import { afterAll } from '@jest/globals';
const assert = require('assert');

jest.setTimeout(120000);

describe('Users Page Tests From Admin', () => {
  let browser, page, userPage, timestampUTC, accessibilityPage, commonPage, aboutusPage, context;

  beforeAll(async () => {
    const setupResults = await setup();
    browser = setupResults.browser;
    page = setupResults.page;
    context = browser.defaultBrowserContext();
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    accessibilityPage = new AccessibilityPage(page);
    aboutusPage = new AboutUs(page);
    userPage = new UserPage(page);
    await page.goto(activeBaseUrl);
  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  it('SEO test on the Users Page', async () => {

    try {
        await commonPage.navigateTo(Paths.Admin + Paths.User);
        const pageTitle = await page.title();
        assert.strictEqual(pageTitle, "Users - Acelab Admin");
    } catch (error) {
        await captureAndAttachScreenshot(page, 'Title_Users - Acelab Admin');
        throw error;
    }

    }, 50000);

    it('SEO test on the Users Page', async () => {
        try {
            const metaViewport = await commonPage.getMetaContentName(accessibilityPage.metaViewportSelector);
            assert.strictEqual(metaViewport, "width=device-width, initial-scale=1", "Incorrect viewport meta tag");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaViewport');
            throw error;
        }
    
    }, 50000);

    it('SEO test on the Users Page', async () => {
        try {
            const metaDescription = await commonPage.getMetaContentName(accessibilityPage.metaDescriptionSelector);
            assert.strictEqual(metaDescription,"");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaDescription');
            throw error;
        }
    
    }, 50000);

    it('SEO test on the Users Page', async () => {
        try {
            const metaFormatDetection = await commonPage.getMetaContentName(accessibilityPage.metaFormatDetectionSelector);
            assert.strictEqual(metaFormatDetection, "telephone=no", "Incorrect format-detection meta tag");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaFormatDetection');
            throw error;
        }
    
    }, 50000);

    it('SEO test on the Users Page', async () => {
        try {
            const metaRobots = await commonPage.getMetaContentName(accessibilityPage.metaRobotsSelector);
            assert.strictEqual(metaRobots, 'index, follow');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaRobots');
            throw error;
        }
    
    }, 50000);

    it('SEO test on the Users Page', async () => {
        try {
            const metaPinterest = await commonPage.getMetaContentName(aboutusPage.meta_pinterest);
            assert.strictEqual(metaPinterest, 'nopin');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaPinterest');
            throw error;
        }
    
    }, 50000);

    
    it('Negative Search test on the Users Page', async () => {

        try {
        await commonPage.navigateTo(Paths.Admin + Paths.User);
        await commonPage.waitForLoadComplete();

        const userTab = await page.waitForXPath(userPage.userTab);
        assert.strictEqual(userTab !== null, true, "User tab not found");
        } catch (error) {
        await captureAndAttachScreenshot(page, 'userTab');
        throw error;
        }
    }, 50000);

    it('Negative Search test on the Users Page', async () => {

        try {
        const searchUserField = await page.$x(userPage.searchUser); 
        await searchUserField[0].type('rrrrrrrrrr');

        await page.waitForTimeout(5000);

        const warningMessageText = await commonPage.getElementText(userPage.warningMessage);
        assert.strictEqual(warningMessageText, "No Users found!", `Expected "No Users found!" but got "${warningMessageText}"`);

        const crossIcon = await page.$x(userPage.crossIcon); 
        await crossIcon[0].click();
        } catch (error) {
        await captureAndAttachScreenshot(page, 'warningMessageText');
        throw error;
        }
    }, 50000);


    it('Positive search test on the Users Page', async () => {

        try {
        await commonPage.navigateTo(Paths.Admin + Paths.User);
        await commonPage.waitForLoadComplete();

       const userTabHandle = await page.$x(userPage.userTab);
        if (userTabHandle.length > 0) {
            console.log("User tab is visible.");
        } else {
            console.error("User tab not found.");
        }

        const searchUserField = await page.$x(userPage.searchUser); 
        await searchUserField[0].type('admin');
        
        await page.keyboard.press('Enter');

        await commonPage.waitForLoadComplete();

        await commonPage.performClick(userPage.view_account_details);

        await commonPage.waitForLoadComplete(page);

        const firstNameTitle = await commonPage.getElementText(userPage.First_name_title);
        assert.strictEqual(firstNameTitle, 'First Name', 'Expected First Name title');
        } catch (error) {
        await captureAndAttachScreenshot(page, 'firstNameTitle');
        throw error;
        }
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const firstNameValue = await commonPage.getElementText(userPage.First_name_value);
            assert.strictEqual(firstNameValue, 'Irfan', 'Expected First Name value to be Irfan');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'firstNameValue');
            throw error;
        }

    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const emailTitle = await commonPage.getElementText(userPage.Email_address_title);
            assert.strictEqual(emailTitle, 'Email', 'Expected Email title');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'emailTitle');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const emailValue = await commonPage.getElementText(userPage.Email_address_value);
            assert.strictEqual(emailValue, 'irfan+admin@acelabusa.com', 'Expected email value');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'emailValue');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const userTypeTitle = await commonPage.getElementText(userPage.User_type_title);
            assert.strictEqual(userTypeTitle, 'User Type', 'Expected User Type title');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'emailValue');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const userTypeValue = await commonPage.getElementText(userPage.User_type_value);
            assert.strictEqual(userTypeValue, '-', 'Expected User Type value');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'emailValue');
            throw error;
        }
        
    }, 50000);
       
    it('Positive search test on the Users Page', async () => {

        try {
            const companyTitle = await commonPage.getElementText(userPage.Company_title);
            assert.strictEqual(companyTitle, 'Company', 'Expected Company title');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'emailValue');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const companyValue = await commonPage.getElementText(userPage.Company_value);
            assert.strictEqual(companyValue, '-', 'Expected Company value');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'companyValue');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const companyValue = await commonPage.getElementText(userPage.Company_value);
            assert.strictEqual(companyValue, '-', 'Expected Company value');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'companyValue');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const jobTitle = await commonPage.getElementText(userPage.Job_title);
            assert.strictEqual(jobTitle, 'Job Title', 'Expected Job Title');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'jobTitle');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const jobValue = await commonPage.getElementText(userPage.Job_value);
            assert.strictEqual(jobValue, 'QA', 'Expected Job Value to be QA');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'jobValue');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const phoneNumberTitle = await commonPage.getElementText(userPage.Phone_number_title);
            assert.strictEqual(phoneNumberTitle, 'Phone Number', 'Expected Phone Number title');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'phoneNumberTitle');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const phoneNumberValue = await commonPage.getElementText(userPage.Phone_number_value);
            assert.strictEqual(phoneNumberValue, '-', 'Expected Phone Number value');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'phoneNumberValue');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const homeAddressTitle = await commonPage.getElementText(userPage.Home_address_title);
            assert.strictEqual(homeAddressTitle, 'Home Address', 'Expected Home Address title');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'homeAddressTitle');
            throw error;
        }
        
    }, 50000);

    it('Positive search test on the Users Page', async () => {

        try {
            const homeAddressValue = await commonPage.getElementText(userPage.Home_address_value);
            assert.strictEqual(homeAddressValue, '-', 'Expected Home Address value');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'homeAddressValue');
            throw error;
        }

        const closeButtonHandle = await page.$x(userPage.close_button);

        if (closeButtonHandle.length > 0) {
            const closeButtonText = await page.evaluate(el => el.innerText, closeButtonHandle[0]);
        } else {
            console.error("Close button not found.");
        }

        await commonPage.performClick(userPage.close_button);
        
    }, 50000);
});
