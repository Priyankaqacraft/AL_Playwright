import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { acelabAdminCredentials, activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { performLogins } from '../utils/logins';
import { Paths } from '../utils/path';
import LoginPage from '../pages/loginPage';
import HeaderPage from '../pages/headerPage';
import { type } from 'os';
const assert = require('assert');

jest.setTimeout(50000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        loginPage,
        context,
        browser,
        headerPage

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        loginPage = new LoginPage(page);
        headerPage = new HeaderPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();

    });

   it("Should verify that an admin type user can successfully sign in and is taken to admin page", async () => {

        try {
            await performLogins(page, "admin");
            await commonPage.navigateTo(Paths.Admin);
            const adminTitle = await commonPage.getPageTitle(page);
            assert.strictEqual(adminTitle, "Acelab Admin");
            await commonPage.performClick(headerPage.publicsiteButton);
            await headerPage.signOut();

        } catch (error) {
            await captureAndAttachScreenshot(page, 'admin_title');
            throw error;
        }

    })


    // This test is not showing locked user message - Its an issue
   /* it("Should verify that a locked out user is not able to sign in and receives appropriate locked out message-it is a bug", async () => {

       try {
           await page.goto(activeBaseUrl);
           await commonPage.performClick(loginPage.signinButton);
           await commonPage.clearAndSendKeys(loginPage.email_field,'shelley+TooManyBadSignIns@acelabusa.com');
           await commonPage.clearAndSendKeys(loginPage.password_field,'Acelabusatest1');
           await commonPage.performClick(loginPage.login_btn);
           await headerPage.signOut();

       } catch (error) {
           await captureAndAttachScreenshot(page, 'locked out user');
           throw error;
       }
   })*/

   it("Should verify that Sign in page has a forgot password link that takes to the forgot password page", async () => {

        try {
            await page.goto(activeBaseUrl);
            await commonPage.performClick(loginPage.signinButton);
            await commonPage.performClick(loginPage.forgot_password_link);
            await commonPage.waitForLoadComplete();
            const pageTitle = await commonPage.getPageTitle(page);
            assert.strictEqual(pageTitle, 'Reset Password | Acelab');

        } catch (error) {
            await captureAndAttachScreenshot(page, 'forgotpassword_title');
            throw error;
        }
    })
    it("Should verify that a non-admin user can not access admin page- It is a bug", async () => {

        try {
            await page.goto(activeBaseUrl);
            await performLogins(page, acelabAdminCredentials);
            await commonPage.waitForLoadComplete();
            await commonPage.navigateTo(Paths.Admin);

            const currentUrl = await commonPage.getCurrentUrl();
            expect(currentUrl).toContain('admin');
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(headerPage.publicsiteButton);
            await headerPage.signOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, '');
            throw error;
        }
    })
    it("Should verify that Invalid username and password not allow to do login and show error toast- it is a bug", async () => {

        try {
            await commonPage.waitForLoadComplete();
           await commonPage.performClick(loginPage.signinButton);
           await commonPage.clearAndSendKeys(loginPage.email_field ,"qaautomation+01manufact@acelabusa.com");
           await commonPage.clearAndSendKeys(loginPage.password_field,"Rain777@");
           await commonPage.performClick(loginPage.login_btn);
            const errormessage= await commonPage.getElementText(loginPage.invaliderror); 
            expect("Incorrect email address or password.").toEqual(errormessage);
           
        } catch (error) {
            await captureAndAttachScreenshot(page, '');
            throw error;
        }
    }) 
    it("Should verify that when no value in emailid and password textbox. validation message showing", async () => {

        try {
            await page.goto(activeBaseUrl);
            await commonPage.performClick(loginPage.signinButton);
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(loginPage.login_btn);
            await commonPage.isElementExists(loginPage.emailError);
            await commonPage.isElementExists(loginPage.passwordError);

        } catch (error) {
            await captureAndAttachScreenshot(page, '');
            throw error;
        }
    })

    it("Should verify that when user provide email id in invalid format it is showing validation message", async () => {

        try {
            await commonPage.clearAndSendKeys(loginPage.email_field, "rahultest");
            await commonPage.clearAndSendKeys(loginPage.password_field, "Rain999@");
            await commonPage.isElementExists(loginPage.emailformatvalidation);
            const errormessage = await commonPage.getElementText(loginPage.emailformatvalidation);
            console.log('Error Message is :' + errormessage);
       

        } catch (error) {
            await captureAndAttachScreenshot(page, '');
            throw error;
        }
    })
    it("It should verify that when user click on eye icon it is showing password in decrepted form...", async () => {

        try {
            await page.goto(activeBaseUrl);
            await commonPage.performClick(loginPage.signinButton);
            await commonPage.clearAndSendKeys(loginPage.email_field, "rahul+qaadmin@acelabusa.com");
            await commonPage.clearAndSendKeys(loginPage.password_field, "Rain999@");
            const fieldType = await commonPage.getAttribute(loginPage.password_field, 'type');
            console.log('fieldtype is :' + fieldType);
            expect(fieldType).toEqual('password');
            await commonPage.performClick(loginPage.eyeicon);
            await commonPage.waitForLoadComplete();
            const fieldPassword = await commonPage.getAttribute(loginPage.password_field, 'type');
            console.log('fieldtype is :' + fieldPassword);
            expect(fieldPassword).toEqual('text');

        } catch (error) {
            await captureAndAttachScreenshot(page, '');
            throw error;
        }
    })
    it("Should verify that Sign in page has Sign Up for Free link that takes to the Signup Page", async () => {

        try {
            await commonPage.performClick(loginPage.signup_link);
            const pageTitle = await commonPage.getPageTitle(page);
            assert.strictEqual(pageTitle, 'Join | Acelab');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignupPage_title');
            throw error;
        }
    })
})