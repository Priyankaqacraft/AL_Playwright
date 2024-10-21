import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import { performLogins } from '../utils/logins';
import AccessibilityPage from '../pages/accessibilityPage';
import MyProjectPage from '../pages/myProjectsPage';
import MyAccountPage from '../pages/myAccountPage';
const assert = require('assert');

jest.setTimeout(50000);

describe('Author: ', () => {
  let page,
    timestampUTC,
    commonPage,
    context,
    accessibilityPage,
    myProjectsPage,
    myaccountPage,
    browser

  beforeAll(async () => {
    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    browser = setupResults.browser;
    context = browser.defaultBrowserContext();
    accessibilityPage = new AccessibilityPage(page);
    myProjectsPage = new MyProjectPage(page);
    myaccountPage = new MyAccountPage(page);
    await page.goto(activeBaseUrl);
  });

  afterAll(async () => {
    await teardown();
  });

  it("Should verify that My Projects Page SEO title", async () => {
    try {
      await performLogins(page, 'regression');
      await commonPage.navigateTo(Paths.MyProjects);
      const title = await page.title();
      assert.strictEqual(title, "My Projects");
      await myaccountPage.logOut();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'SEO title');
      throw error;
    }
  });

  it('Should verify that My Projects Page meta robots', async () => {
    try {
      const metaRobots = await commonPage.getMetaContentName(accessibilityPage.metaRobotsSelector);
      expect(metaRobots).toBe("index, follow");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'My_Projects_metaRobots');
      throw error;
    }
  });

  it('Should verify that My Projects Page meta viewport', async () => {
    try {
      const metaViewport = await commonPage.getMetaContentName(accessibilityPage.metaViewportSelector);
      expect(metaViewport).toBe("width=device-width, initial-scale=1");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'My_Projects_metaViewport');
      throw error;
    }
  });

  it('Should verify that My Projects Page charset', async () => {
    try {
      const metaCharset = await page.evaluate((selector) => {
        const metaCharsetTag = document.querySelector(selector);
        return metaCharsetTag ? metaCharsetTag.hasAttribute('charset') : false;
      }, accessibilityPage.metaCharsetSelector);
      expect(metaCharset).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'My_Projects_metaCharset');
      throw error;
    }
  });

  it("Should verify that My Project page create new project button takes us to 'new' page", async () => {
    try {
      await performLogins(page, 'regression');
      await commonPage.navigateTo(Paths.MyProjects);
      const list_of_titles = await commonPage.getList(myProjectsPage.project_titles);
      console.log('Project List:', list_of_titles);
      const projectExists = list_of_titles.includes("Project");
      if (!projectExists) {
        throw new Error("Could not confirm that Regression Project was displayed");
      }
      await commonPage.performClick(myProjectsPage.new_project_link);
      const url = page.url();
      assert.strictEqual(url, commonPage.getUrl(Paths.MyProjects) + '/new', "Could not find the expected page.");
      await myaccountPage.logOut();
    } catch (error) {
      await captureAndAttachScreenshot(page, 'MyProject_NewProjectPage');
      throw error;
    }
  })

  // found bug on admin login its redirect to the admin page with clicking on admin and on this its showing public site button
  it('Should verify that Back to My Project link takes us to MyProject page', async () => {
    try {
      await performLogins(page, 'admin');
      await page.goto(activeBaseUrl);
      await commonPage.hoverOverElement(myProjectsPage.workspace_button);
      await commonPage.performClick(myProjectsPage.project_link);
      await commonPage.performClick(myProjectsPage.new_project_link);
      const url = page.url();
      assert.strictEqual(url, commonPage.getUrl(Paths.MyProjects) + '/new', "Could not find the expected page.");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'BackToMyProject');
      throw error;
    }
  });

 /* it('Should verify that My Project General Research button takes us to general Research page', async () => {
    try {
      await commonPage.navigateTo(Paths.MyProjects);
      await commonPage.performClick(myProjectsPage.general_research_button);
      const isDisplayed = await commonPage.isElementExists(myProjectsPage.general_research_text);
      expect(isDisplayed).toBe(true);
    } catch (error) {
      await captureAndAttachScreenshot(page, 'General_Research_page');
      throw error;
    }
  });

  it('Should verify that General Research page Spec Planner manu button', async () => {
    try {
      await commonPage.performClick(myProjectsPage.btnSpecPlanner);
      // await commonPage.wait();
      const currentUrl = page.url();
      expect(currentUrl).toContain('spec-planner');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'General_Research_page_Spec_Planner_manu_button');
      throw error;
    }
  });   // Element is Removed on page 

  it('Should verify that General Research page schedule manu button', async () => {
    try {
      await commonPage.performClick(myProjectsPage.btnSchedules);
      // await commonPage.wait();
      const currentUrl = page.url();
      expect(currentUrl).toContain('project-schedule');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'General_Research_page_schedule_manu_button');
      throw error;
    }
  });

  it('Should verify that General Research page Comparisons manu button', async () => {
    try {
      await commonPage.performClick(myProjectsPage.btnComparisons);
      // await commonPage.wait();
      const currentUrl = page.url();
      expect(currentUrl).toContain('product-comparison');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'General_Research_page_comparisons_manu_button');
      throw error;
    }
  });

  it('Should verify that General Research page Research manu button', async () => {
    try {
      await commonPage.performClick(myProjectsPage.btnResearch);
      // await commonPage.wait();
      const currentUrl = page.url();
      expect(currentUrl).toContain('project-research');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'General_Research_page_research_manu_button');
      throw error;
    }
  });

  it('Should verify that General Research page Conversations manu button', async () => {
    try {
      await commonPage.performClick(myProjectsPage.btnConversations);
      // await commonPage.wait();
      const currentUrl = page.url();
      expect(currentUrl).toContain('conversations');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'General_Research_page_conversations_manu_button');
      throw error;
    }
  });

  it('Should verify that General Research page Project Info manu button', async () => {
    try {
      await commonPage.performClick(myProjectsPage.btnProjectInfo);
      // await commonPage.wait();
      const currentUrl = page.url();
      expect(currentUrl).toContain('project-info');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'General_Research_page_project_info_manu_button');
      throw error;
    }
  }); */
});