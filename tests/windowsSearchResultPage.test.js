import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { performLogins } from '../utils/logins';
import { Paths } from '../utils/path';
import WindowDetailPage from '../pages/windowDetailPage';
import Collaborator from '../pages/addCollaboratorCompanyPage';
import WindowsSearchResultPage from '../pages/windowsSearchResultPage';
const assert = require('assert');

jest.setTimeout(65000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        windowDetailPage,
        windowsSearchResultPage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        windowDetailPage = new WindowDetailPage(page);
        windowsSearchResultPage = new WindowsSearchResultPage(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

     it("Should verify 'Windows Type' filter", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.waitForLoadComplete();
            await windowsSearchResultPage.quiz(); 
            await commonPage.performClick(windowsSearchResultPage.filterWindowType);
            await commonPage.performClick(windowsSearchResultPage.filterOption);
            await commonPage.wait();
            const expectedProductName = await commonPage.getElementText(windowsSearchResultPage.txtFilterDoubleHung);
            const productElements = await page.$x(windowsSearchResultPage.doubleHung);
            const productNames = await Promise.all(
                productElements.map(async el => await page.evaluate(el => el.textContent.trim(), el))
            );
            if (productNames.length > 0) {
                productNames.forEach((name, index) => {
                    assert.ok(name.includes(expectedProductName), `Product at index ${index} does not match the expected name`);
                });
                console.log(`All products have the expected name: ${expectedProductName}`);
            } else {
                throw new Error("No products found with the specified XPath");
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Windows Type Filter');
            throw error;
        }
    }); 

    it("Should verify 'Project' filter", async () => {
        try {
            await windowsSearchResultPage.quiz(); 
            await commonPage.wait();
            await commonPage.performClick(windowsSearchResultPage.filterProject);
            const isDisplayedProject = await commonPage.isElementExists(windowsSearchResultPage.project);
            expect(isDisplayedProject).toBe(true);
            await commonPage.performClick(windowsSearchResultPage.btnCross);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Project Filter');
            throw error;
        }
    }); 

     it("Should verify 'Frame Material' filter", async () => {
        try {
            await windowsSearchResultPage.quiz(); 
            await commonPage.wait();
            await commonPage.performClick(windowsSearchResultPage.filterFrameMaterial);
            const refresh = await page.$x(windowsSearchResultPage.btnRefresh);
            const btnRefreshCount = refresh.length;
            if (btnRefreshCount > 0) {
                await commonPage.performClick(windowsSearchResultPage.btnRefresh);
                await commonPage.performClick(windowsSearchResultPage.filterFrameMaterial);
            }
            await commonPage.performClick(windowsSearchResultPage.frame);
            await commonPage.performClick(windowsSearchResultPage.btnDone);
            await commonPage.waitForLoadComplete();
            const expectedFilterName = await commonPage.getElementText(windowsSearchResultPage.filterFrameText);
            const productText = await page.$x(windowsSearchResultPage.frameFilterProductText);
            const productFilterText = await Promise.all(
                productText.map(async el => await page.evaluate(el => el.textContent.trim(), el))
            );
            if (productFilterText.length > 0) {
                productFilterText.forEach((name, index) => {
                    assert.strictEqual(name, expectedFilterName, `Product at index ${index} does not match the expected name`);
                });
                console.log(`All products have the expected name: ${expectedFilterName}`);
            } else {
                throw new Error("No products found with the specified XPath");
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Frame Material Filter');
            throw error;
        }
    }); 

   it("Should verify 'Thermal Performance' filter", async () => {
        try {
            await windowsSearchResultPage.quiz(); 
            await commonPage.wait();
            await commonPage.performClick(windowsSearchResultPage.btnFilterThermalPerformance);
            const isDisplayedThermal = await commonPage.isElementExists(windowsSearchResultPage.optionThermalPerformance);
            expect(isDisplayedThermal).toBe(true);
            await commonPage.performClick(windowsSearchResultPage.btnDone)
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Thermal Performance Filter');
            throw error;
        }
    }); 

    it("Should verify 'Special Requirements' filter", async () => {
        try {
            await windowsSearchResultPage.quiz(); 
            await commonPage.wait();
            await commonPage.performClick(windowsSearchResultPage.filterSpecialRequirements);
            const refresh = await page.$x(windowsSearchResultPage.btnRefresh);
            const btnRefreshCount = refresh.length;
            if (btnRefreshCount > 0) {
                await commonPage.performClick(windowsSearchResultPage.btnRefresh);
                await commonPage.performClick(windowsSearchResultPage.filterSpecialRequirements);
            }
            await commonPage.performClick(windowsSearchResultPage.optionSpecialRequirements);
            await commonPage.performClick(windowsSearchResultPage.btnDone);
            await commonPage.waitForLoadComplete();
            const expectedFilterName = await commonPage.getElementText(windowsSearchResultPage.filterSpecialRequirementText);
            const productText = await page.$x(windowsSearchResultPage.spacialRequirementsProductText);
            const productFilterText = await Promise.all(
                productText.map(async el => await page.evaluate(el => el.textContent.trim(), el))
            );
            if (productFilterText.length > 0) {
                productFilterText.forEach((name, index) => {
                    assert.strictEqual(name, expectedFilterName, `Product at index ${index} does not match the expected name`);
                });
                console.log(`All products have the expected name: ${expectedFilterName}`);
            } else {
                throw new Error("No products found with the specified XPath");
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Special Requirements Filter');
            throw error;
        }
    });

    it("Should verify 'Profile Aesthetics' filter", async () => {
        try {
            await windowsSearchResultPage.quiz(); 
            await commonPage.wait();
            await commonPage.performClick(windowsSearchResultPage.filterProfileAesthetics);
            const isDisplayedAesthetic = await commonPage.isElementExists(windowsSearchResultPage.optionProfileAesthetics);
            expect(isDisplayedAesthetic).toBe(true);
            await commonPage.performClick(windowsSearchResultPage.btnDone);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Profile Aesthetics Filter');
            throw error;
        }
    }); 

    it("Should verify that when user click on togglebutton 'Manufacturer view' , it is displaying list of manufacturer brand with detail", async () => {
        try {
            await commonPage.performClick(windowsSearchResultPage.Manufactureview);
            await commonPage.isElementExists(windowsSearchResultPage.manufacturername)
            const numofmanufacturer = await windowsSearchResultPage.countElements(windowsSearchResultPage.manufacturername);
            console.log('Manufacturer count is :', numofmanufacturer);
            await commonPage.performClick(windowsSearchResultPage.Manufactureview);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Frame Material Result Product Count');
           throw error;
       }
    });

it("Should verify in window search result Page, 'Home' breadcrumb is redirecting user to home page", async () => {
        try {
            await commonPage.performClick(windowsSearchResultPage.homelink);
            await commonPage.waitForLoadComplete();
            const openurl = await commonPage.getCurrentUrl();
           const expecturl = (activeBaseUrl + Paths.Home);
           console.log("open is:"+openurl);
           console.log("open is:"+expecturl);
             assert.strictEqual(openurl, expecturl);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Home breadcrumb is redirecting user to home page');
           throw error;
       }
    }); 

    it("Should verify in window search result Page , 'ProductAdvisor' breadcrumb is redirecting user to home page", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.productButton);
            await commonPage.performClick(windowDetailPage.windoesButton);
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(windowsSearchResultPage.productadvisorlink);
            await commonPage.waitForLoadComplete();
            const openurl = await commonPage.getCurrentUrl();
           const expecturl = (activeBaseUrl + Paths.productadvisor);
           console.log("open is:"+openurl);
           console.log("received is:"+expecturl);
            assert.strictEqual(openurl, expecturl);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'ProductAdvisor breadcrumb is redirecting user to home page');
           throw error;
       }
    });
    it("Should verify that user can add product to compare from a detail page", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.productButton);
            await commonPage.performClick(windowDetailPage.windoesButton);
            const txtProduct = await commonPage.getElementText(windowDetailPage.firstProductDoubleHung);
            console.log("First Products Name",txtProduct);
            expect(txtProduct).toContain('Double Hung');
            await commonPage.hoverOverElement(windowDetailPage.btnSave);
            await commonPage.hoverOverElement(windowsSearchResultPage.firstproject);
            const buttonelementadd = await commonPage.getElementText(windowsSearchResultPage.productadd);
            expect(buttonelementadd).toContain('Add');
            await commonPage.performClick(windowDetailPage.addproduct);
            const buttonelementremove = await commonPage.getElementText(windowsSearchResultPage.productremove);
            expect(buttonelementremove).toContain('Remove');
            await commonPage.performClick(windowDetailPage.removeProduct);
            await commonPage.wait();
        }
        catch (error) {
            await captureAndAttachScreenshot(page, 'Add product to compare from a detail page');
            throw error;
        }
    }); 
});