import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import AboutUs from '../pages/aboutusPage';
import { afterAll } from '@jest/globals';
const assert = require('assert');


describe('AboutUs Page Tests', () => {
  let page,
    timestampUTC,
    commonPage,
    aboutusPage

  beforeAll(async () => {

    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    aboutusPage = new AboutUs(page);
    await page.goto(activeBaseUrl + Paths.About);

  }, 60000);


  afterAll(async () => {
    await teardown();
  });

  it('About Us Page SEO tags', async () => {

    try {
      const pageTitle = await page.title();
      expect(pageTitle).toBe('About Acelab');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Title_Aboutus');
      throw error;
    }

  }, 50000);


  it('About Us Page SEO tags', async () => {

    try {
      const metaDescription = await commonPage.getMetaContentName(aboutusPage.meta_description);
      expect(metaDescription).toBe("Acelab is the world's most detailed database of building products. Made by architects, for architects.");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_MetaDescription');
      throw error;
    }

  }, 50000);

  it('About Us Page SEO tags', async () => {

    try {
      const metaViewport = await commonPage.getMetaContentName(aboutusPage.meta_viewport);
      expect(metaViewport).toBe('width=device-width, initial-scale=1');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_MataViewport');
      throw error;
    }

  }, 50000);

  it('About Us Page SEO tags', async () => {

    try {
      const metaFormatDetection = await commonPage.getMetaContentName(aboutusPage.meta_format_detection);
      expect(metaFormatDetection).toBe('telephone=no');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_telephone');
      throw error;
    }

  }, 50000);

  it('About Us Page SEO tags', async () => {

    try {
      const metaCharset = await page.$eval('meta[charset]', (meta) => meta.getAttribute('charset'));
      assert.ok(metaCharset, 'Did not find the expected meta charset.');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_MetaCharset');
      throw error;
    }

  }, 50000);


  it('About Us Page SEO tags', async () => {

    try {
      const metaRobots = await commonPage.getMetaContentName(aboutusPage.meta_robots);
      expect(metaRobots).toBe('index, follow');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_MetaRobots');
      throw error;
    }

  }, 50000);


  it('About Us Page SEO tags', async () => {

    

    try {
      const metaPinterest = await commonPage.getMetaContentName(aboutusPage.meta_pinterest);
      expect(metaPinterest).toBe('nopin');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_MetaPinterest');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    await commonPage.wait();

    try {
      const first_paragraphs = await commonPage.getParagraphText(aboutusPage.first_paragraph);
      expect(first_paragraphs).toBe('Design and build teams face new and old built environment challenges everyday – related to issues such as climate change, decarbonization, social justice and code compliance. Meanwhile, the building products landscape is evolving constantly and rapidly – it can be difficult to stay up-to-date with the latest solutions that can help you solve critical project challenges. Acelab provides you the data-driven tools you need to achieve design intent and maximize project success.');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_first_paragraphs');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    await commonPage.wait();

    try {
      const firstParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_first_line);
      expect(firstParagraphText).toContain('The average architect is currently saddled with antiquated methods for finding viable product solutions');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_firstParagraphText');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    await commonPage.wait();

    try {
      const secondParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_second_line);
      expect(secondParagraphText).toContain('Manufacturer websites are often difficult to navigate, unorganized or outdated');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_secondParagraphText');
      throw error;
    }

  }, 50000);
  
  it('About Us page has expected content', async () => {

    await commonPage.wait();

    try {
      const thirdParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_third_line);
      expect(thirdParagraphText).toContain('Spec software is not reliable because it lacks a user-friendly interface');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_thirdParagraphText');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const fourthParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_fourth_line);
      expect(fourthParagraphText).toContain('We often compare product options across dozens of spreadsheets and sticky notes');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_fourthParagraphText');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const fifthParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_fifth_line);
      expect(fifthParagraphText).toContain('Dialing the manufacturer’s generic 1–800 number almost never gets you to the right product rep');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_fifthParagraphText');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const sixthParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_sixth_line);
      expect(sixthParagraphText).toContain('Keeping the in-house product library or SharePoint is often cumbersome');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_sixthParagraphText');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const seventhParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_seventh_line);
      expect(seventhParagraphText).toContain('As a result, we often end up copy-pasting specs from past projects to save ourselves the headache of wrapping our heads around a new product, or dealing with product manufacturers altogether. These Frankenstein specs often lead to errors, miscalculations or substitutions down the road.');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_seventhParagraphText');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {
      
     try {
      const eighthParagraphText = await commonPage.getParagraphText(aboutusPage.second_paragraph_eighth_line);
      expect(eighthParagraphText).toContain('Acelab is a cloud-based collaboration platform that offers a range of tools and resources to help architecture professionals research, compare, and select building products for their projects. With Acelab, users can access product data, technical specifications, and CAD details from leading manufacturers, as well as tools to create and manage project libraries, product lists, and specification documents. Acelab is designed to help architecture professionals save time and streamline their workflows by providing a centralized source of information and tools for building product research and specification tasks.');
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_eighthParagraphText');
      throw error;
    }
  
  }, 50000);


  it('About Us page has expected content', async () => {

    await aboutusPage.verifyImageSrc(page);

    try {
      const nameOne = await commonPage.getParagraphText(aboutusPage.name_one);
      expect(nameOne).toBe("Vardhan Mehta");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_nameOne');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const nameTwo = await commonPage.getParagraphText(aboutusPage.name_two);
      expect(nameTwo).toBe("Dries Carmeliet");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_nameTwo');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const nameThree = await commonPage.getParagraphText(aboutusPage.name_three);
      expect(nameThree).toBe("James Minor");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_nameThree');
      throw error;
    }

  }, 50000);


  it('About Us page has expected content', async () => {

    try {
      const nameThree = await commonPage.getParagraphText(aboutusPage.name_three);
      expect(nameThree).toBe("James Minor");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_nameThree');
      throw error;
    }

  }, 50000);

  
  it('About Us page has expected content', async () => {

    try {
      const nameFour = await commonPage.getParagraphText(aboutusPage.name_four);
      expect(nameFour).toBe("Bo Lotozo");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_nameFour');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const nameFive = await commonPage.getParagraphText(aboutusPage.name_five);
      expect(nameFive).toBe("Dave Lemont");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_nameFive');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const jobTitleOne = await commonPage.getParagraphText(aboutusPage.JobTitle_one);
      expect(jobTitleOne).toBe("Co-founder & CEO. Architect");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_jobTitleOne');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const jobTitleTwo = await commonPage.getParagraphText(aboutusPage.JobTitle_two);
      expect(jobTitleTwo).toBe("Co-founder & CPO. Architect");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_jobTitleTwo');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const jobTitleThree = await commonPage.getParagraphText(aboutusPage.JobTitle_three);
      expect(jobTitleThree).toBe("VP of Product Development");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_jobTitleThree');
      throw error;
    }

  }, 50000);

  it('About Us page has expected content', async () => {

    try {
      const jobTitleFour = await commonPage.getParagraphText(aboutusPage.JobTitle_four);
      expect(jobTitleFour).toBe("Architectural Product Specialist");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_jobTitleFour');
      throw error;
    }

  }, 50000);
  
  it('About Us page has expected content', async () => {

    try {
      const jobTitleFive = await commonPage.getParagraphText(aboutusPage.JobTitle_five);
      expect(jobTitleFive).toBe("Chairman. Former CEO of Revit");
    } catch (error) {
      await captureAndAttachScreenshot(page, 'Aboutus_jobTitleFive');
      throw error;
    }
  }, 50000);

});

