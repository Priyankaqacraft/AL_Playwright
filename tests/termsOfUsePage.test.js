import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import AccessibilityPage from '../pages/accessibilityPage';
import TermsOfUsePage from '../pages/termsOfUsePage';
import { afterAll } from '@jest/globals';
const assert = require('assert');

jest.setTimeout(120000);

describe('Terms Of Use Page Tests', () => {
  let browser, page, timestampUTC,
    accessibilityPage,
    termsOfUsePage,
    commonPage,
    context;

  beforeAll(async () => {
    const setupResults = await noLoginsetup();
    browser = setupResults.browser;
    page = setupResults.page;
    context = browser.defaultBrowserContext();
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    accessibilityPage = new AccessibilityPage(page);
    termsOfUsePage = new TermsOfUsePage(page);
    await page.goto(activeBaseUrl + Paths.TermsOfUse);
  }, 60000);

  afterAll(async () => {
    await teardown();
  });

   it('Terms of Use Page SEO tags', async () => {

    try {
      const pageTitle = await page.title();
      assert.strictEqual(pageTitle, 'Terms of Use | Acelab');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Title_Terms of Use | Acelab');
      throw error;
    }

  }, 50000);

  it('Terms of Use Page SEO tags', async () => {

    try {
      const metaDescription = await commonPage.getMetaContentName(accessibilityPage.metaDescriptionSelector);
      assert.strictEqual(metaDescription, "Review Acelab's terms to find out your rights, obligations and restrictions regarding your use of our website.", 'Meta description is not as expected');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'metaDescription');
      throw error;
    }

  }, 50000);

  it('Terms of Use Page SEO tags', async () => {

    try {
      const metaRobots = await commonPage.getMetaContentName(accessibilityPage.metaRobotsSelector);
      assert.strictEqual(metaRobots, 'index, follow');
    } catch (error) {

      await captureAndAttachScreenshot(page, 'metaRobots');
      throw error;
    }

  }, 50000);

  it('Terms of Use Page SEO tags', async () => {

    try {
      const metaViewport = await commonPage.getMetaContentName(accessibilityPage.metaViewportSelector);
      assert.strictEqual(metaViewport, 'width=device-width, initial-scale=1', 'Meta viewport content is not as expected');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'metaViewport');
      throw error;
    }

  }, 50000);

  it('Terms of Use Page SEO tags', async () => {

    try {
      const metaCharset = await page.$eval('meta[charset]', (meta) => meta.getAttribute('charset'));
      assert.ok(metaCharset, 'Did not find the expected meta charset.');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'metaCharset');
      throw error;
    }

  }, 50000);

  it('Terms Of Use page has expected first and second paragraph', async () => {

    try {
      const firstParagraphText = await accessibilityPage.getParagraphText(termsOfUsePage.first_paragraph);
      const expectedFirstParagraph = `Welcome to the Acelab, Inc. (“Acelab", “we”, or “us”) website, application and proprietary software platform that connects architects, construction companies and real estate developers with building and construction material suppliers and distributors (collectively, the “Service”). The Service enables visitors and registered users, whether suppliers or buyers (“Users,” “you” or “your”) to access and connect with other suppliers, buyers or other users.`;
      assert.strictEqual(firstParagraphText, expectedFirstParagraph, 'First paragraph text does not match');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'firstParagraphText');
      throw error;
    }
  }, 50000);

  it('Terms Of Use page has expected first and second paragraph', async () => {

    try {
      const secondParagraphText = await accessibilityPage.getParagraphText(termsOfUsePage.second_paragraph);
      const expectedSecondParagraph = `Every time you visit or use the Service, you agree to be bound by these Terms of Use (“Terms”). If you are an entity, these Terms shall be expressly binding on all employees, directors and officers, agents, and assigns who access or use the Service. These Terms outline your rights, obligations and restrictions regarding your use of the Service, please read them carefully. If you do not agree to be bound by the Terms and all applicable laws, you should discontinue use of the Service immediately. In addition to these Terms, we have adopted the Acelab Privacy Policy (“Privacy Policy”). Please read our Privacy Policy carefully for information relating to our collection, use, protection, and disclosure of your personal information.`;
      assert.strictEqual(secondParagraphText, expectedSecondParagraph, 'Second paragraph text does not match');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'secondParagraphText');
      throw error;
    }

  }, 50000);

  it('Terms Of Use page has expected links', async () => {

    try {
      const [acelabEmailLinkHandle] = await page.$x(termsOfUsePage.acelabEmailLink);
      assert.strictEqual(acelabEmailLinkHandle !== null, true, 'Could not find the support email link on the Terms of Use page');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'acelabEmailLinkHandle');
      throw error;
    }

  }, 50000);

  it('Terms Of Use page has expected links', async () => {

    try {
      const [aiaEmailLinkHandle] = await page.$x(termsOfUsePage.aiaEmailLink);
      assert.strictEqual(aiaEmailLinkHandle !== null, true, 'Could not find the AIA email link on the Terms of Use page');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'aiaEmailLinkHandle');
      throw error;
    }

  }, 50000);

  it('Terms Of Use page has expected links', async () => {

    try {

      const privacyPolicyLinks = await page.$x(termsOfUsePage.privacyPolicyLinks);
      assert.strictEqual(privacyPolicyLinks.length, 3, `Did not find the expected number of Privacy Policy links. Found: ${privacyPolicyLinks.length}`);
  
      if (privacyPolicyLinks[0]) {
        await privacyPolicyLinks[0].click();
      } else {
        console.error("First Privacy Policy link not found");
      }
    } catch (error) {
      await captureAndAttachScreenshot(page, 'privacyPolicyLinks');
      throw error;
    }
  }, 50000);

  it('Terms Of Use page has expected links', async () => {

    try {
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      const currentUrl = await commonPage.getCurrentUrl();
      assert.strictEqual(currentUrl.includes('/privacy-policy'), true, 'The URL does not contain "/privacy-policy" after clicking the first privacy policy link');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'currentUrl');
      throw error;
    }

  }, 50000);

  it('Terms Of Use page has expected links', async () => {

    try {
      await commonPage.navigateTo(Paths.TermsOfUse);

      const privacyPolicyLinks = await page.$x(termsOfUsePage.privacyPolicyLinks);

      if (privacyPolicyLinks[1]) {
        await privacyPolicyLinks[1].click();
      } else {
        console.error("Second Privacy Policy link not found");
      }

      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      const newUrl = await page.url();
      assert.strictEqual(newUrl.includes('/privacy-policy'), true, 'The URL does not contain "/privacy-policy" after clicking the second privacy policy link');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Second Privacy Policy link');
      throw error;
    }
  }, 50000);

});