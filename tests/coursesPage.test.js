import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import AccessibilityPage from '../pages/accessibilityPage';
import CoursesPage from '../pages/coursesPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { afterAll } from '@jest/globals';
const assert = require('assert');

jest.setTimeout(120000);

describe('Courses Page Tests', () => {
    let browser, page, userPage, timestampUTC, accessibilityPage, commonPage, coursesPage, context;

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        browser = setupResults.browser;
        page = setupResults.page;
        context = browser.defaultBrowserContext();
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        accessibilityPage = new AccessibilityPage(page);
        coursesPage = new CoursesPage(page);
        await page.goto(activeBaseUrl + Paths.Courses);
    }, 60000);

    afterAll(async () => {
        await teardown();
    });

    it('Courses Page SEO tags', async () => {

        try {
            const pageTitle = await page.title();
            assert.strictEqual(pageTitle, 'Building Science Courses | Acelab Courses', "Page title is incorrect.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'homeAddressTitle');
            throw error;
        }
    }, 50000);

    it('Courses Page SEO tags', async () => {

        try {
            const metaRobots = await commonPage.getMetaContentName(accessibilityPage.metaRobotsSelector);
            assert.strictEqual(metaRobots, 'index, follow');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaRobots');
            throw error;
        }
    }, 50000);

    it('Courses Page SEO tags', async () => {

        try {
            const metaViewport = await commonPage.getMetaContentName(accessibilityPage.metaViewportSelector);
            assert.strictEqual(metaViewport, 'width=device-width, initial-scale=1');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaViewport');
            throw error;
        }
    }, 50000);

    it('Courses Page SEO tags', async () => {

        try {
            const metaCharset = await page.$eval('meta[charset]', (meta) => meta.getAttribute('charset'));
            assert.ok(metaCharset, 'Did not find the expected meta charset.');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'metaCharset');
            throw error;
        }
    }, 50000);

    it('Courses page expected text', async () => {

        try {
            const titleAndDescriptionText = await commonPage.getElementText(coursesPage.titleAndDescription);
            const actualText = titleAndDescriptionText.replace(/\s+/g, ' ').trim();
            const expectedText = "Practical, approachable & immediately applicable building science for architects and builders. Browse 30+ courses by topic, learn in less than 15 minutes, and complete a quiz for a course certificate. Learning has never been easier with Acelab."
            assert.strictEqual(actualText, expectedText, "The title and description text does not match the expected value");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'titleAndDescriptionText');
            throw error;
        }
    }, 50000);

    it('Courses page expected text', async () => {

        try {
            const infoBlocksText = await commonPage.getElementText(coursesPage.infoBlocks);
            assert.ok(infoBlocksText.includes("Course Creator Christine Williamson"), "Did not find accredited courses info headline");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'infoBlocksText1');
            throw error;
        }

    }, 50000);

    it('Courses page expected text', async () => {

        try {
            const infoBlocksText = await commonPage.getElementText(coursesPage.infoBlocks);
            assert.ok(infoBlocksText.includes("Christine is a building scientist & founder of the Instagram account"), "Did not find accredited courses info text");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'infoBlocksText2');
            throw error;
        }
    }, 50000);
});