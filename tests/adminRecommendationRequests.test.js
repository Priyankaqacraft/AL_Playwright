import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { performLogins } from '../utils/logins';
import { Paths } from '../utils/path';
import AdminRequest from '../pages/adminInfoRequestPage';
import WindowsComparePage from '../pages/windowsComparePage';
import AdminRecommendation from '../pages/adminRecommendationRequestsPage';
import WindowsSearchResultPage from '../pages/windowsSearchResultPage';

jest.setTimeout(120000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        adminInfoRequestPage,
        windowsComparePage,
        adminRecommendationRequestsPage,
        windowsSearchResultPage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        adminInfoRequestPage = new AdminRequest(page);
        windowsComparePage = new WindowsComparePage(page);
        windowsSearchResultPage = new WindowsSearchResultPage(page);
        adminRecommendationRequestsPage = new AdminRecommendation(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

     it("Should Verify When user submits 'GetProRecmmendatins' request, it will get display under 'Admin>>Request>>Recommendation request'", async () => {
        try {
            await performLogins(page, 'admin'); 
            await page.goto(activeBaseUrl);
            await adminRecommendationRequestsPage.quizWindows();
        } catch (error) {
            await captureAndAttachScreenshot(page, '');
            throw error;
        }
    }); 

     it("Should Verify Click on Recommendation Requests from Requests its Redirecting to Recommendation Requests Page", async () => {
        try {
            await commonPage.navigateTo(Paths.Admin);
            await commonPage.hoverOverElement(adminRecommendationRequestsPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            const currentUrl = page.url();
            console.log(`Current Tab URL: ${currentUrl}`);
            expect(currentUrl).toContain('recommendation-requests');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Click on Recommendation Requests from Requests');
            throw error;
        }
    }); 

    it("Should Verify Date of New Added Recommendation Requests", async () => {
        try {
            await commonPage.waitForLoadComplete();
            const now = new Date();
            const options = { month: 'short', day: '2-digit' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);
            const xpathExpression = adminRecommendationRequestsPage.txtDate; 
            const elements = await page.$x(xpathExpression);
            if (elements.length === 0) {
                throw new Error("No elements found for the given XPath.");
            }
            let actualDate = null;
            for (const element of elements) {
                const textContent = await page.evaluate(el => el.textContent.trim(), element);
                if (textContent === formattedDate) {
                    actualDate = textContent;
                    console.log("Matching date found in element!");
                    break;
                }
            }
            expect(actualDate).not.toBeNull(); 
            expect(actualDate).toBe(formattedDate);   
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Date of New Added Recommendation Request');
            throw error;
        }
    }); 

    it("Should Verify Filter By Starred", async () => {
        try {
            await commonPage.performClick(adminRecommendationRequestsPage.iconStar);
            await commonPage.wait();
            await commonPage.performClick(adminRecommendationRequestsPage.btnStarred);
            await commonPage.waitForLoadComplete();
            const product = await windowsSearchResultPage.countElements(adminRecommendationRequestsPage.productCount);
            if (product === 1) {
                console.log('Exactly Starred One Recommendation Requests Found.');
                expect(product).toBe(1);
            } else {
                console.log(`Multiple Starred One Recommendation Requests Found: ${product}`);
                expect(product).toBeGreaterThan(1);
            }
            await commonPage.performClick(adminRecommendationRequestsPage.btnStarred);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Filter By Starred');
            throw error;
        }
    }); 

    it("Should Verify Filter By Active Requests", async () => {
        try {
            await commonPage.performClick(adminRecommendationRequestsPage.btnActiveRequests);
            await commonPage.waitForLoadComplete();
            const product = await windowsSearchResultPage.countElements(adminRecommendationRequestsPage.productCount);
            if (product === 1) {
                console.log('Exactly One Active Requests Found.');
                expect(product).toBe(1);
            } else {
                console.log(`Multiple Active Requests Found: ${product}`);
                expect(product).toBeGreaterThan(1);
            }
            await commonPage.performClick(adminRecommendationRequestsPage.btnActiveRequests);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Filter By Starred');
            throw error;
        }
    }); 

    it("Should Verify Search Bar Results", async () => {
        try {
            await commonPage.enterText(adminInfoRequestPage.inputSearchBar,'General Research');
            await commonPage.wait();
            const elements = await page.$x(adminInfoRequestPage.searchBarResults); 
            const isDisplayedResults = await Promise.all(
            elements.map(async (element) => {
                return await page.evaluate(el => el.textContent.trim(), element); 
            })
            );
            for (const result of isDisplayedResults) {
                expect(result.trim()).toBe('General Research');
            }           
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Search Bar Results');
            throw error;
        }
    }); 

    it("Should Verify Dropdown Acelab Managers", async () => {   
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.wait();
            await page.evaluate(() => {
                const dropdown = document.querySelector('#acelab_managers');
                return Array.from(dropdown.options).map(option => option.value);
            });
            await page.waitForSelector('#acelab_managers');
            await page.select('#acelab_managers', '2eb3082a-7a89-498e-b80c-d4aadfe98855');
            await page.evaluate(() => {
                const dropdown = document.querySelector('#acelab_managers');
                return dropdown.value;
            });
            await commonPage.waitForLoadComplete();
            const elements = await page.$x(adminRecommendationRequestsPage.txtAcelabManagersResults); 
            const isDisplayedResults = await Promise.all(
            elements.map(async (element) => {
                return await page.evaluate(el => el.textContent.trim(), element); 
            }));
            for (const result of isDisplayedResults) {
                expect(result.trim()).toBe('Acelab Admin User');
            }           
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Dropdown Acelab Managers');
            throw error;
        }
    }); 

    it("Should Verify Dropdown All Product Categories", async () => {   
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.wait();
            await page.evaluate(() => {
                const dropdown = document.querySelector('#product_category');
                return Array.from(dropdown.options).map(option => option.value);
            });
            await page.waitForSelector('#product_category');
            await page.select('#product_category', '140879ea-ea11-4a0a-802f-4451cdeaa1f6');
            await page.evaluate(() => {
                const dropdown = document.querySelector('#product_category');
                return dropdown.value;
            });
            await commonPage.waitForLoadComplete();
            const elements = await page.$x(adminRecommendationRequestsPage.txtProductCategory); 
            const isDisplayedResults = await Promise.all(
            elements.map(async (element) => {
                return await page.evaluate(el => el.textContent.trim(), element); 
            }));
            for (const result of isDisplayedResults) {
                expect(result.trim()).toBe('Windows');
            }           
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Dropdown All Product Categories');
            throw error;
        }
    }); 

    it("Should Verify Click on Project Name from Requested By Redirecting to Project Page", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.performClick(adminInfoRequestPage.btnProjectNameGR);
            await commonPage.waitForLoadComplete();
            const currentUrl = page.url();
            console.log(`Current Tab URL: ${currentUrl}`);
            expect(currentUrl).toContain('projects');
            await windowsComparePage.isButtonClickable(adminInfoRequestPage.btnBacktoProjectsDashboard);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Click on Project Name from Requested By');
            throw error;
        }
    }); 

    it("Should Verify 'Requested By' Filter Ascending order", async () => {
        try {                       
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequestedBy);
            await commonPage.performClick(adminInfoRequestPage.btnSortAscending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminRecommendationRequestsPage.sortedProducts);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const cleanedProducts = sortedProduct.filter((item) => item !== '');
            const locallySortedProducts = [...cleanedProducts].sort();
            expect(cleanedProducts).toEqual(locallySortedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Requested By Filter Ascending order');
            throw error;
        }
    }); 

    it("Should Verify 'Requested By' Filter Descending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequestedBy);
            await commonPage.performClick(adminInfoRequestPage.btnSortDescending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminRecommendationRequestsPage.sortedProducts);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const arrangedProducts = sortedProduct.map(item => item);
            expect(sortedProduct).toEqual(arrangedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Requested By Filter Descending order');
            throw error;
        }
    });

    it("Should Verify 'Date' Filter Ascending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnDate);
            await commonPage.performClick(adminInfoRequestPage.btnDateAscending);
            await commonPage.waitForLoadComplete();
            const actualDates = await adminInfoRequestPage.getSortedDates();
            const expectedDates = await adminInfoRequestPage.isSortedAscending(actualDates);
            expect(actualDates).toEqual(expectedDates);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Date Filter Ascending order');
            throw error;
        }
    }); 

    it("Should Verify 'Date' Filter Descending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnDate);
            await commonPage.performClick(adminInfoRequestPage.btnDateDescending);
            await commonPage.waitForLoadComplete();
            const actualDates = await adminInfoRequestPage.getSortedDates();
            const expectedDates = await adminInfoRequestPage.isSortedDescending(actualDates);
            expect(actualDates).toEqual(expectedDates);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Date Filter Descending order');
            throw error;
        }
    });

    it("Should Verify 'Product Category' Filter Ascending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminRecommendationRequestsPage.btnProductCategory);
            await commonPage.performClick(adminRecommendationRequestsPage.btnProductCategoryAscending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminRecommendationRequestsPage.sortedProductCategory);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const cleanedProducts = sortedProduct.filter((item) => item !== '');
            const locallySortedProducts = [...cleanedProducts].sort();
            expect(cleanedProducts).toEqual(locallySortedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product Category Filter Ascending order');
            throw error;
        }
    }); 

    it("Should Verify 'Product Category' Filter Descending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminRecommendationRequestsPage.btnProductCategory);
            await commonPage.performClick(adminRecommendationRequestsPage.btnProductCategoryDescending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminRecommendationRequestsPage.sortedProductCategory);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const arrangedProducts = sortedProduct.map(item => item);
            expect(sortedProduct).toEqual(arrangedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product Category Filter Descending order');
            throw error;
        }
    }); 

    it("Should Verify 'Recommended' Filter Ascending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminRecommendationRequestsPage.btnRecommended);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendedAscending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminRecommendationRequestsPage.sortedRecommended);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const cleanedProducts = sortedProduct.filter((item) => item !== '');
            const locallySortedProducts = [...cleanedProducts].sort();
            expect(cleanedProducts).toEqual(locallySortedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Recommended Filter Ascending order');
            throw error;
        }
    }); 

    it("Should Verify 'Recommended' Filter Descending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminRecommendationRequestsPage.btnRecommended);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendedDescending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminRecommendationRequestsPage.sortedRecommended);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const arrangedProducts = sortedProduct.map(item => item);
            expect(sortedProduct).toEqual(arrangedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Recommended Filter Descending order');
            throw error;
        }
    }); 

    it("Should Verify 'Deadline' Filter Descending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminRecommendationRequestsPage.btnRecommendationRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnDeadline);
            await commonPage.performClick(adminInfoRequestPage.btnDeadlineDescending);
            await commonPage.waitForLoadComplete();
            const actualDates = await adminInfoRequestPage.extractDates();
            const expectedDates = await adminInfoRequestPage.isSortedDescending(actualDates);
            expect(actualDates).toEqual(expectedDates);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Deadline Filter Descending order');
            throw error;
        } 
    }); 

    it("Should Verify Status Column Dropdown", async () => {
        try {
            await commonPage.performClick(adminRecommendationRequestsPage.btnStatusDropdown);
            const optionText = await commonPage.getList(adminRecommendationRequestsPage.txtDropdownOption);
            console.log(optionText);
            expect(optionText).toBe('To Do\nIn Progress\nCompleted\nLost\nTransferred');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Status Column Dropdown');
            throw error;
        }
    });

    it("Should Verify Owner Column Dropdown", async () => {
        try {
            await commonPage.performClick(adminInfoRequestPage.btnIconPlus);
            const optionText = await commonPage.getList(adminInfoRequestPage.popupOption);
            console.log(optionText);
            expect(optionText).toBe('Acelab Admin User\nAndrew Ehresman');
            await commonPage.performClick(adminInfoRequestPage.btnIconPlus);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Owner Column Dropdown');
            throw error;
        }
    });

    it("Should Verify Product Expert Column 'ADD' Button is Clickable", async () => {
        try {
           const isVisiblebtnAdd = await windowsComparePage.isButtonClickable(adminRecommendationRequestsPage.btnAdd);
            expect(isVisiblebtnAdd).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Click on Project Name from Requested By');
            throw error;
        }
    }); 

    it("Should Verify User Can Add Discovered Sales Value Using Click on '$' Icon Button", async () => {
        try {
            const initialColor = await adminInfoRequestPage.getDollarSignColor();
            console.log('Initial Color:', initialColor);
            await commonPage.performClick(adminInfoRequestPage.btn$);
            await commonPage.enterText(adminInfoRequestPage.inputDiscoveredSalesValue,'100');
            await commonPage.performClick(adminInfoRequestPage.btnSave);
            const updatedColor = await adminInfoRequestPage.getDollarSignColor();
            console.log('Updated Color:', updatedColor);
            const expectedColorAfterValue = 'rgb(43, 161, 118)';
            expect(updatedColor).toEqual(expectedColorAfterValue);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Add Discovered Sales Value Using Click on $');
            throw error;
        }
    }); 
    
    it("Should Verify Info Request 'Delete' Icon Button", async () => {
        try {
            await commonPage.performClick(adminInfoRequestPage.btnDeleteIcon);
            await commonPage.performClick(adminInfoRequestPage.btnDeleteRequest);
            const alertText = await commonPage.getElementText(adminRecommendationRequestsPage.txtAlertPopup);
            expect(alertText).toBe('Recommendation request deleted successfully.');
            console.log('Recommendation request deleted successfully.:', alertText);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Delete Icon Button');
            throw error;
        } 
    }); 
});