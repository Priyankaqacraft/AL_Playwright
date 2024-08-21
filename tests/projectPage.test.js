import { setup, teardown,noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import ProjectPage from '../pages/projectPage';
import HomePage from '../pages/homePage';
import { Paths } from '../utils/path';
import { activeBaseUrl } from '../utils/config';

describe('Project Page Tests', () => {
   let page,
    timestampUTC,
    commonPage,
    projectPage,
    landingPage,
    homePage,
    projectName,
    currentUrl,
    expectedUrl;

    beforeAll(async () => {

      const setupResults = await setup('regression');
      page = setupResults.page;
      timestampUTC = setupResults.timestampUTC;
      commonPage = new CommonPage(page);
      projectPage=new ProjectPage(page);
      homePage=new HomePage(page);
      page.goto(activeBaseUrl+"my-projects")
    }, 60000);

    afterAll(async () => {
      await teardown();
    });

    it('should create New Project properly', async () => {
      try {
          projectName=projectPage.generateRandomString("Project_");
          await projectPage.createNewProject(projectName);
          expect(await projectPage.isElementExists(projectPage.project_notification)).toBe(true);
          await projectPage.wait(3)
          await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      } catch (error) {
          await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
          throw error;
      }
    }, 60000);

    it('should delete New Project properly', async () => {
      try { 
          await projectPage.deleteProject();
          expect(await projectPage.isElementExists(projectPage.project_notification)).toBe(true);
          await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
      } catch (error) {
          await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
          throw error;
      }
    }, 60000);

});