import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import AccessibilityPage from '../pages/accessibilityPage';
import ArticlesListPage from '../pages/articlesListPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { afterAll } from '@jest/globals';
const assert = require('assert');

jest.setTimeout(120000);

describe('Articles List Page Tests', () => {
    let browser, page, timestampUTC, accessibilityPage, articlesListPage, commonPage, context;

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        browser = setupResults.browser;
        page = setupResults.page;
        context = browser.defaultBrowserContext();
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        accessibilityPage = new AccessibilityPage(page);
        articlesListPage = new ArticlesListPage(page);
        await page.goto(activeBaseUrl + Paths.Articles);
    }, 60000);

    afterAll(async () => {
        await teardown();
    });

    it('Articles List Page SEO tags', async () => {
        try {
            const pageTitle = await page.title();
            assert.strictEqual(pageTitle, 'Acelab | Architect Blog & Articles: Guides, Tips & Case Studies');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_pageTitle');
            throw error;
        }
    }, 50000);

    it('Articles List Page SEO tags', async () => {
        try {
            const metaDescription = await articlesListPage.getMetaContentName(accessibilityPage.metaDescriptionSelector);
            assert.strictEqual(metaDescription,
                'Discover informative architect blogs for valuable insights, tips, and inspiration. Stay updated with the latest industry trends. Learn more.');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_metaDescription');
            throw error;
        }
    }, 50000);

    it('Articles List Page SEO tags', async () => {
        try {
            const metaRobots = await articlesListPage.getMetaContentName(accessibilityPage.metaRobotsSelector);
            assert.strictEqual(metaRobots, 'index, follow');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_metaRobots');
            throw error;
        }
    }, 50000);

    it('Articles List Page SEO tags', async () => {
        try {
            const metaViewport = await articlesListPage.getMetaContentName(accessibilityPage.metaViewportSelector);
            assert.strictEqual(metaViewport, 'width=device-width, initial-scale=1');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_metaViewport');
            throw error;
        }
    }, 50000);


    it('Articles List Page SEO tags', async () => {

        try {
            const metaCharset = await page.$eval('meta[charset]', (meta) => meta.getAttribute('charset'));
            assert.ok(metaCharset, 'Did not find the expected meta charset.');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_metaCharset');
            throw error;
        }
    }, 50000);

    it('Articles list page contains the expected header', async () => {

        try {
            await commonPage.waitForLoadComplete();
            const titleText = await accessibilityPage.getParagraphText(articlesListPage.title);
            assert.strictEqual(titleText, "Acelab Articles: Keeping you informed", "The articles list page did not contain the expected header");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_metaCharset');
            throw error;
        }

    }, 50000);

    it('Articles list page contains the expected header', async () => {

        try {
            const subheaderText = await accessibilityPage.getParagraphText(articlesListPage.subheader);
            assert.strictEqual(subheaderText, "I want to read about", "The articles list page did not contain the expected subheader");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_subheaderText');
            throw error;
        }

    }, 50000);

    it('Articles list page contains the expected category buttons', async () => {

        try {
            await commonPage.waitForLoadComplete();

            const categoryButtonsVisible = await commonPage.isElementDisplayed(articlesListPage.categoryButtonList);
            assert.strictEqual(categoryButtonsVisible, true, "Could not locate the category buttons");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_categoryButton');
            throw error;
        }

    }, 50000);

    it('Articles list page contains the expected category buttons', async () => {

        try {
            const isCaseStudiesCategoryHeaderVisible = await commonPage.isVisibleInViewport(articlesListPage.case_studies_category_header);
            assert.strictEqual(isCaseStudiesCategoryHeaderVisible, false, "Case studies category header should not be visible in viewport");

            await commonPage.waitForLoadComplete();
            await commonPage.waitForLoadComplete();

            await commonPage.performClick(articlesListPage.modalCloseButton);
            await commonPage.performClick(articlesListPage.caseStudiesCategoryButton);
        }
        catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_isCaseStudiesCategoryHeader');
            throw error;
        }
    }, 50000);

    it('Articles list page contains the expected category buttons', async () => { 
        try{
            await commonPage.waitForLoadComplete();

            const isElementDisplay = await commonPage.isElementDisplayed(articlesListPage.caseStudiesCategoryHeader);
            assert.strictEqual(isElementDisplay, true, "Case studies header is not found");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_Case studies header');
            throw error;
        }

    }, 50000);

    it('Articles list page contains the expected category buttons', async () => { 

        try {
            await commonPage.waitForLoadComplete();
            const headerVisibleAfterScroll = await commonPage.isVisibleInViewport(articlesListPage.caseStudiesCategoryHeader);
            assert.strictEqual(headerVisibleAfterScroll, true, "Case studies header should be visible in viewport");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_Case studies header in viewport');
            throw error;
        }

    }, 50000);

    it('Articles list page article links take you to expected article', async () => {
        try {
            const isElementDisplay = await commonPage.isElementDisplayed(articlesListPage.second_article_link);
            assert.strictEqual(isElementDisplay, true, "The element is not display");

            await commonPage.waitForLoadComplete();

            const firstArticleTitle = await accessibilityPage.getParagraphText(articlesListPage.second_article_link)
            console.log("First article title:", firstArticleTitle);

            await commonPage.performClick(articlesListPage.second_article_link);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Articles_metaCharset');
            throw error;
        }

    }, 50000);
});