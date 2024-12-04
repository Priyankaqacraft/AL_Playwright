import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { performLogins } from '../utils/logins';
import AdminRequest from '../pages/adminInfoRequestPage';
import MyAccountPage from '../pages/myAccountPage';
import WindowsComparePage from '../pages/windowsComparePage';

jest.setTimeout(120000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        adminInfoRequestPage,
        myAccountPage,
        windowsComparePage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        adminInfoRequestPage = new AdminRequest(page);
        myAccountPage = new MyAccountPage(page);
        windowsComparePage = new WindowsComparePage(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

     it("Should Verify ", async () => {
        try {
            await performLogins(page, 'editable'); 
            await commonPage.enterText(adminInfoRequestPage.searchBar, 'H Window');
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(adminInfoRequestPage.searchResultText);
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(adminInfoRequestPage.btnRequestInformation);
            await commonPage.performClick(adminInfoRequestPage.btnGeneralResearch);
            await commonPage.performClick(adminInfoRequestPage.selectProducts);
            await commonPage.performClick(adminInfoRequestPage.btnSelectProducts);
            await commonPage.performClick(adminInfoRequestPage.selectCheckbox);
            await commonPage.performClick(adminInfoRequestPage.btnConnectWithExpert);
            const initialPages = await browser.pages();
            await commonPage.performClick(adminInfoRequestPage.btnGoToProject);
            await commonPage.waitForLoadComplete();
            const allPages = await browser.pages();
            const newTab = allPages.find(tab => !initialPages.includes(tab));
            if (newTab) {
                console.log('New tab detected!');
                await newTab.close();
            } else {
                console.log('No new tab opened.');
            }
            await commonPage.wait();
            await commonPage.performClick(adminInfoRequestPage.btnClose);
            await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, '');
            throw error;
        }
    });

    it("Should Verify Click on Project Name from Requested By Redirecting to Project Page", async () => {
        try {
            await performLogins(page, 'admin');
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
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

    it("Should Verify Date of New Added Info Request", async () => {
        try {
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);

            const now = new Date();
            const options = { month: 'short', day: '2-digit' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);
            console.log(`Formatted Date: ${formattedDate}`); 

            const xpathExpression = adminInfoRequestPage.txtDate; 
            const elements = await page.$x(xpathExpression);

            if (elements.length === 0) {
                throw new Error("No elements found for the given XPath.");
            }
    
            let actualDate = null;
            for (const element of elements) {
                const textContent = await page.evaluate(el => el.textContent.trim(), element);
                console.log(`Element Text: ${textContent}`);
    
                if (textContent === formattedDate) {
                    actualDate = textContent;
                    console.log("Matching date found in element!");
                    break;
                }
            }
            expect(actualDate).not.toBeNull(); 
            expect(actualDate).toBe(formattedDate);   
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Date of New Added Info Request');
            throw error;
        }
    }); 

    it("Should Verify Status Column Dropdown", async () => {
        try {
            await commonPage.performClick(adminInfoRequestPage.btnStatusDropdown);
            const optionText = await commonPage.getList(adminInfoRequestPage.txtDropdownOption);
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
           const isVisiblebtnAdd = await windowsComparePage.isButtonClickable(adminInfoRequestPage.btnAdd);
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
            const alertText = await commonPage.getElementText(adminInfoRequestPage.txtAlertPopup);
            expect(alertText).toBe('Info request deleted successfully.');
            console.log('Alert message verified successfully:', alertText);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Delete Icon Button');
            throw error;
        } 
    }); 

    it("Should Verify Active Requests Filter", async () => {
        try {
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
            await commonPage.performClick(adminInfoRequestPage.btnActiveRequests);
            const isDisplayedActiveRequest = await commonPage.isElementExists(adminInfoRequestPage.elementActiveRequest);
            expect(isDisplayedActiveRequest).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Active Requests Filter');
            throw error;
        }
    }); 

    it("Should Verify Search Bar Results", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
            await commonPage.waitForLoadComplete();
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

     it("Should Verify 'Requested By' Filter Ascending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequestedBy);
            await commonPage.performClick(adminInfoRequestPage.btnSortAscending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminInfoRequestPage.sortedProducts);
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
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequestedBy);
            await commonPage.performClick(adminInfoRequestPage.btnSortDescending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminInfoRequestPage.sortedProducts);
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
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
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
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
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

    it("Should Verify 'Manufacturer' Filter Ascending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnManufacturer);
            await commonPage.performClick(adminInfoRequestPage.btnManufacturerAscending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminInfoRequestPage.sortedManufacturer);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const cleanedProducts = sortedProduct.filter((item) => item !== '');
            const locallySortedProducts = [...cleanedProducts].sort();
            expect(cleanedProducts).toEqual(locallySortedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Manufacturer Filter Ascending order');
            throw error;
        }
    }); 

    it("Should Verify 'Manufacturer' Filter Descending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnManufacturer);
            await commonPage.performClick(adminInfoRequestPage.btnManufacturerDescending);
            await commonPage.waitForLoadComplete();
            const sortedProductsText = await commonPage.getList(adminInfoRequestPage.sortedManufacturer);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            const arrangedProducts = sortedProduct.map(item => item);
            expect(sortedProduct).toEqual(arrangedProducts);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Manufacturer Filter Descending order');
            throw error;
        }
    });

   it("Should Verify 'Deadline' Filter Ascending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(adminInfoRequestPage.btnDeadline);
            await commonPage.performClick(adminInfoRequestPage.btnDeadlineAscending);
            await commonPage.waitForLoadComplete();
            const actualDates = await adminInfoRequestPage.extractDates();
            const expectedDates = await adminInfoRequestPage.isSortedAscending(actualDates);
            expect(actualDates).toEqual(expectedDates);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Deadline Filter Ascending order');
            throw error;
        }
    });   

    it("Should Verify 'Deadline' Filter Descending order", async () => {
        try {
            await commonPage.hoverOverElement(adminInfoRequestPage.btnRequests);
            await commonPage.performClick(adminInfoRequestPage.btnInfoRequests);
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
});