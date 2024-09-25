import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import AccessibilityPage from '../pages/accessibilityPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { afterAll } from '@jest/globals';

jest.setTimeout(120000);

describe('Accessibility Page Tests', () => {
  let browser, page, timestampUTC, accessibilityPage, commonPage, context;

  beforeAll(async () => {
    const setupResults = await noLoginsetup();
    browser = setupResults.browser;
    page = setupResults.page;
    context = browser.defaultBrowserContext();
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    accessibilityPage = new AccessibilityPage(page);
    await page.goto(activeBaseUrl + Paths.Accessibility);
  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  it('Accessibility Page SEO tags', async () => {

    try {
      const pageTitle = await page.title();
      expect(pageTitle).toBe('Accessibility | Acelab');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Title_Accessibility');
      throw error;
    }

  }, 50000);

  it('Accessibility Page SEO tags', async () => {

    try {
      const metaDescription = await commonPage.getMetaContentName(accessibilityPage.metaDescriptionSelector);
      expect(metaDescription).toBe("Acelab is committed to diversity, inclusion and accessibility. If you have a question or problem, please reach out to support@acelabusa.com.");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Accessibility_metaDescription');
      throw error;
    }

  }, 50000);

  it('Accessibility Page SEO tags', async () => {

    try {
      const metaRobots = await commonPage.getMetaContentName(accessibilityPage.metaRobotsSelector);
      expect(metaRobots).toBe("index, follow");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Accessibility_metaRobots');
      throw error;
    }

  }, 50000);

  it('Accessibility Page SEO tags', async () => {

    try {
      const metaViewport = await commonPage.getMetaContentName(accessibilityPage.metaViewportSelector);
      expect(metaViewport).toBe("width=device-width, initial-scale=1");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Accessibility_metaViewport');
      throw error;
    }

  }, 50000);

  it('Accessibility Page SEO tags', async () => {
    try {
        const metaCharset = await page.evaluate((selector) => {
          const metaCharsetTag = document.querySelector(selector);
          return metaCharsetTag ? metaCharsetTag.hasAttribute('charset') : false;
      }, accessibilityPage.metaCharsetSelector);
      expect(metaCharset).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Accessibility_metaCharset');
      throw error;
    }

  }, 50000);

  it('Accessibility Page SEO tags', async () => {

    try {
      const firstParagraphText = await commonPage.getParagraphText(accessibilityPage.first_paragraph);
      expect(firstParagraphText).toBe("Acelab is committed to diversity, inclusion and accessibility. These core values are fundamental to the way we do business and come through in the services we provide and the experiences that we design for people. To this end, we are continuously taking steps to improve acelabusa.com and ensure it complies with the best practices and accessibility standards, including the Website Content Accessibility Guidelines 2.1 Levels A and AA success criteria. We are always continuing to evaluate and improve the accessibility of our website.");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Accessibility_firstParagraphText');
      throw error;
    }

  }, 50000);

  it('Accessibility page has expected content', async () => {

    try {
      const secondParagraphText = await commonPage.getParagraphText(accessibilityPage.second_paragraph);
      expect(secondParagraphText).toContain("If you have an accessibility-related question, comment, or problem, please reach out to support@acelabusa.com with");
    } catch {
      await captureAndAttachScreenshot(page, 'Accessibility_secondParagraphText');
      throw error;
    }

  });

  it('Accessibility page has support@acelabusa.com link', async () => {
    try {
      const isEmailLinkDisplayed = await commonPage.isElementDisplayed(accessibilityPage.email_link);
      expect(isEmailLinkDisplayed).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Accessibility_isEmailLinkDisplay');
      throw error;
    }

  }, 50000);
});
