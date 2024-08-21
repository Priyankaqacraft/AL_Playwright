import { teardown,noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import LandingPage from '../pages/landingPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';

describe('Home Page Tests', () => {
  let page,
    timestampUTC,
    commonPage,
    loginPage,
    landingPage,
    homePage;

  beforeAll(async () => {

    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    landingPage=new LandingPage(page);
    loginPage=new LoginPage(page);
    homePage=new HomePage(page);
    page.goto(activeBaseUrl);


  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  it('should verify that Sign In button is available on Home Page', async () => {
    try {
        expect(await homePage.isElementExists(homePage.signinButton)).toBe(true);
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
    } catch (error) {
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
        throw error;
    }
  }, 50000);

  it('should verify that Join For Free button is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.joinforfreeButton)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'JoinForFreeButton_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that Join For Free button count on Home Page', async () => {
      try {
          expect(await homePage.getLength(homePage.joinforfreeButtonCount)).toBe(2);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'JoinForFreeButtonCount_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that For Manufacturers button is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.forManufacturersButton)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'ForManufacturersButton_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that Schedule an Intro Call link is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.scheduleAnIntroCall)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'ScheduleAnIntroCall_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that Discover How It Works text is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.discoverHowItWorks)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'DiscoverHowItWorks_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that Schedule a Demo button is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.scheduleADemoButton)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'ScheduleADemoButton_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that How Acelab Works header is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.howAcelabWorksHeader)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'HowAcelabWorksHeader_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that Start a Search button is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.startASearchbutton)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'StartASearchButton_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that Chat with an Expert button is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.chatWithAnExpertButton)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'ChatWithAnExpertButton_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that Resources & Education header is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.ResourceAndEducationHeader)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'ResourceAndEducationHeader_HomePage');
          throw error;
      }
  }, 50000);

  it('should verify that FAQ header is available on Home Page', async () => {
      try {
          expect(await homePage.isElementExists(homePage.faqHeader)).toBe(true);
      } catch (error) {
          await captureAndAttachScreenshot(page, 'FAQHeader_HomePage');
          throw error;
      }
  }, 50000);
  

});
