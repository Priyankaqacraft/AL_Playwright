import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl, acelabRegressionCredentials } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
//const EXTENSIONS = ['Courses','Articles','ConstructionDetailsFinder','ConstructionDetail','ContactUs','Courses','FindManufacturer','ForgotPassword','PrivacyPolicy','TermsOfUse'];
import { Paths } from '../utils/path'
//const i=0;
import HeaderPage from '../pages/headerPage';
import { performLogins } from '../utils/logins';
import loginPage from '../pages/loginPage';
import windowSearchResultPage from '../pages/windowSearchResultPage';
const assert = require('assert')
jest.setTimeout(50000)



describe('Author: ', () => {
  let page,
    timestampUTC,
    commonPage,
    headerPage,
    loginpage,
    window,
    context,
    browser


  beforeAll(async () => {

    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    loginpage = new loginPage(page);
    headerPage = new HeaderPage(page);
    window = new windowSearchResultPage(page);
    browser = setupResults.browser;
    context = browser.defaultBrowserContext();
    page.goto(activeBaseUrl);
    await page.goto(activeBaseUrl, { waitUntil: 'networkidle0', timeout: 120000 });

  }, 30000);

  afterAll(async () => {
    await teardown();
  });
  const EXTENSIONS = [
    Paths.Courses,
    Paths.ConstructionDetailsFinder,
    Paths.Articles,
    Paths.ContactUs,
    Paths.ForManufacturer,
    Paths.PrivacyPolicy,
    Paths.TermsOfUse,
  ];
  const EXTENSIONSFORAUTHENTICATEDPAGE = [
    Paths.ChangePassword,
    Paths.ConstructionDetailsFinder,
    Paths.MyAccount,


  ];


  EXTENSIONS.forEach(extension => {
    it(`It should verify That The Acelab logo opens expected page`, async () => {

      try {

        await commonPage.navigateTo(extension, { waitUntil: 'networkidle0' });
        await page.waitForTimeout(5000);
        if (headerPage.close_modal.isVisible) {
          await commonPage.performClick(headerPage.close_modal);
        }
        expect(await headerPage.isElementExists(headerPage.acelab_logo)).toBe(true);
        await commonPage.performClick(headerPage.acelab_logo);
        expect(await headerPage.isElementExists(headerPage.Researchparaghraph)).toBe(true);
      }
      catch (error) {
        await captureAndAttachScreenshot(page, 'test_description');
        throw error;
      }

    });
  });

  EXTENSIONS.forEach(extension => {
    it(`It should verify That The 'Join' button opens the join us modal`, async () => {
      jest.setTimeout(5000);
      try {

        await commonPage.navigateTo(extension, { waitUntil: 'networkidle0' });
        await page.waitForTimeout(5000);
        if (headerPage.close_modal.isVisible) {
          await commonPage.performClick(headerPage.close_modal);
        }
        await commonPage.performClick(headerPage.join_us_button);
        //expect(await commonPage.isElementExists(headerPage.signupwith_google_button)).toBe(true);
        const modalText = await commonPage.getElementText(headerPage.signup_heading);
        console.log('modaltext value is:' + modalText);
        expect(modalText).toContain("Let's Get Started");

      }
      catch (error) {
        await captureAndAttachScreenshot(page, 'test_description');
        throw error;
      }

    });
  }, 5000);


  EXTENSIONS.forEach(extension => {
    it('It should verify That "Sign In" button opens the expected modal', async () => {

      try {

        await commonPage.navigateTo(extension, { waitUntil: 'networkidle0' });
        await commonPage.performClick(loginpage.signinButton);
        await commonPage.isVisibleInViewport(loginpage.emailInput);
        await commonPage.isElementDisplayed(loginpage.signinHeading, { visible: true });
        const modalText = await commonPage.getElementText(loginpage.signinHeading);
        expect(modalText).toContain("Welcome Back");


      } catch (error) {
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
        throw error;
      }
    });
  });



  EXTENSIONSFORAUTHENTICATEDPAGE.forEach(extension_authenticatedpage => {

    it(`It should verify The search field is functional from authenticated pages`, async () => {
      jest.setTimeout(10000);

      try {

        await performLogins(page, "regression");
        await commonPage.wait(5);
        await commonPage.navigateTo(extension_authenticatedpage, { waitUntil: 'networkidle0' });
        await commonPage.clearAndSendKeys(headerPage.searchbar, "Cladding");
        await commonPage.performClick(headerPage.search_suggest_input);
        await commonPage.isElementDisplayed(window.product_image);
        const modaltext = await commonPage.getElementsTextByTagName(window.productdisplaypage_title);
        expect(modaltext).toContain("Select a masonry pattern");
        await headerPage.signOut();

      }
      catch (error) {
        await captureAndAttachScreenshot(page, 'test_description');
        throw error;
      }

    });
  }, 10000);

  

  it(`It should verify Test verification related Search Page`, async () => {

    try {

      await performLogins(page, "regression")
      await commonPage.wait(5);
      await commonPage.performClick(headerPage.start_search_button);
      const url = await commonPage.getCurrentUrl();
      const expected_url = activeBaseUrl + (Paths.ProductNewSearch);
      console.log("received url is:" + url);
      console.log("Expected url is:" + expected_url);
      assert.strictEqual(expected_url, url);
      //await commonPage.wait(3);
      await commonPage.clearAndSendKeys(headerPage.searchbar, "tttt");
      await commonPage.wait(10);
      const message = await commonPage.getElementText(headerPage.searchnot_found);
      console.log("value is:" + message);
      expect(await commonPage.getElementText(headerPage.searchnot_found)).toBe("No results found. Try searching for keywords related to articles, details or courses.");
      await commonPage.clearAndSendKeys(headerPage.searchbar, "cladding");
      await commonPage.isElementDisplayed(headerPage.search_suggest_input)
      await headerPage.signOut();
    }
    catch (error) {
      await captureAndAttachScreenshot(page, 'test_description');
      throw error;
    }
  })

  it(`It should verify Logged-in version of header has working 'Manage Account' link`, async () => {

    try {
     
      await performLogins(page, "regression");
      await commonPage.wait(5);
      await commonPage.performClick(headerPage.profile_dropdown);
      await commonPage.performClick(headerPage.manage_account);
      await commonPage.isVisibleInViewport(headerPage.manage_account_title);
      await headerPage.signOut();

    }
    catch (error) {
      await captureAndAttachScreenshot(page, 'test_description');
      throw error;
    }

  });

  it('It should verify Manufacturers link takes us to Manufacturer Finder Page', async () => {

    try {

      await performLogins(page, "regression");
      await commonPage.wait(5);
      await commonPage.performClick(headerPage.manufactureLink);
      await page.waitForTimeout(5000);
      const currentUrl = await commonPage.getCurrentUrl();
      const expected_url = activeBaseUrl + Paths.Manufacturer;
      console.log("URL of Manuafacturer link is :" + currentUrl);
      console.log("Expected url is:" + expected_url);
      assert.strictEqual(expected_url, currentUrl);
      await headerPage.signOut();

    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });

  it('It should verify Resources link takes us to Resources Page', async () => {

    try {
      await performLogins(page, "regression");

      await commonPage.wait(5);
      await commonPage.performClick(headerPage.resources);
      await page.waitForTimeout(5000);
      const currentUrl = await commonPage.getCurrentUrl();
      const expected_url = activeBaseUrl + Paths.Resources;
      console.log("URL of Manuafacturer link is :" + currentUrl);
      console.log("Expected url is:" + expected_url);
      assert.strictEqual(expected_url, currentUrl);
      await headerPage.signOut();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });
  it('It should verify about us link takes us to Aboutus Page', async () => {

    try {
      await commonPage.performClick(headerPage.Aboutus);
      await page.waitForTimeout(5000);
      const currentUrl = await commonPage.getCurrentUrl();
      const expected_url = activeBaseUrl + (Paths.About);
      console.log("URL of Aboutus page link is :" + currentUrl);
      console.log("Expected url is:" + expected_url);
      assert.strictEqual(expected_url, currentUrl);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      throw error;
    }
  });

})