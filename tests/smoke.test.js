import { setup, teardown,noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import LandingPage from '../pages/landingPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import { Paths } from '../utils/path';

describe('Smoke Tests', () => {
  let page,
    timestampUTC,
    commonPage,
    loginPage,
    landingPage,
    homePage,
    currentUrl,
    expectedUrl;

  beforeAll(async () => {

    const setupResults = await setup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    landingPage=new LandingPage(page);
    loginPage=new LoginPage(page);
    homePage=new HomePage(page);
  
  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  it('should verify that Able to signin Acelab', async () => {
    try {
        expect(await loginPage.isElementExists(loginPage.welcomeBackHomePage)).toBe(true);
        await captureAndAttachScreenshot(page, 'Signin Successful');
    } catch (error) {
        await captureAndAttachScreenshot(page, 'Signin Successful Error');
        throw error;
    }
  }, 50000);
  
  it('should verify that Products link is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.productLink)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'ProductsLink_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify that Manufacturers link is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.manufacturerLink)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'ManufacturersLink_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify that Resources link is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.resourcesLink)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'ResourcesLink_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify that My Conversations link is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.myconversationLink)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'MyConversationsLink_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify that Search Bar is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.searchbar)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'SearchBar_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify that Profile Icon is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.profileicon)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'ProfileIcon_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify that Project Button is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.projectButton)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'ProjectButton_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify that Open Previous Project link is present on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.openPreviousProjectLink)).toBe(true);
    } catch (error) {
        await captureAndAttachScreenshot(page, 'OpenPreviousProjectLink_HomePage_Error');
        throw error;
    }
}, 50000);

it('should verify my conversation icon navigates to My Conversation Page', async () => {
  try {
      await homePage.wait(2)
      await homePage.performClick(homePage.myconversationLink);
      currentUrl = await homePage.getCurrentUrl();
      expectedUrl=await homePage.getPageURL(Paths.MyConversations);
      expect(currentUrl).toBe(expectedUrl);
      await captureAndAttachScreenshot(page, 'MyConversationPage_navigation');
      await homePage.performClick(homePage.homeLogo);
  } catch (error) {
      await captureAndAttachScreenshot(page, 'MyConversationPage_navigation_error');
      throw error;
  }
}, 50000);

it('should verify Profile Icon is clickable and has Manage Account Link', async () => {
  try {
      await homePage.wait(2)
      await homePage.performClick(homePage.profileicon);
      await homePage.performClick(homePage.manageAccountLink);
      currentUrl = await homePage.getCurrentUrl();
      expectedUrl=await homePage.getPageURL(Paths.MyAccount);
      expect(currentUrl).toBe(expectedUrl);
      await captureAndAttachScreenshot(page, 'Myaccount_navigation');
      await homePage.performClick(homePage.homeLogo);

  } catch (error) {
      await captureAndAttachScreenshot(page, 'Myaccount_navigation_error');
      throw error;
  }
}, 50000);

it('should verify Projects navigates to my project page', async () => {
  try {
      await homePage.wait(2)
      await homePage.hoverOverElement(homePage.projectButton);
      await homePage.performClick(homePage.myProjectsLink);
      currentUrl = await homePage.getCurrentUrl();
      expectedUrl=await homePage.getPageURL(Paths.MyProjects);
      expect(currentUrl).toBe(expectedUrl);
      await captureAndAttachScreenshot(page, 'MyProjects_navigation');
      await homePage.performClick(homePage.homeLogo);

  } catch (error) {
      await captureAndAttachScreenshot(page, 'MyProjects_navigation_error');
      throw error;
  }
}, 50000);

});
