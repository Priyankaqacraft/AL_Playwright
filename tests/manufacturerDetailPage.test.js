import { teardown, noLoginsetup } from './setup.js';
import CommonPage from '../pages/commonPage.js';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper.js';
import HeaderPage from '../pages/headerPage.js';
import { performLogins } from '../utils/logins.js';
import { activeBaseUrl } from '../utils/config';
import loginPage from '../pages/loginPage.js';
import manufacturerFinder from '../pages/manufacturerFinderPage.js';
import manufacturerDetail from '../pages/manufacturerDetailPage.js';
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
    detail


  beforeAll(async () => {

    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    loginpage = new loginPage(page);
    headerPage = new HeaderPage(page);
    finder = new manufacturerFinder(page);
    detail = new manufacturerDetail(page);
    browser = setupResults.browser;
    context = browser.defaultBrowserContext();
    await page.goto(activeBaseUrl);
  });

  afterAll(async () => {
    await teardown();
  });

  it('It should verify that Manufacturer Detail Page overview tags are as per expectation', async () => {

    try {
      await performLogins(page, "regression");
      await commonPage.navigateTo(Paths.Manufacturer + Paths.ManufactureBrandPage);
      const prodname = await commonPage.getElementText(detail.productname);
      expect("Doors, Windows").toEqual(prodname);
      const direction = await commonPage.getElementText(detail.direction);
      expect("West").toEqual(direction);
      const country = await commonPage.getElementText(detail.country);
      expect("USA").toEqual(country);
      const type = await commonPage.getElementText(detail.location);
      expect("Residential").toEqual(type);
      await commonPage.isElementExists(finder.requestInfoButton);

    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });




  it('It should verify that when user click on "Product" and "Inspiration" tab it focusing to its respective section of brand page', async () => {

    try {
      const expected_productname = [
        "Patio Door",
        "Casement - Vinyl",
        "Double Hung - Vinyl",
        "Picture - Vinyl",
        "Single Hung - Vinyl",
        "Sliding - Vinyl",
      ];
      await commonPage.performClick(detail.producttab);
      const productName = await finder.getFiltersText(detail.listofproduct);
      expect(productName).toEqual(expected_productname);
      await commonPage.performClick(detail.inspirationtab);
      await commonPage.isElementExists(detail.inspirationimage);


    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }


  });
  it('It should verify that when user click on any product from brand page it will redirecting to respective brand page.', async () => {

    try {
      await commonPage.performClick(detail.producttab);
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(detail.firstproduct);
      await commonPage.waitForLoadComplete();
      const openedurl = await commonPage.getCurrentUrl();
      const expectedurl = (activeBaseUrl + Paths.ManufacturePDP);
      assert.strictEqual(openedurl, expectedurl);

    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
  it('It should verify that Manufacturer Detail Page -> "All Manufacturers" link takes us to Manufacturer finder page', async () => {

    try {
      await page.goBack();
      await commonPage.performClick(detail.manufacturerbreadcrumb);
      const openurl = await commonPage.getCurrentUrl();
      const expecturl = (activeBaseUrl + Paths.ManufacturerList);
      assert.strictEqual(openurl, expecturl);

    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
  it('It should verify that Manufacturer Detail Page -> "Home" link takes us to Manufacturer finder page', async () => {

    try {
      await commonPage.navigateTo(Paths.Manufacturer + Paths.ManufactureBrandPage);
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(detail.homebreadcrumb);
      await commonPage.waitForLoadComplete();
      const openurl = await commonPage.getCurrentUrl();
      const expecturl = (activeBaseUrl + Paths.Home);
      assert.strictEqual(openurl, expecturl);

    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
});
