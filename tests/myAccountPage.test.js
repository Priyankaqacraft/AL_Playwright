import { teardown,regressionsetup  } from './setup';

import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import LandingPage from '../pages/landingPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import { Paths } from '../utils/path';
import MyaccountPage from '../pages/myAccountPage';



describe('Conversation Dashboard Page Tests', () => {
    let page,
      timestampUTC,
      commonPage,
      loginPage,
      landingPage,
      homePage,
      myaccountpage
  
    beforeAll(async () => {
     
      const setupResults = await regressionsetup();
     page = setupResults.page;
      timestampUTC = setupResults.timestampUTC;
      commonPage= new CommonPage(page);
      //projectPage= new ProjectPage(page);
      homePage=new HomePage(page);
      myaccountpage = new MyaccountPage(page);
      page.goto(activeBaseUrl+"MyAccount")
    }, 60000);
  

    afterAll(async () => {
        await teardown();
      });

     /* it('should verify that The Personal Info Edit link opens expected page in same tab', async () => {
            
        try {
            await page.waitForTimeout(8000);
            expect(await commonPage.isElementExists(myaccountpage.myAccountPageHeading)).toBe(true);
            await page.waitForTimeout(2000);
            await commonPage.performClick(myaccountpage.personal_info_edit_link);
            await page.waitForTimeout(2000);
            const title = await page.title();
            console.log("Edit Page title is:"+title)
            await commonPage.areEqual("acelab | edit personal info",title, "Could not find the expected page.");
            await page.waitForTimeout(8000);

           
           } 
            catch (error) 
            {
            
             throw error;
            }
      }, 50000);*/

      it('should verify that The Settings Edit link opens expected page in same tab', async () => {
            
        try {
            await page.waitForTimeout(8000);
            expect(await commonPage.isElementExists(myaccountpage.myAccountPageHeading)).toBe(true);
            await page.waitForTimeout(2000);
            await commonPage.performClick(myaccountpage.setting_edit_link);
            await page.waitForTimeout(2000);            
            const pageSource = await page.content();
            expect(pageSource).toContain("Edit Settings", "Could not find the expected page.");
             var urls= await commonPage.getCurrentUrl();
             console.log("Value of url is:"+ urls)
             expect(urls.count).toBe(2, "The link did not open in the same tab as expected.");
            await page.waitForTimeout(2000);

           
           } 
            catch (error) 
            {
            
             throw error;
            }
      }, 50000);


    });