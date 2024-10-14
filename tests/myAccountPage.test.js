import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import { performLogins } from '../utils/logins';
import AccessibilityPage from '../pages/accessibilityPage';
import MyAccountPage from '../pages/myaccountPage';
import EditPersonalInfoPage from '../pages/editPersonalInfoPage';

const assert = require('assert');

jest.setTimeout(30000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        editPersonalInfo,
        accessibilityPage,
        expectedPersonalInfoFields,
        expectedSettingSection,
        myaccountPage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        accessibilityPage = new AccessibilityPage(page);
        myaccountPage = new MyAccountPage(page);
        editPersonalInfo = new EditPersonalInfoPage(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

    it("Should verify that My Account Page SEO title", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.MyAccount);
            const title = await page.title();
            assert.strictEqual(title, "Manage Account | Acelab");
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SEO title');
            throw error;
        }
    })

    it("Should verify that My Account Page meta Robots", async () => {
        try {
            const metaRobots = await commonPage.getMetaContentName(accessibilityPage.metaRobotsSelector);
            expect(metaRobots).toBe("index, follow");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaRobots');
            throw error;
        }
    })

    it("Should verify that My Account Page meta Viewport", async () => {
        try {
            const metaViewport = await commonPage.getMetaContentName(accessibilityPage.metaViewportSelector);
            expect(metaViewport).toBe("width=device-width, initial-scale=1");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaViewport');
            throw error;
        }
    })

    it("Should verify that My Account Page meta Charset Exists", async () => {
        try {
            const metaCharset = await page.evaluate((selector) => {
                const metaCharsetTag = document.querySelector(selector);
                return metaCharsetTag ? metaCharsetTag.hasAttribute('charset') : false;
            }, accessibilityPage.metaCharsetSelector);
            expect(metaCharset).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaCharset');
            throw error;
        }
    })

    it("Should verify that a verified user can successfully sign in and view my account page", async () => {
        try {
            await performLogins(page, 'mfgRep');
            await commonPage.navigateTo(Paths.MyAccount);
            const email_Verify = await commonPage.isElementDisplayed(myaccountPage.email_Verified);
            expect(email_Verify).toBe(true);
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Verified user can view my account Page ');
            throw error;
        }
    })

    it("Should verify that an unverified user can not view my account page", async () => {
        try {
            await performLogins(page, 'unverified');
            await commonPage.navigateTo(Paths.MyAccount);
            const pageContent = await page.content();
            const isContentPresent = pageContent.includes("acelab | my account");
            expect(isContentPresent).toBe(false);
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Unverified user can view my account');
            throw error;
        }
    })

    it("Should verify that 'My Account' page contains expected personal info", async () => {
        try {
            await performLogins(page, 'unverified');
            await commonPage.navigateTo(Paths.MyAccount);
            const personalInfo = await commonPage.getElementText(editPersonalInfo.personal_info_section);
            console.log("Current Text", personalInfo);
            expectedPersonalInfoFields = `Personal Info Edit First Name qa Last Name rahul Email rahul+unverified@acelabusa.com Role Other Job Title Head of In Charge Phone Number 2151234567 AIA Number test LinkedIn URL https://www.linkedin.com/ Home Address Test StreetBeaumont, Texas 77705United States`;
            console.log("Expected Text" + expectedPersonalInfoFields);
            assert.strictEqual(personalInfo, expectedPersonalInfoFields, "The 'My Account' page did not contain the expected personal info");
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'My Account page personal info');
            throw error;
        }
    })

    it("Should verify that 'My Account' page contains expected settings and prefrences", async () => {

        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.MyAccount);
            const setting_Section = await commonPage.getElementText(myaccountPage.settings_section);
            console.log("Current Text", setting_Section);
            expectedSettingSection = `Settings & Preferences Edit Email Notifications Transactional & Product Updates`;
            console.log("Expected Text" + expectedSettingSection);
            assert.strictEqual(setting_Section, expectedSettingSection, "The 'My Account' page did not contain the expected setting section");
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'My Account page settings and prefrences');
            throw error;
        }
    })

    it("Should verify that the Personal Info Edit title", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.MyAccount);
            await commonPage.performClick(myaccountPage.personal_info_edit_link);
            const title = await page.title();
            assert.strictEqual(title, "acelab | edit personal info");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Personal Info Edit title');
            throw error;
        }
    })

    it("Should verify that the Personal Info Edit link opens expected page in same tab", async () => {
        try {
            const url = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(url.length, 1, "The link did not open in the new tab as expected.");
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Personal Info Edit link');
            throw error;
        }
    })

    it("Should verify that the Settings Edit page contains Edit Settings", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.MyAccount);
            await commonPage.performClick(myaccountPage.settings_edit_link);
            const pageContent = await page.content();
            const isContentPresent = pageContent.includes("Edit Settings");
            expect(isContentPresent).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Edit Settings');
            throw error;
        }
    })

    it("Should verify that the Settings Edit link opens expected page in same tab", async () => {
        try {
            const url = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(url.length, 1, "The link did not open in the new tab as expected.");
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Settings Edit link');
            throw error;
        }
    })

    it("Should verify that change password link opens change password page", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.MyAccount);
            await commonPage.performClick(myaccountPage.change_password_link);
            const title = await page.title();
            assert.strictEqual(title, "acelab | my account - change password");
            await myaccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Change password link');
            throw error;
        }
    })
})