import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { performLogins } from '../utils/logins';
import { Paths } from '../utils/path';
import ConstructionDetailsFinder from '../pages/constructionDetailsFinderPage';
const assert = require('assert');

jest.setTimeout(50000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        constructionDetailsFinderPage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        constructionDetailsFinderPage = new ConstructionDetailsFinder(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

    it("Should Verify Construcrtion Details Finder Page filter categories", async () => {
        try {
            await performLogins(page, 'admin'); // after admin login, its auto redirect to the admin site instead of public site
            await page.goto(activeBaseUrl);
            await commonPage.navigateTo(Paths.ConstructionDetailsFinder);
            await commonPage.waitForLoadComplete();
            const filterCategories = await commonPage.getList(constructionDetailsFinderPage.filter_categories);
            console.log("Filter Categories list is:" + filterCategories);
            expect(filterCategories).toContain('Cladding Type\nWall Type\nWall R-Value\nWindow Type');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Construcrtion Details Finder Page filter categories');
            throw error;
        }
    });

    it("Should Verify Construcrtion Details Finder Page filters length", async () => {
        try {
            const filterOptions = await page.$x(constructionDetailsFinderPage.filter);
            assert(filterOptions.length > 1, `Assertion Failed: Expected more than 1 element, but found ${filterOptions.length}.`);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Construcrtion Details Finder Page filters length');
            throw error;
        }
    });

    it("Should Verify Construcrtion Details Finder Page filters", async () => {
        try {
            const filterOptions = await commonPage.getList(constructionDetailsFinderPage.filter);
            console.log("Filter list is:" + filterOptions);
            expect(filterOptions).toContain('Masonry\nSiding\nStucco or Veneer\nWall Panels\nDouble Stud Wood Frame\nWood Frame\nWood Frame with Rigid Exterior Insulation\nWood Frame with Semi-Rigid Exterior Insulation\n10 - 19\n20 - 29\n30 - 39\n40 - 49\nFlanged & Proud\nFlanged & Recessed\nUnflanged & Proud\nUnflanged & Recessed');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Construcrtion Details Finder Page filters');
            throw error;
        }
    });

    it("Should Verify Construcrtion Details Finder Page authenticated user can click a detail", async () => {
        try {
            await commonPage.performClick(constructionDetailsFinderPage.detail_cards);
            await commonPage.waitForLoadComplete();
            const currentUrl = page.url();
            console.log(`Current Tab URL: ${currentUrl}`);
            expect(currentUrl).toContain('Double-Stud-Wood-Frame-Wall-with-Masonry-and-Flanged-and-Proud-Window');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Authenticated user can click a detail');
            throw error;
        }
    });

    it("Should Verify Construcrtion Details Finder details Page click on Back to Search", async () => {
        try {
            await commonPage.performClick(constructionDetailsFinderPage.btnBacktoSearch);
            await commonPage.waitForLoadComplete();
            const currentUrl = page.url();
            console.log(`Current Tab URL: ${currentUrl}`);
            expect(currentUrl).toContain('construction-details');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Construcrtion Details Finder details Page click on "Back to Search"');
            throw error;
        }
    });

    it("Should Verify Construcrtion Details Finder Page Search field", async () => {
        try {
            await commonPage.waitForLoadComplete();
            await commonPage.enterText(constructionDetailsFinderPage.searchBar, 'Proud');
            await page.keyboard.press('Enter');
            await commonPage.wait();
            const productCount = await commonPage.getElementText(constructionDetailsFinderPage.searchProductCountText);
            expect(productCount).toContain('44 Construction Details');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Construcrtion Details Finder Page Search field');
            throw error;
        }
    });

    it("Should Verify Construcrtion Details Finder Page Clear Search Button", async () => {
        try {
            await commonPage.performClick(constructionDetailsFinderPage.btnClearSearch);
            await commonPage.wait();
            const productCount = await commonPage.getElementText(constructionDetailsFinderPage.searchProductCountText);
            expect(productCount).toContain('80 Construction Details');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Construcrtion Details Finder Page Clear Search Button');
            throw error;
        }
    });

    it("Should Verify Construcrtion Details Finder Page click on 'Home' from breadcrumb", async () => {
        try {
            await commonPage.performClick(constructionDetailsFinderPage.breadcrumbHome);
            await commonPage.waitForLoadComplete();
            const currentUrl = page.url();
            console.log(`Current Tab URL: ${currentUrl}`);
            expect(currentUrl).toContain('home');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Construcrtion Details Finder Page click on Home from breadcrumb');
            throw error;
        }
    });
});