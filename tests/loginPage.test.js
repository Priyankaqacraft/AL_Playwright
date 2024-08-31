import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import LoginPage from '../pages/loginPage';
import { afterAll } from '@jest/globals';

jest.setTimeout(120000);

describe('Login Page Tests', () => {
  let browser, page, timestampUTC, loginpage, commonPage, context;

  beforeAll(async () => {
    const setupResults = await noLoginsetup();
    browser = setupResults.browser;
    page = setupResults.page;
    context = browser.defaultBrowserContext();
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    loginpage = new LoginPage(page);
    await page.goto(activeBaseUrl + Paths.ContactUs);
  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  it('The "Terms of Use" link opens terms of use page in the next tab', async () => {

    try {
      const newPagePromise = new Promise(resolve => browser.once('targetcreated', async target => {
        const newPage = await target.page();
        resolve(newPage);
      }));

      await page.keyboard.down('Control');
      await commonPage.performClick(loginpage.termsOfUse);
      await page.keyboard.up('Control');

      const newPage = await newPagePromise;
      await newPage.bringToFront();
      await newPage.waitForSelector('body');

      await commonPage.switchTo('terms-of-use');

      const urls = await commonPage.getAllOpenTabUrls(context);
      expect(urls.some(url => url.includes('terms-of-use'))).toBe(true);

      await page.waitForTimeout(2000);
      await commonPage.closeCurrentTab();
    } catch (error) {
      console.error('Error during get urls:', error);
      throw error;
    }
  }, 50000);

});