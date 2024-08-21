import { setup, teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import LandingPage from '../pages/landingPage';


describe('Landing Page Tests', () => {

    let page,
    timestampUTC,
    commonPage,
    landingPage,
    currentUrl,
    expectedUrl;

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);  
        landingPage=new LandingPage(page);
        page.goto(activeBaseUrl)
    }, 60000);
    
    afterAll(async () => {
        await teardown();
    });

    it('should navigate to the construction details finder page when the "Find Construction Details" link is clicked', async () => {
        try {
            await commonPage.wait(3);
            await commonPage.performClick(landingPage.construction_details_footerLink);
            currentUrl = await commonPage.getCurrentUrl();
            expectedUrl=await commonPage.getPageURL(Paths.ConstructionDetailsFinder);
            expect(currentUrl).toBe(expectedUrl);
            await captureAndAttachScreenshot(page, 'FindConstructionDetailsLink_LandingPage');
            await commonPage.performClick(landingPage.homeLink);
        } catch (error) {
            // Handle any errors that occur during the test
            await captureAndAttachScreenshot(page, 'FindConstructionDetailsLink_Error');
            throw error;
        }
    }, 50000);

    it('should navigate to the Building Science Courses page when the "Building Science Courses" link is clicked', async () => {
        try {
            await commonPage.wait(3);
            await commonPage.performClick(landingPage.building_science_courses_footelLink);
            currentUrl = await commonPage.getCurrentUrl();
            expectedUrl=await commonPage.getPageURL(Paths.Courses);
            expect(currentUrl).toBe(expectedUrl);
            await captureAndAttachScreenshot(page, 'BuildingScienceCources_LandingPage');
            await commonPage.performClick(landingPage.homeLink);
        } catch (error) {
            // Handle any errors that occur during the test
            await captureAndAttachScreenshot(page, 'BuildingScienceCources_LandingPage');
            throw error;
        }
    }, 50000);

    it('should navigate to the Articles page when the "Articles" link is clicked', async () => {
        try {
            await commonPage.wait(3);
            await commonPage.performClick(landingPage.articles_footerLink);
            currentUrl = await commonPage.getCurrentUrl();
            expectedUrl = await commonPage.getPageURL(Paths.Articles);
            expect(currentUrl).toBe(expectedUrl);
            await captureAndAttachScreenshot(page, 'Articles_LandingPage');
            await commonPage.performClick(landingPage.homeLink);
        } catch (error) {
            // Handle any errors that occur during the test
            await captureAndAttachScreenshot(page, 'Articles_LandingPage');
            throw error;
        }
    }, 50000);
    
    it('should navigate to the Manufacturer Finder page when the "Manufacturer Finder" link is clicked', async () => {
        try {
            await commonPage.wait(3);
            await commonPage.performClick(landingPage.manufacturerFinder_footerLink);
            currentUrl = await commonPage.getCurrentUrl();
            expectedUrl = await commonPage.getPageURL(Paths.Manufacturer);
            expect(currentUrl).toBe(expectedUrl);
            await captureAndAttachScreenshot(page, 'ManufacturerFinder_LandingPage');
            await commonPage.performClick(landingPage.homeLink);
        } catch (error) {
            // Handle any errors that occur during the test
            await captureAndAttachScreenshot(page, 'ManufacturerFinder_LandingPage');
            throw error;
        }
    }, 50000);
    
    it('should navigate to the About Us page when the "About Us" link is clicked', async () => {
        try {
            await commonPage.wait(6);
            await commonPage.performClick(landingPage.about_us_headerLink);
            currentUrl = await commonPage.getCurrentUrl();
            expectedUrl = await commonPage.getPageURL(Paths.About);
            expect(currentUrl).toBe(expectedUrl);
            await captureAndAttachScreenshot(page, 'AboutUs_LandingPage');
            await commonPage.performClick(landingPage.homeLink);
        } catch (error) {
            // Handle any errors that occur during the test
            await captureAndAttachScreenshot(page, 'AboutUs_LandingPage');
            throw error;
        }
    }, 50000);

});

