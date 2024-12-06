import { teardown, noLoginsetup } from './setup.js';
import CommonPage from '../pages/commonPage.js';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper.js';
import HeaderPage from '../pages/headerPage.js';
import { performLogins } from '../utils/logins.js';
import { activeBaseUrl } from '../utils/config';
import loginPage from '../pages/loginPage.js';
import manufacturerFinder from '../pages/manufacturerFinderPage.js';
import manufacturerDetail from '../pages/manufacturerDetailPage.js';
import manufacturerSearch from '../pages/manufacturerSearchPage.js';
import { Paths } from '../utils/path.js';
import path from 'path';

const assert = require('assert')
jest.setTimeout(80000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        headerPage,
        loginpage,
        context,
        browser,
        finder,
        detail,
        search


    beforeAll(async () => {

        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        loginpage = new loginPage(page);
        headerPage = new HeaderPage(page);
        finder = new manufacturerFinder(page);
        detail = new manufacturerDetail(page);
        search = new manufacturerSearch(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

    it('It should verify that when user click on "Brand" button while searching, that button color changed to green ', async () => {

        try {
            await performLogins(page, "regression");
            await commonPage.clearAndSendKeys(headerPage.searchbar, "abc");
            await commonPage.performClick(search.brandButton);
            await commonPage.wait(10);
            const fieldType = await commonPage.getAttribute(search.brandButton, 'class');
            console.log('fieldtype is :' + fieldType);
            expect(fieldType).toContain("active:scale-105");
            await commonPage.performClick(search.abclink);
            const openedurl = await commonPage.getCurrentUrl();
            const expectedurl = (activeBaseUrl + Paths.manufacture + Paths.ManufactureBrandPage);
            assert.strictEqual(openedurl, expectedurl);

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that when user click on "Brand" name "abc window system", that takes us to its respectinv brand page ', async () => {

        try {

            await commonPage.performClick(search.abclink);
            const openedurl = await commonPage.getCurrentUrl();
            const expectedurl = (activeBaseUrl + Paths.manufacture + Paths.ManufactureBrandPage);
            assert.strictEqual(openedurl, expectedurl);

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that when user search with invalid brand name, it is showing message "No results found. Try searching for a brand name." ', async () => {

        try {

            await commonPage.performClick(headerPage.acelab_logo);
            await commonPage.clearAndSendKeys(headerPage.searchbar, "H Test");
            await commonPage.performClick(search.brandButton);
            await commonPage.wait(10);
            const message = await commonPage.getElementText(search.message);
            const expectedmessage = 'No results found. Try searching for a brand name.';
            assert.strictEqual(message, expectedmessage);


        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that when user search with invalid Resource name, it is showing message "No results found. Try searching for keywords related to articles, details or courses." ', async () => {

        try {

            await commonPage.performClick(headerPage.acelab_logo);
            await commonPage.clearAndSendKeys(headerPage.searchbar, "H Test");
            await commonPage.performClick(search.resouceButton);
            await commonPage.wait(10);
            const message = await commonPage.getElementText(search.message);
            const expectedmessage = 'No results found. Try searching for keywords related to articles, details or courses.';
            assert.strictEqual(message, expectedmessage);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that when user search with valid Resource name, it is showing relevant search ', async () => {

        try {

            await commonPage.performClick(headerPage.acelab_logo);
            await commonPage.clearAndSendKeys(headerPage.searchbar, "building science");
            await commonPage.performClick(search.resouceButton);
            await commonPage.wait(10);
            await commonPage.isElementExists(search.productguide);

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that when user search with valid Resource name, it is showing relevant search ', async () => {

        try {
            await commonPage.performClick(search.articleclick);
            await commonPage.wait(10);
            const openedurl = await commonPage.getCurrentUrl();
            const expectedurl = (activeBaseUrl + Paths.Articles + Paths.articleurl);
            assert.strictEqual(openedurl, expectedurl);

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
});