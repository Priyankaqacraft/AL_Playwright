import { teardown, noLoginsetup } from './setup.js';
import CommonPage from '../pages/commonPage.js';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper.js';
import HeaderPage from '../pages/headerPage.js';
import { performLogins,  } from '../utils/logins.js';
import loginPage from '../pages/loginPage.js';
import manufacturerFinder from '../pages/manufacturerFinderPage.js';

const assert = require('assert')
jest.setTimeout(80000);

describe('Author: ', () => {
    let page,
      timestampUTC,
      commonPage,
      headerPage,
      loginpage,
      window,
      context,
      browser,
     finder
  
  
    beforeAll(async () => {
  
      const setupResults = await noLoginsetup();
      page = setupResults.page;
      timestampUTC = setupResults.timestampUTC;
      commonPage = new CommonPage(page);
      loginpage = new loginPage(page);
      headerPage = new HeaderPage(page);
      finder=new manufacturerFinder(page);
      browser = setupResults.browser;
      context = browser.defaultBrowserContext();
    });
  
    afterAll(async () => {
      await teardown();
    });
    it('It should verify that Find Manufacturers page has expected top level filters', async () => {

      try {
        const expected_filters = [
          "00 Procurement and Contracting Requirements",
          "01 General Requirements",
          "02 Existing Conditions",
          "03 Concrete",
          "04 Masonry",
          "05 Metals",
          "06 Wood, Plastics, and Composites",
          "07 Thermal and Moisture Protection",
          "08 Openings",
          "09 Finishes",
          "10 Specialties",
          "11 Equipment",
          "12 Furnishings",
          "13 Special Construction",
          "14 Conveying Equipment",
          "21 Fire Suppression",
          "22 Plumbing",
          "23 Heating, Ventilating, and Air Conditioning (HVAC)",
          "25 Integrated Automation",
          "26 Electrical",
          "27 Communications",
          "28 Electronic Safety and Security",
          "31 Earthwork",
          "32 Exterior Improvements",
          "33 Utilities",
          "34 Transportation",
          "35 Waterway and Marine Construction",
          "40 Process Interconnections",
          "41 Material Processing and Handling Equipment",
          "42 Process Heating, Cooling, and Drying Equipment",
          "43 Process Gas and Liquid Handling, Purification, and Storage Equipment",
          "44 Pollution and Waste Control Equipment",
          "45 Industry-Specific Manufacturing Equipment",
          "46 Water and Wastewater Equipment",
          "48 Electrical Power Generation"
                  ];
          await performLogins(page, "regression");
          await commonPage.waitForLoadComplete();
          await commonPage.performClick(headerPage.manufactureLink);
          await commonPage.performClick(headerPage.manufactureLink);
          await page.setJavaScriptEnabled(false);
           await page.setJavaScriptEnabled(true);
          await commonPage.waitForLoadComplete();
          const filters=await finder.getFiltersText(finder.division_filters);
          expect(filters).toEqual(expected_filters);
  
      } catch (error) {
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
        throw error;
      }
    });

   it('It should verify that Find Manufacturers-> clicking a division takes us to division page with new filters', async () => {

      try {
          const expected_filters = [
            "03.01.00 Maintenance of Concrete",
            "03.03.00 Conservation Treatment for Period Concrete",
            "03.05.00 Common Work Results for Concrete",
            "03.06.00 Schedules for Concrete",
            "03.08.00 Commissioning of Concrete",
            "03.10.00 Concrete Forming and Accessories",
            "03.20.00 Concrete Reinforcing",
            "03.30.00 Cast-in-Place Concrete",
            "03.40.00 Precast Concrete",
            "03.50.00 Cast Decks and Underlayment",
            "03.60.00 Grouting",
            "03.70.00 Mass Concrete",
            "03.80.00 Concrete Cutting and Boring"
        ];
          await commonPage.performClick(finder.concrete);
          const filters=await finder.getFiltersText(finder.division_filters);
          expect(filters).toEqual(expected_filters);
          
  
      } catch (error) {
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
        throw error;
      }
    });
    it('It should verify that from Manufacturer page, breadcrumbs redirecting to apropriate pages.', async () => {

      try {
          
          await commonPage.performClick(finder.breadcrumbdivision);
          await commonPage.isElementExists(finder.division_filters)
  
      } catch (error) {
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
        throw error;
      }
    });
    it('It should verify that when clicking on "ABC Window system", it is redirecting to its brand page only', async () => {

      try {
          
          await commonPage.performClick(finder.abcWindowsystem);
          await commonPage.isElementExists(finder.abcbrandpagelogo);
  
      } catch (error) {
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
        throw error;
      }
    });
    it('It should verify that when clicking on "Request info" button from brand page, user can sed request to manufacturer', async () => {

      try {
          
          await commonPage.performClick(finder.requestInfoButton);
          await commonPage.performClick(finder.templeproject); 
          await commonPage.performClick(finder.selectProductfromList);
          await commonPage.performClick(finder.selectProductButton);
          await commonPage.performClick(finder.pricequote);
          await commonPage.performClick(finder.Technicalcheckbox);
          await commonPage.performClick(finder.connectButton);
          await commonPage.isElementExists(finder.gotoConversationButton);
  
      } catch (error) {
        await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
        throw error;
      }
    });
  
})