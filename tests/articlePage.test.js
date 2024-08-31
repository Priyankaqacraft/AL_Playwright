import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import Article from '../pages/articlePage';
import { afterAll } from '@jest/globals';

jest.setTimeout(120000);

describe('Login Page Tests', () => {
  let browser, page, timestampUTC, articlePage, commonPage, context;

  beforeAll(async () => {
    const setupResults = await noLoginsetup();
    browser = setupResults.browser;
    page = setupResults.page;
    context = browser.defaultBrowserContext();
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    articlePage = new Article(page);
    await page.goto(activeBaseUrl);
  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  it('The "Terms of Use" link opens terms of use page in the next tab', async () => {

    await commonPage.navigateTo('articles/technology/technology-is-renovating-the-construction-industry-2')

    const isVisible = await commonPage.isVisibleInViewport(articlePage.about_the_author_section);
    expect(isVisible).toBeFalsy();


    await commonPage.navigateTo(activeBaseUrl);
    await commonPage.setLocalStorageToNotShowJoinPushModal();

  }, 50000);

});