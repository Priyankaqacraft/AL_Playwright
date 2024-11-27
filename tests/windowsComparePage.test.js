import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { performLogins } from '../utils/logins';
import WindowDetailPage from '../pages/windowDetailPage';
import WindowsComparePage from '../pages/windowsComparePage';
import WindowsSearchResultPage from '../pages/windowsSearchResultPage';
const path = require('path');

jest.setTimeout(65000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        windowsComparePage,
        windowsSearchResultPage,
        comapreProductName1,
        comapreProductName2,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        windowsComparePage = new WindowsComparePage(page);
        windowsSearchResultPage = new WindowsSearchResultPage(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

    it("Should verify Compare Product Button", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.waitForLoadComplete();
            await windowsSearchResultPage.quiz();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Compare Button');
            throw error;
        }
    });

    it("Should verify Compare Product Url", async () => {
        try {
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(windowsComparePage.compare_footer);
            await commonPage.performClick(windowsComparePage.projectDropdown);
            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(100);
            await page.keyboard.press('Enter');
            comapreProductName1 = await commonPage.getElementText(windowsComparePage.txtProductText1);
            comapreProductName2 = await commonPage.getElementText(windowsComparePage.txtProductText2);
            await commonPage.performClick(windowsComparePage.btnCompare);
            await commonPage.waitForLoadComplete();
            const currentUrl = page.url();
            console.log(`Current Tab URL: ${currentUrl}`);
            expect(currentUrl).toContain('product-comparison');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Compare Product Url');
            throw error;
        }
    });

     it("Should Verify 'Windows Schedule' Search Bar is Visible", async () => {
        try {
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(windowsComparePage.btnWindowsSchedule);
            await commonPage.wait();
            const isVisibleSearchBar = await commonPage.isElementExists(windowsComparePage.inputSearchBar);
            expect(isVisibleSearchBar).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Windows Schedule Search Bar');
            throw error;
        }
    });

    it("Should Verify 'Windows Schedule' New Search Button is Visible", async () => {
        try {
            await windowsComparePage.isButtonClickable(windowsComparePage.btnNewSearch);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Windows Schedule New Search Button');
            throw error;
        }
    });

    it("Should Verify 'Add Products' Button", async () => {
        try {
            const isVisibleAddProduct = await commonPage.isElementExists(windowsComparePage.btnAddProducts);
            expect(isVisibleAddProduct).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Add Products Button');
            throw error;
        }
    });

    it("Should Verify 'Share' Button", async () => {
        try {
            const isVisibleShare = await commonPage.isElementExists(windowsComparePage.btnShare);
            expect(isVisibleShare).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Share Button');
            throw error;
        }
    });

    it("Should Verify Left '<' Arrow Button", async () => {
        try {
            const isVisibleLeftArrow = await commonPage.isElementExists(windowsComparePage.btnLeftArrow);
            expect(isVisibleLeftArrow).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Left "<" Arrow');
            throw error;
        }
    });

    it("Should Verify Right '>' Arrow Button Details Container", async () => {
        try {
            const isVisibleLeftArrow = await commonPage.isElementExists(windowsComparePage.btnRightArrow);
            expect(isVisibleLeftArrow).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Right ">" Arrow');
            throw error;
        }
    });

    it("Should Verify First Product Image Cross Button", async () => {
        try {
            const isVisibleCrossButton1 = await commonPage.isElementExists(windowsComparePage.btnCrossIcon1);
            expect(isVisibleCrossButton1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Image Cross Image');
            throw error;
        }
    });

    it("Should Verify Second Product Image Cross Button", async () => {
        try {
            const isVisibleCrossButton2 = await commonPage.isElementExists(windowsComparePage.btnCrossIcon2);
            expect(isVisibleCrossButton2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Image Cross Image');
            throw error;
        }
    });

    it("Should Verify First Product Images View Button", async () => {
        try {
            await commonPage.performClick(windowsComparePage.btnImageView1);
            const isVisibleImage = await commonPage.isElementExists(windowsComparePage.viewImage);
            expect(isVisibleImage).toBe(true);
            await commonPage.performClick(windowsComparePage.btnViewImageCrossIcon);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Images View');
            throw error;
        }
    });

    it("Should Verify Second Product Images View Button", async () => {
        try {
            await commonPage.performClick(windowsComparePage.btnImageView2);
            const isVisibleImage = await commonPage.isElementExists(windowsComparePage.viewImage);
            expect(isVisibleImage).toBe(true);
            await commonPage.performClick(windowsComparePage.btnViewImageCrossIcon);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Images View');
            throw error;
        }
    });

    it("Should Verify First Product Image", async () => {
        try {
            const isVisibleImg = await commonPage.isElementExists(windowsComparePage.imgProduct1);
            expect(isVisibleImg).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product Image First');
            throw error;
        }
    });

    it("Should Verify Second Product Image", async () => {
        try {
            const isVisibleImg = await commonPage.isElementExists(windowsComparePage.imgProduct2);
            expect(isVisibleImg).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product Image Second');
            throw error;
        }
    });

    it("Should Verify First Product Company Name", async () => {
        try {
            const txtProductCompany1 = await commonPage.isElementExists(windowsComparePage.productCompanyName1);
            expect(txtProductCompany1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Company Name');
            throw error;
        }
    });

    it("Should Verify Second Product Company Name", async () => {
        try {
            const txtProductCompany2 = await commonPage.isElementExists(windowsComparePage.productCompanyName2);
            expect(txtProductCompany2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Company Name');
            throw error;
        }
    });

    it("Should Verify First Product Name", async () => {
        try {
            const txtProductName1 = await commonPage.getElementText(windowsComparePage.productName1);
            expect(txtProductName1).toBe(comapreProductName2);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Name');
            throw error;
        }
    });

    it("Should Verify Second Product Name", async () => {
        try {
            const txtProductName2 = await commonPage.getElementText(windowsComparePage.productName2);
            expect(txtProductName2).toBe(comapreProductName1);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Name');
            throw error;
        }
    });

    it("Should Verify First Product Secondary Text", async () => {
        try {
            const txtProductName1 = await commonPage.isElementExists(windowsComparePage.productSecondaryText1);
            expect(txtProductName1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Name');
            throw error;
        }
    });

    it("Should Verify Second Product Secondary Text", async () => {
        try {
            const txtProductName2 = await commonPage.isElementExists(windowsComparePage.productSecondaryText2);
            expect(txtProductName2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Name');
            throw error;
        }
    });

    it("Should Verify 'Request Information' Button for First Product", async () => {
        try {
            await windowsComparePage.isButtonClickable(windowsComparePage.btnRequestInformation1);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Request Information');
            throw error;
        }
    });

    it("Should Verify 'Request Information' Button for Second Product", async () => {
        try {
            await windowsComparePage.isButtonClickable(windowsComparePage.btnRequestInformation2);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Request Information');
            throw error;
        }
    });

    it("Should verify 'Add Comment' button", async () => {
        try {
            await commonPage.performClick(windowsComparePage.btnAddComment);
            await commonPage.enterText(windowsComparePage.inputboxAddComments, 'Test');
            await commonPage.isElementExists(windowsComparePage.btnCancel);
            await commonPage.performClick(windowsComparePage.btnSave);
            const commentText = await commonPage.getElementText(windowsComparePage.textCommentIsVisible);
            expect(commentText).toBe('Test');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Add Comment Button');
            throw error;
        }
    });

    it("Should verify 'Add Comment' Edit Comment", async () => {
        try {
            await commonPage.performClick(windowsComparePage.btnThreeDot);
            await commonPage.performClick(windowsComparePage.btnEdit);
            await commonPage.wait();
            await commonPage.enterText(windowsComparePage.inputboxAddComments, 'Testing');
            await commonPage.performClick(windowsComparePage.btnUpdate);
            const commentText = await commonPage.getElementText(windowsComparePage.textCommentIsVisible);
            expect(commentText).toBe('Testing');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Edit Comment');
            throw error;
        }
    });

    it("Should verify 'Add Comment' Delete Comment", async () => {
        try {
            await commonPage.performClick(windowsComparePage.btnThreeDot);
            await commonPage.performClick(windowsComparePage.btnDelete);
            const commentTextDeleted = await commonPage.isElementExists(windowsComparePage.textCommentIsVisible);
            expect(commentTextDeleted).toBe(false);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Delete Comment');
            throw error;
        }
    });

    it("Should verify 'Add Documents' Upload Documents", async () => {
        try {
            const filePath = path.resolve(__dirname, 'test-data/dummy.pdf');
            await windowsComparePage.uploadFile(filePath);
            await commonPage.wait();
            const txtUploadedFile = await commonPage.getElementText(windowsComparePage.textUploadedFile);
            expect(txtUploadedFile).toBe('dummy.pdf');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Add Documents Upload Documents');
            throw error;
        }
    });

    it("Should Verify Uploaded Document in 3 dot 'Add' button is Visible and Delete the Uploaded Document", async () => {
        try {
            await commonPage.performClick(windowsComparePage.btnThreeDot);
            const btnAddIsVisible = await commonPage.isElementExists(windowsComparePage.btnAdd);
            expect(btnAddIsVisible).toBe(true);
            await commonPage.performClick(windowsComparePage.btnDelete);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Add Documents Upload Documents and Delete Document');
            throw error;
        }
    });

    it("Should Verify Deleted Document is not visible", async () => {
        try {
            const isVisible = await commonPage.isElementExists(windowsComparePage.textUploadedFile);
            expect(isVisible).toBe(false);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Deleted Document');
            throw error;
        }
    });

    it("Should Verify First 'Product Highlights' Details Container", async () => {
        try {
            const isVisibleProductHigh1 = await commonPage.isElementExists(windowsComparePage.detailsProductHighlights1);
            expect(isVisibleProductHigh1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Highlights');
            throw error;
        }
    });

    it("Should Verify Second 'Product Highlights' Details Container", async () => {
        try {
            const isVisibleProductHigh2 = await commonPage.isElementExists(windowsComparePage.detailsProductHighlights2);
            expect(isVisibleProductHigh2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Highlights');
            throw error;
        }
    });

    it("Should Verify Product 'Specs' Download Button", async () => {
        const downloadPath = path.resolve(__dirname, 'downloads');
        try {
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath
            });
            const windowDetailPage = new WindowDetailPage(page, downloadPath);
            await commonPage.performClick(windowsComparePage.btnSpecs);
            await commonPage.wait();
            const isDownloaded = await windowDetailPage.checkFileDownloaded('Kawneer Company Inc - 3-Part Specs');
            console.log(`File downloaded: ${isDownloaded}`);
            expect(isDownloaded).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product Specs Download Button');
            throw error;
        }
    });

    it("Should Verify Product 'CAD' Download Button", async () => {
        const downloadPath = path.resolve(__dirname, 'downloads');
        try {
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath
            });
            const windowDetailPage = new WindowDetailPage(page, downloadPath);
            await commonPage.performClick(windowsComparePage.btnCAD);
            await commonPage.wait();
            const isDownloaded = await windowDetailPage.checkFileDownloaded('Kawneer Company Inc - CAD Files');
            console.log(`File downloaded: ${isDownloaded}`);
            expect(isDownloaded).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product CAD Download Button');
            throw error;
        }
    });

    it("Should Verify Product 'BIM' Download Button", async () => {
        const downloadPath = path.resolve(__dirname, 'downloads');
        try {
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath
            });
            const windowDetailPage = new WindowDetailPage(page, downloadPath);
            await commonPage.performClick(windowsComparePage.btnBIM);
            await commonPage.wait();
            const isDownloaded = await windowDetailPage.checkFileDownloaded('Andersen Windows Inc - BIM Files');
            console.log(`File downloaded: ${isDownloaded}`);
            expect(isDownloaded).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product BIM Download Button');
            throw error;
        }
    });

    it("Should Verify First 'Product Description' Details Container", async () => {
        try {
            const isVisibleProductDesc1 = await commonPage.isElementExists(windowsComparePage.productDescription1);
            expect(isVisibleProductDesc1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Description');
            throw error;
        }
    });

    it("Should Verify Second 'Product Description' Details Container", async () => {
        try {
            const isVisibleProductDesc2 = await commonPage.isElementExists(windowsComparePage.productDescription2);
            expect(isVisibleProductDesc2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Description');
            throw error;
        }
    });

    it("Should Verify First 'Dimensions' Details Container", async () => {
        try {
            const isVisibleDimensions1 = await commonPage.isElementExists(windowsComparePage.detailsDimensions1);
            expect(isVisibleDimensions1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Dimensions');
            throw error;
        }
    });

    it("Should Verify Second 'Dimensions' Details Container", async () => {
        try {
            const isVisibleDimensions2 = await commonPage.isElementExists(windowsComparePage.detailsDimensions2);
            expect(isVisibleDimensions2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Dimensions');
            throw error;
        }
    });

    it("Should Verify First 'Finishes' Details Container", async () => {
        try {
            const isVisibleFinishes1 = await commonPage.isElementExists(windowsComparePage.finishes1);
            expect(isVisibleFinishes1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Finishes');
            throw error;
        }
    });

    it("Should Verify Second 'Finishes' Details Container", async () => {
        try {
            const isVisibleFinishes2 = await commonPage.isElementExists(windowsComparePage.finishes2);
            expect(isVisibleFinishes2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Finishes');
            throw error;
        }
    });

    it("Should Verify First 'Trim' Details Container", async () => {
        try {
            await windowsComparePage.isButtonClickable(windowsComparePage.btnRequestDataTrim);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Trim');
            throw error;
        }
    });

    it("Should Verify Second 'Trim' Details Container", async () => {
        try {
            const isVisibleTrimImg = await commonPage.isElementExists(windowsComparePage.trimImg);
            expect(isVisibleTrimImg).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Trim');
            throw error;
        }
    });

    it("Should Verify First 'Grid Type' Details Container", async () => {
        try {
            const isVisibleGridImg1 = await commonPage.isElementExists(windowsComparePage.gridTypeImg);
            expect(isVisibleGridImg1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Grid Type');
            throw error;
        }
    });

    it("Should Verify First 'Design Note' Details Container", async () => {
        try {
            const isVisibleDesignNote1 = await commonPage.isElementExists(windowsComparePage.txtDesignNote1);
            expect(isVisibleDesignNote1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Design Note');
            throw error;
        }
    });

    it("Should Verify Second 'Design Note' Details Container", async () => {
        try {
            const isVisibleDesignNote2 = await commonPage.isElementExists(windowsComparePage.txtDesignNote2);
            expect(isVisibleDesignNote2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Design Note');
            throw error;
        }
    });

    it("Should Verify First 'U Factor' Details Container", async () => {
        try {
            const isVisibleUFactor1 = await commonPage.isElementExists(windowsComparePage.txtU_Factor1);
            expect(isVisibleUFactor1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First U Factor');
            throw error;
        }
    });

    it("Should Verify Second 'U Factor' Details Container", async () => {
        try {
            const isVisibleUFactor2 = await commonPage.isElementExists(windowsComparePage.txtU_Factor2);
            expect(isVisibleUFactor2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second U Factor');
            throw error;
        }
    });

    it("Should Verify First 'Performance Grade' Details Container", async () => {
        try {
            const isVisiblePerformanceGrade1 = await commonPage.isElementExists(windowsComparePage.txtPerformanceGrade1);
            expect(isVisiblePerformanceGrade1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Performance Grade');
            throw error;
        }
    });

    it("Should Verify Second 'Performance Grade' Details Container", async () => {
        try {
            const isVisiblePerformanceGrade2 = await commonPage.isElementExists(windowsComparePage.txtPerformanceGrade2);
            expect(isVisiblePerformanceGrade2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Performance Grade');
            throw error;
        }
    });

    it("Should Verify First 'Glazing Table' Details Container", async () => {
        try {
            const isVisibleGlazingTable1 = await commonPage.isElementExists(windowsComparePage.tableGlazingTable1);
            expect(isVisibleGlazingTable1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Glazing Table');
            throw error;
        }
    });

    it("Should Verify Second 'Glazing Table' Details Container", async () => {
        try {
            const isVisibleGlazingTable2 = await commonPage.isElementExists(windowsComparePage.tableGlazingTable2);
            expect(isVisibleGlazingTable2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Glazing Table');
            throw error;
        }
    });

    it("Should Verify First Product 'Certifications' Details Container", async () => {
        try {
            const isVisibleGlazingTable2 = await commonPage.isElementExists(windowsComparePage.elementCertficate1);
            expect(isVisibleGlazingTable2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Certifications');
            throw error;
        }
    });

    it("Should Verify Second Product 'Certifications' Details Container", async () => {
        try {
            const isVisibleGlazingTable2 = await commonPage.isElementExists(windowsComparePage.elementCertficate2);
            expect(isVisibleGlazingTable2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Certifications');
            throw error;
        }
    });

    it("Should Verify First Product 'Downloads' Section", async () => {
        const downloadPath = path.resolve(__dirname, 'downloads');
        try {
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath
            });
            const windowDetailPage = new WindowDetailPage(page, downloadPath);
            await commonPage.performClick(windowsComparePage.downloads1);
            await commonPage.wait();
            const isDownloaded = await windowDetailPage.checkFileDownloaded('Kawneer Company Inc - 3-Part Specs');
            console.log(`File downloaded: ${isDownloaded}`);
            expect(isDownloaded).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'First Product Downloads Section');
            throw error;
        }
    });

    it("Should Verify Second Product 'Downloads' Section", async () => {
        const downloadPath = path.resolve(__dirname, 'downloads');
        try {
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath
            });
            const windowDetailPage = new WindowDetailPage(page, downloadPath);
            await commonPage.performClick(windowsComparePage.downloads2);
            await commonPage.wait();
            const isDownloaded = await windowDetailPage.checkFileDownloaded('Andersen Windows Inc - Awning Vinyl-Clad Wood 400 Series Size Chart');
            console.log(`File downloaded: ${isDownloaded}`);
            expect(isDownloaded).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Second Product Downloads Section');
            throw error;
        }
    });

    it("Should Verify in Footer First Product 'Company Name' Visible", async () => {
        try {
            const isVisibleCompanyName1 = await commonPage.isElementExists(windowsComparePage.txtCompanyNameFooter1);
            expect(isVisibleCompanyName1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Footer First Product Company Name');
            throw error;
        }
    });

    it("Should Verify in Footer Second Product 'Company Name' Visible", async () => {
        try {
            const isVisibleCompanyName2 = await commonPage.isElementExists(windowsComparePage.txtCompanyNameFooter2);
            expect(isVisibleCompanyName2).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Footer Second Product Company Name');
            throw error;
        }
    });

    it("Should Verify in Footer First Product 'Address' Visible", async () => {
        try {
            const isVisibleAddress1 = await commonPage.isElementExists(windowsComparePage.txtAddressFooter1);
            expect(isVisibleAddress1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Footer First Product Address');
            throw error;
        }
    });

    it("Should Verify in Footer Second Product 'Address' Visible", async () => {
        try {
            const isVisibleAddress1 = await commonPage.isElementExists(windowsComparePage.txtAddressFooter1);
            expect(isVisibleAddress1).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Footer Second Product Address');
            throw error;
        }
    });

    it("Should Verify in Footer First Product 'Website Link' open Website", async () => {
        try {
            await commonPage.performClick(windowsComparePage.linkWebsiteFooter1);
            const allPages = await browser.pages();
            for (const currentPage of allPages) {
                const currentUrl = await currentPage.url();
                if (currentUrl.includes('kawneer')) {
                    console.log('Footer First Product Website Url', currentUrl);
                    expect(currentUrl).toContain('kawneer');
                }

                if (currentUrl.includes('kawneer')) {
                    await currentPage.close();
                }
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Footer First Product Website Url');
            throw error;
        }
    });

    it("Should Verify in Footer Second Product 'Website Link' open Website", async () => {
        try {
            await commonPage.performClick(windowsComparePage.linkWebsiteFooter2);
            const allPages = await browser.pages();
            for (const currentPage of allPages) {
                const currentUrl = await currentPage.url();
                if (currentUrl.includes('andersenwindows')) {
                    console.log('Footer Second Product Website Url', currentUrl);
                    expect(currentUrl).toContain('andersenwindows');
                }

                if (currentUrl.includes('andersenwindows')) {
                    await currentPage.close();
                }
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Footer Second Product Website Url');
            throw error;
        }
    }); 
});