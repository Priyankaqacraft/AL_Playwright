import { teardown,setup, mfgsetup  } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import LandingPage from '../pages/landingPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import { Paths } from '../utils/path';
import ConversationDashboardPage from '../pages/conversationDashboardPage';


describe('Conversation Dashboard Page Tests', () => {
    let page,
      timestampUTC,
      commonPage,
      loginPage,
      landingPage,
      homePage,
      conversationDashboardPage
  
    beforeAll(async () => {
     
      const setupResults = await mfgsetup();
      page = setupResults.page;
      timestampUTC = setupResults.timestampUTC;
      commonPage = new CommonPage(page);
     // projectPage=new ProjectPage(page);
      homePage=new HomePage(page);
      conversationDashboardPage = new ConversationDashboardPage(page);
     // page.goto(activeBaseUrl+"/dashboard");
  
  
    }, 60000);
    afterAll(async () => {
        await teardown();
      });

      it('should verify that Opportunities Dashboard is available on Conversation Dashboard', async () => {
        try {
          
            expect(await conversationDashboardPage.isElementExists(conversationDashboardPage.heading)).toBe(true);
            expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.overview)).toBe(true);
            expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.newinq)).toBe(true);
            expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.processinginq)).toBe(true);
            expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.awaiting)).toBe(true);
            expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.completedinq)).toBe(true);
            expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.onholdinq)).toBe(true);
            expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.table)).toBe(true);
            
              console.log('Table element is here');
             await commonPage.performClick(conversationDashboardPage.expandbutton);
           
             const tableNotPresent = conversationDashboardPage.isElementExists(conversationDashboardPage.table) === null;
             //const isNotPresent = (await (conversationDashboardPage.table).count()) === 0;
            
             console.log("Table element is not present");
             await page.waitForTimeout(2000);
             await commonPage.performClick(conversationDashboardPage.expandbutton);
              await page.waitForTimeout(2000);
             expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.table)).toBe(true);
            await commonPage.elementVi
             console.log('Table element is here');
             await commonPage.performClick(conversationDashboardPage.changestatusbutton);
             await page.waitForTimeout(2000);
             await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
             expect (await conversationDashboardPage.isElementExists(conversationDashboardPage.listofstatus)).toBe(true);
             await commonPage.getValuesByKey();
           
           } 
            catch (error) 
            {
             await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
             throw error;
            }
      }, 50000);


    });