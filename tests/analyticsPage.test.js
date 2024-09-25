import { teardown, setup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { Paths } from '../utils/path';
import AnalyticsPage from '../pages/AnalyticsPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { afterAll } from '@jest/globals';
const assert = require('assert');


jest.setTimeout(120000);

describe('Analytics Page Tests From Admin', () => {
  let page,
    timestampUTC,
    commonPage,
    analyticspage


  beforeAll(async () => {

    const setupResults = await setup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    analyticspage = new AnalyticsPage(page);
    await page.goto(activeBaseUrl);

  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  it('Analytics Page Tests on Heading tags', async () => {

    try {
      await commonPage.navigateTo(Paths.Admin + Paths.Analytics);
      await commonPage.waitForLoadComplete();

      const pageTitle = await page.title();
      assert.strictEqual(pageTitle, 'Acelab Admin');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Title_Acelab Admin');
      throw error;
    }

  }, 50000);

  it('Analytics Page Tests on Heading tags', async () => {

    try {
      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.User_type);

      const h2Text = await commonPage.getElementsTextByTagName('h2');
      expect(h2Text.includes('Users')).toBeTruthy();

    } catch (error) {
      await captureAndAttachScreenshot(page, 'Users');
      throw error;
    }

  }, 50000);

  it('Analytics Page Tests on Heading tags', async () => {

    try {
      const signUpsText = await commonPage.getElementText(analyticspage.Sign_Ups);
      assert.strictEqual(signUpsText, "Sign Ups");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Sign Ups');
      throw error;
    }

  }, 50000);

  it('Analytics Page Tests on Heading tags', async () => {

    try {
      const userRetention = await commonPage.getElementText(analyticspage.User_Retention);
      assert.strictEqual(userRetention, "User Retention");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'User Retention');
      throw error;
    }

  }, 50000);

  it('Analytics Page Tests on Heading tags', async () => {

    try {
      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.Product_Usage_type);

      await commonPage.waitForLoadComplete();

      const h2Text2 = await commonPage.getElementsTextByTagName('h2');
      expect(h2Text2.includes('Product Usage')).toBeTruthy();

    } catch (error) {
      await captureAndAttachScreenshot(page, 'Product Usage');
      throw error;
    }

  }, 50000);

  it('Analytics Page Tests on Heading tags', async () => {
    try {
      await commonPage.waitForLoadComplete();

      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.Page_view_type);

      await commonPage.waitForLoadComplete();

      const h2Text3 = await commonPage.getElementsTextByTagName('h2');
      expect(h2Text3.includes('Page Views')).toBeTruthy();

      await commonPage.waitForLoadComplete();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Page Views');
      throw error;
    }
  }, 50000);

  it('Test on types of Analytics', async () => {

    try {
      await commonPage.navigateTo(Paths.Admin + Paths.Analytics);
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(analyticspage.Type_of_Analytics);

      const usertype = await commonPage.isElementDisplayed(analyticspage.User_type);
      expect(usertype).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'usertype');
      throw error;
    }
  }, 50000);

  it('Test on types of Analytics', async () => {
    try {
      const productusagertype = await commonPage.isElementDisplayed(analyticspage.User_type);
      expect(productusagertype).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'productusagertype');
      throw error;
    }

  }, 50000);

  it('Test on types of Analytics', async () => {
    try {
      const pageviewtype = await commonPage.isElementDisplayed(analyticspage.User_type);
      expect(pageviewtype).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'pageviewtype');
      throw error;
    }

  }, 50000);

  it('Sign Ups Section test on Analytics Page', async () => {
    try {
      await commonPage.navigateTo(Paths.Admin + Paths.Analytics);
      await commonPage.waitForLoadComplete();

      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.User_type);

      await commonPage.waitForLoadComplete();

      const totalRegisteredUsers = await commonPage.getElementText(analyticspage.Total_Registered_Users);
      assert.strictEqual(totalRegisteredUsers, "Total Registered Users");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Total Registered Users');
      throw error;
    }

  }, 50000);

  it('Sign Ups Section test on Analytics Page', async () => {

    try {
      const dailySignUps = await commonPage.getElementText(analyticspage.Daily_Sign_Ups);
      assert.strictEqual(dailySignUps, "Daily Sign Ups");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Daily Sign Ups');
      throw error;
    }
  }, 50000);

  it('Sign Ups Section test on Analytics Page', async () => {

    try {
      const countDays = await commonPage.getElementText(analyticspage.Count_Days);
      assert.strictEqual(countDays, "Last 90 days");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Last 90 days');
      throw error;
    }

  }, 50000);

  it('Sign Ups Section test on Analytics Page', async () => {

    try {
      const DailySignUpsCanvas = await commonPage.isElementDisplayed(analyticspage.DailySignUpscanvas);
      expect(DailySignUpsCanvas).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'DailySignUpsCanvas');
      throw error;
    }

  }, 50000);

  it('User Retention Section test on Analytics Page', async () => {

    try {
      await commonPage.navigateTo(Paths.Admin + Paths.Analytics);
      await commonPage.waitForLoadComplete();

      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.User_type);

      await commonPage.waitForLoadComplete();

      const retentionMonthly = await commonPage.getElementText(analyticspage.Retention_Monthly);
      assert.strictEqual(retentionMonthly, "Retention by Monthly Cohorts of Signed-Up Users");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'retentionMonthly');
      throw error;
    }
  }, 50000);

  it('User Retention Section test on Analytics Page', async () => {
    try {
      const retentionPercentage = await commonPage.getElementText(analyticspage.Retention_percentage);
      assert.strictEqual(retentionPercentage, "Retention percentage");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Retention percentage');
      throw error;
    }
  }, 50000);

  it('User Retention Section test on Analytics Page', async () => {

    try {
      const percentage = await commonPage.isElementDisplayed(analyticspage.percentage);
      expect(percentage).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'percentage');
      throw error;
    }
  }, 50000);

  it('User Section test on Analytics Page', async () => {

    try {
      await commonPage.navigateTo(Paths.Admin + Paths.Analytics);
      await commonPage.waitForLoadComplete();

      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.User_type);

      await commonPage.waitForLoadComplete();

      const weeklyActiveUsers = await commonPage.getElementText(analyticspage.Weekly_Active_Users);
      assert.strictEqual(weeklyActiveUsers, "Weekly Active Users");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Weekly Active Users');
      throw error;
    }
  }, 50000);

  it('User Section test on Analytics Page', async () => {
    try {
      const countdaysinusers = await commonPage.getElementText(analyticspage.Count_Days_in_users);
      assert.strictEqual(countdaysinusers, "Last 90 Days (by week)");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Last 90 Days (by week)');
      throw error;
    }
  }, 50000);

  it('User Section test on Analytics Page', async () => {
    try {
      const showLabelinusers = await commonPage.getElementText(analyticspage.ShowLabel_in_users);
      assert.strictEqual(showLabelinusers, "Show Labels");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Show Labels');
      throw error;
    }
  }, 50000);

  it('Product Usage Section test on Analytics Page', async () => {

    try {
      await commonPage.navigateTo(Paths.Admin + Paths.Analytics);
      await commonPage.waitForLoadComplete();

      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.Product_Usage_type);

      await commonPage.waitForLoadComplete();

      const Searches = await commonPage.getElementText(analyticspage.Searches);
      assert.strictEqual(Searches, "Searches");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Searches');
      throw error;
    }
  }, 50000);

  it('Product Usage Section test on Analytics Page', async () => {
    try {
      const countdaysinsearch = await commonPage.getElementText(analyticspage.Count_Days_in_search);
      assert.strictEqual(countdaysinsearch, "Last 90 Days (by week)");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Last 90 Days (by week)');
      throw error;
    }
  }, 50000);

  it('Product Usage Section test on Analytics Page', async () => {
    try {
      const showLabelinusers = await commonPage.getElementText(analyticspage.ShowLabel_in_users);
      assert.strictEqual(showLabelinusers, "Show Labels");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Show Labels');
      throw error;
    }
  }, 50000);

  it('Product Usage Section test on Analytics Page', async () => {
    try {
      const projects = await commonPage.getElementText(analyticspage.Projects);
      assert.strictEqual(projects, "Projects");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Projects');
      throw error;
    }
  }, 50000);

  it('Product Usage Section test on Analytics Page', async () => {
    try {
      const products = await commonPage.getElementText(analyticspage.Products);
      assert.strictEqual(products, "Products");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Products');
      throw error;
    }
  }, 50000);

  it('Product Usage Section test on Analytics Page', async () => {
    try {
      const requests = await commonPage.getElementText(analyticspage.Requests);
      assert.strictEqual(requests, "Requests");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Requests');
      throw error;
    }
  }, 50000);

  it('Product Usage Section test on Analytics Page', async () => {
    try {
      const conversations = await commonPage.getElementText(analyticspage.Conversations);
      assert.strictEqual(conversations, "Conversations");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Conversations');
      throw error;
    }

  }, 50000);

  it('Page Views Section test on Analytics Page', async () => {

    try {
      await commonPage.navigateTo(Paths.Admin + Paths.Analytics);
      await commonPage.waitForLoadComplete();

      await commonPage.performClick(analyticspage.Type_of_Analytics);
      await commonPage.performClick(analyticspage.Page_view_type);

      await commonPage.waitForLoadComplete();

      const totalpageviews = await commonPage.getElementText(analyticspage.Total_Page_Views);
      assert.strictEqual(totalpageviews, "Total Page Views");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Total Page Views');
      throw error;
    }

  }, 50000);

  it('Page Views Section test on Analytics Page', async () => {

    try {
      const countdaysinpageview = await commonPage.getElementText(analyticspage.Count_Days_in_page_view);
      assert.strictEqual(countdaysinpageview, "Last 90 Days (by week)");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Last 90 Days (by week)');
      throw error;
    }
  }, 50000);

  it('Page Views Section test on Analytics Page', async () => {
    try {
      const showLabelinpageview = await commonPage.getElementText(analyticspage.ShowLabel_in_page_view);
      assert.strictEqual(showLabelinpageview, "Show Labels");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Show Labels');
      throw error;
    }
  }, 50000);

});