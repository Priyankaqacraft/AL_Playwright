import { teardown, noLoginsetup } from './setup.js';
import CommonPage from '../pages/commonPage.js';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper.js';
import HeaderPage from '../pages/headerPage.js';
import { performLogins } from '../utils/logins.js';
import { activeBaseUrl } from '../utils/config';
import loginPage from '../pages/loginPage.js';
import ManufacturerConversationPage from '../pages/manufacturerConversationDashboardPage.js';
import WindowsSearchResultPage from '../pages/windowsSearchResultPage';
import manufacturerFinder from '../pages/manufacturerFinderPage.js';

import { Paths } from '../utils/path.js';
import path from 'path';
import { expect } from '@jest/globals';

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
    manufacturer,
    windowsSearchResultPage,
    finder


  beforeAll(async () => {

    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    loginpage = new loginPage(page);
    headerPage = new HeaderPage(page);
    manufacturer = new ManufacturerConversationPage(page);
    windowsSearchResultPage = new WindowsSearchResultPage(page);
    browser = setupResults.browser;
    finder = new manufacturerFinder(page);
    context = browser.defaultBrowserContext();
    await page.goto(activeBaseUrl);
  });

  afterAll(async () => {
    await teardown();
  });
  it('It should verify that when Manufacturer do login , Dashboard button is available on header and he/she get landed on conversation dashboard only', async () => {

    try {
      await performLogins(page, "mfgRep");
      const openedurl = await commonPage.getCurrentUrl();
      const expectedurl = (activeBaseUrl + Paths.manufacturerDashboard);
      assert.strictEqual(openedurl, expectedurl);


    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });

  it('It should verify that In conversation Dashboard ,in summary section it is showing accurate count of conversations', async () => {

    try {
      const getinquirycount = await commonPage.getElementText(manufacturer.overviewnewinquiry);
      const receivedcount = await windowsSearchResultPage.countElements(manufacturer.newinquirynumber);
      assert.equal(getinquirycount, receivedcount);

      /*** */
      const propcessinquirycount = await commonPage.getElementText(manufacturer.overviewprocessing);
      const receivedprocesscount = await windowsSearchResultPage.countElements(manufacturer.processinginquirynumber);
      assert.equal(propcessinquirycount, receivedprocesscount);

      /*** */
      const awaitingreplycount = await commonPage.getElementText(manufacturer.overviewawaiting);
      const receivedawaitingcount = await windowsSearchResultPage.countElements(manufacturer.awaitingreply);
      assert.equal(awaitingreplycount, receivedawaitingcount);

      /*** */
      const completedcount = await commonPage.getElementText(manufacturer.overviewcompleted);
      const receivedcompletedcount = await windowsSearchResultPage.countElements(manufacturer.completed);
      assert.equal(completedcount, receivedcompletedcount);

      /*** */
      const onholdcount = await commonPage.getElementText(manufacturer.overviewhold);
      const receivedonholdcount = await windowsSearchResultPage.countElements(manufacturer.onhold);
      assert.equal(onholdcount, receivedonholdcount);

      console.log("Total NewInquiry Count on Dashboar :", getinquirycount);
      console.log("Total Processing Inquiry Count on Dashboar :", propcessinquirycount);
      console.log("Total Awaiting Reply Count on Dashboar :", awaitingreplycount);
      console.log("Total Completed Count on Dashboar :", completedcount);
      console.log("Total Onhold Count on Dashboar :", onholdcount);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
  it('It should verify that In conversation Dashboard ,while clicking on any one conversation it redirected to its messanger ,', async () => {

    try {
      await commonPage.waitForLoadComplete();
      const nameofarch=await commonPage.getElementText(manufacturer.convname);
      await commonPage.performClick(manufacturer.firstconv);
      await commonPage.isElementExists(manufacturer.conversation);
      const nameofarchconv=await commonPage.getElementText(manufacturer.convarchitecname);
      assert.strictEqual(nameofarch,nameofarchconv)
      await commonPage.performClick(manufacturer.backbutton);
      const openedurl = await commonPage.getCurrentUrl();
      const expectedurl = (activeBaseUrl + Paths.manufacturerDashboard);
      assert.strictEqual(openedurl, expectedurl);

    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
 it('It should verify that In conversation ,Manufacturer can add contact owner', async () => {

    try {
      await commonPage.performClick(manufacturer.addbutton);
      await commonPage.isElementExists(manufacturer.ownername)
      const ownercount = await windowsSearchResultPage.countElements(manufacturer.listofowner);
      if (ownercount > 0) {
        const manufacturername = await commonPage.getElementText(manufacturer.ownername);
        console.log("Contact owner name is :", manufacturername);
        console.log("Contact owner name is :", ownercount);
        await commonPage.performClick(manufacturer.ownername);
        await commonPage.performClick(manufacturer.removebutton);
        console.log("Contact owner button is removed")

      }
      else {
        console.log("Contact owner button is not clicked");
      }
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
  it('It should verify that In conversation Dashboard, when user click on button it is showing list of status and selected status is showing with checkmark', async () => {

    try {
      const expected_status = [
        "New Inquiry",
        "Processing Inquiry",
        "Awaiting Reply",
        "Completed",
        "On Hold",
      ];
      await commonPage.waitForLoadComplete();
      const text = await commonPage.getElementText(manufacturer.Newinquirystts)
      console.log("1st Status is ", text);
      await commonPage.performClick(manufacturer.sttsbutton);
      await commonPage.isElementExists(manufacturer.newinquirystts);
      await commonPage.isElementExists(manufacturer.checkbox);
      const statuslist = await finder.getFiltersText(manufacturer.statuslist);
      expect(expected_status).toEqual(statuslist);


    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });

  it('It should verify that In conversation Dashboard, user can change status from "New Inquiry" to "Processing Inquiry', async () => {

    try {
      await commonPage.refreshPage();
      const propcessinquirycount = await commonPage.getElementText(manufacturer.overviewprocessing);
      console.log("count of Processing Inquiry:", propcessinquirycount)
      await commonPage.performClick(manufacturer.sttsbutton);
      await commonPage.hoverOverElement(manufacturer.processingquirystatus);
      await commonPage.performClick(manufacturer.processingquirystatus);
      const propcessinquirycountaftermoving = await commonPage.getElementText(manufacturer.overviewprocessing);
      console.log("count of Processing Inquiry after moving one conversation from 'New Inquiry' to 'Processing Inquiry':", propcessinquirycountaftermoving);
      await commonPage.performClick(manufacturer.processinginquirybutton);
      await commonPage.waitForLoadComplete();
      await commonPage.performClick(manufacturer.clicknewinquiry);
      const propcessinginqback = await commonPage.getElementText(manufacturer.overviewprocessing);
      console.log("count of Processing Inquiry after moving one conversation from 'New Inquiry' to 'Processing Inquiry':", propcessinginqback);
      assert.equal(propcessinquirycount, propcessinginqback);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
  it('It should verify that In conversation Dashboard, "New Inquiry" section is expandable and compressible', async () => {

    try {
      await commonPage.refreshPage();
      await commonPage.performClick(manufacturer.expandbutton);
      const isTableVisible = await commonPage.isElementExists(manufacturer.tablesection);
      expect(isTableVisible).toBe(false);
      await commonPage.performClick(manufacturer.buttonpropertybefore);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
});