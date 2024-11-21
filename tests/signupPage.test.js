import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import SignupPage from '../pages/signupPage';
import LoginPage from '../pages/loginPage';
const assert = require('assert');

jest.setTimeout(30000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        signupPage,
        loginPage,
        date,
        context,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        signupPage = new SignupPage(page);
        loginPage = new LoginPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        await page.goto(activeBaseUrl);
    });

    date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    afterAll(async () => {
        await teardown();
    });

     
    it("Should verify that registration page email input fields have expected validation", async () => {

        try {
            await commonPage.performClick(loginPage.joinforfreeButton);
           //await commonPage.waitForLoadComplete();
            await commonPage.clearAndSendKeys(signupPage.emailField, 'AutoTest@example');
            await commonPage.clearAndSendKeys(signupPage.passwordField, 'lab');
            await commonPage.clearAndSendKeys(signupPage.firstNameField, ' ');
            await commonPage.clearAndSendKeys(signupPage.lastNameField, ' ');
            await commonPage.performClick(signupPage.btnCreateAccount);

            const emailValidation = await commonPage.getElementText(signupPage.emailValidation);
            expect(emailValidation).toContain("Email format invalid. Please try again.");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'email fields validation');
            throw error;
        }
    })

    it("Should verify that registration page password input fields have expected validation", async () => {

        try {
            const passwordValidation = await commonPage.getElementText(signupPage.passwordValidation);
            expect(passwordValidation).toContain("Password must be at least 8 characters.");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'password fields validation');
            throw error;
        }
    })

    it("Should verify that the 'Terms of Use' link opens terms of use page in new tab", async () => {

        try {
            // await commonPage.waitForLoadComplete();
            await commonPage.performClick(signupPage.terms_of_use_link);

            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 2, "The link did not open in the new tab as expected.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Terms of Use tab');
            throw error;
        }
    })

    it("Should verify that the 'Terms of Use' paragraph text", async () => {

        try {
            //await commonPage.waitForLoadComplete();
            await commonPage.switchTo(Paths.TermsOfUse);

            const secondParagraphText = await commonPage.getParagraphText(signupPage.paragraph_second);
            expect(secondParagraphText).toContain("These Terms outline your rights, obligations and restrictions regarding your use of the Service, please read them carefully.");
            // await commonPage.waitForLoadComplete();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Terms of Use paragraph');
            throw error;
        }   
    })

    it("Should verify that the 'Terms of Use' contains terms-of-use", async () => {

        try {
           // await commonPage.waitForLoadComplete();
            const allPages = await browser.pages();

            for (const currentPage of allPages) {
                const currentUrl = await currentPage.url();
                if (currentUrl.includes('terms-of-use')) {
                    expect(currentUrl).toContain('terms-of-use');
                }

                if (currentUrl.includes('terms-of-use')) {
                    await currentPage.close();
                }
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Terms of Use url');
            throw error;
        }
    })

    it("Should verify that the 'Privacy Policy' link opens privacy policy page in new tab", async () => {

        try {
           // await commonPage.waitForLoadComplete();
            await commonPage.switchTo(Paths.Barrierlink);
            await commonPage.performClick(signupPage.privacy_policy_link);

            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 2, "The link did not open in the new tab as expected.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Privacy Policy tab');
            throw error;
        }
    })

    it("Should verify that the 'Privacy Policy' paragraph text", async () => {

        try {
           //await commonPage.waitForLoadComplete();
            await commonPage.switchTo(Paths.PrivacyPolicy);

            const privacyPolicyParagraphText = await commonPage.getParagraphText(signupPage.privacy_policy_paragraph);
            expect(privacyPolicyParagraphText).toContain("This Privacy Policy describes");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'Privacy Policy paragraph');
            throw error;
        }        
    })

    it("Should verify that the 'Privacy Policy' contains privacy-policy", async () => {

        try {
            //await commonPage.waitForLoadComplete();
            const allPages = await browser.pages();

            for (const currentPage of allPages) {
                const currentUrl = await currentPage.url();
                if (currentUrl.includes('privacy-policy')) {
                    expect(currentUrl).toContain('privacy-policy');
                }

                if (currentUrl.includes('privacy-policy')) {
                    await currentPage.close();
                }
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Privacy Policy url');
            throw error;
        }
    })

    it("Should verify that a user can successfully register using native auth and registration Success Message", async () => {
 
        try {

            await commonPage.switchTo(Paths.Barrierlink);
            await page.goBack();
            const randomNum = await commonPage.createRandomNumber(100);

            await signupPage.registerANewUser(`FN${date}`, 'AutoTestLN', `${date + randomNum}@acelabusa.com`, 'AutoTest123456');
            await page.waitForXPath(signupPage.registration_success_message, { visible: true });

            const registrationSuccessMessage = await commonPage.getElementText(signupPage.registration_success_message);
            expect(registrationSuccessMessage).toContain("Welcome to the Acelab Community!");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'registration');
            throw error;
        }

    })

    it("Should verify account setup", async () => {

        try {
            // await commonPage.waitForLoadComplete();
            await commonPage.performClick(signupPage.btnDone);

            const link_account_setup = await commonPage.getElementText(signupPage.link_account_setup);
            expect(link_account_setup).toContain("Complete Your Account");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'account setup');
            throw error;
        }
    }) 
})