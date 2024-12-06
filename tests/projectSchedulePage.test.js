import { teardown, noLoginsetup } from './setup.js';
import CommonPage from '../pages/commonPage.js';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper.js';
import HeaderPage from '../pages/headerPage.js';
import { performLogins } from '../utils/logins.js';
import { activeBaseUrl } from '../utils/config';
import loginPage from '../pages/loginPage.js';
//import ManufacturerConversationPage from '../pages/manufacturerConversationDashboardPage.js';
import ProjectSchedulePage from '../pages/projectSchedulePage';
import manufacturerFinder from '../pages/manufacturerFinderPage';
import WindowsComparePage from '../pages/windowsComparePage';
import WindowDetailPage from '../pages/windowDetailPage';

import { Paths } from '../utils/path.js';
import path from 'path';
import { expect } from '@jest/globals';
import { Page } from 'puppeteer';

const assert = require('assert')
jest.setTimeout(140000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        headerPage,
        loginpage,
        context,
        browser,
        //manufacturer,
        windowDetailPage,
        finder,
        projectschedule,
        windowcompare


    beforeAll(async () => {

        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        loginpage = new loginPage(page);
        headerPage = new HeaderPage(page);
        projectschedule = new ProjectSchedulePage(page);
        windowcompare = new WindowsComparePage(Page);
        browser = setupResults.browser;
        finder = new manufacturerFinder(page);
        windowDetailPage = new WindowDetailPage(page);
        context = browser.defaultBrowserContext();
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });
    it('It should verify that when user click on any project >> Schedule , initially it is showing "ADD SCHEDULE" button to add schedule', async () => {

        try {
            await performLogins(page, "admin");
            await commonPage.performClick(headerPage.publicsiteButton);
            await commonPage.performClick(headerPage.projectButton);
            await commonPage.performClick(projectschedule.projectclick);
            await commonPage.performClick(projectschedule.schedule);
            const textavailable = await commonPage.isElementExists(projectschedule.noscheduletext);
            if (textavailable > 0) {
                await commonPage.refreshPage();
                console.log("I am in if loop");
                await commonPage.isElementExists(projectschedule.addschedulebtn);
                await commonPage.performClick(projectschedule.addschedulebtn);
                const category = await commonPage.getElementText(projectschedule.masonrycategory);
                await commonPage.performClick(projectschedule.schedulecategory);
                await commonPage.isElementExists(projectschedule.scheduletable);
                const categoryadded = await commonPage.getElementText(projectschedule.schedulepagecategoryadded);
                assert.strictEqual(category, categoryadded);
            }
            else {
                console.log("schedule is already added");
                await commonPage.isElementExists(projectschedule.scheduletable);
                await commonPage.isElementDisplayed(projectschedule.schedulepagecategoryadded);
            }


        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that when any schedule category added to the schedule, initially it having default acelab field(Product, Approval Status, Masterformat section, Reps]', async () => {

        try {
            const productraw = await commonPage.getElementText(projectschedule.collumproduct);
            assert.strictEqual(productraw, 'Product');
            const approvalraw = await commonPage.getElementText(projectschedule.collumapproval);
            assert.strictEqual(approvalraw, 'Approval Status');
            const masterraw = await commonPage.getElementText(projectschedule.collumMasterformat);
            assert.strictEqual(masterraw, 'Masterformat section');
            const repsraw = await commonPage.getElementText(projectschedule.collumreps);
            assert.strictEqual(repsraw, 'Reps');


        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that "Approval status" have Edit functionality and list of status options', async () => {

        try {
            
            await commonPage.performClick(projectschedule.approvalbutton);
            await commonPage.performClick(projectschedule.editfield);
            const filterresult = await commonPage.getAttribute(projectschedule.approvalstts,'type');
          console.log("Approval status values are:",filterresult);
            await commonPage.isElementExists(projectschedule.approvalstts);
            await commonPage.performClick(projectschedule.cancelbutton);
            
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
  
    it('It should verify that In schedule, "Aprroval status" has options [Insert Left/Insert Right/Hide Field]', async () => {

        try {
            await commonPage.performClick(projectschedule.approvalbutton);
            await commonPage.performClick(projectschedule.insertleft);
            await commonPage.isElementDisplayed(projectschedule.addcutomfiledbutton);
            await commonPage.performClick(projectschedule.cancelbutton);
            await commonPage.performClick(projectschedule.approvalbutton);
            await commonPage.performClick(projectschedule.insertright);
            await commonPage.isElementDisplayed(projectschedule.addcutomfiledbutton);
            await commonPage.performClick(projectschedule.cancelbutton);
            await commonPage.performClick(projectschedule.approvalbutton);
            await commonPage.performClick(projectschedule.hidefield);
            const iscolumVisible = await commonPage.isElementExists(projectschedule.approvalstatuscols);
            expect(iscolumVisible).toBe(false);
            await commonPage.performClick(projectschedule.hidebutton);
            await commonPage.performClick(projectschedule.approvaltoggleon);
            const iscolumVisibletrue = await commonPage.isElementExists(projectschedule.approvalstatuscols);
            expect(iscolumVisibletrue).toBe(true);
            
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that in toolbar "Hide" tool is there which is used to  hide/unhide colums in schedule', async () => {

        try {
            await commonPage.performClick(projectschedule.hidebutton);
            const togglevalue=await commonPage.getAttribute(projectschedule.approvaltoggle,'class');
            expect(togglevalue).toContain('bg-green')
            await commonPage.isElementDisplayed(projectschedule.hiddenfield);
            await commonPage.performClick(projectschedule.approvaltoggle);
            const togglevalueafterclick=await commonPage.getAttribute(projectschedule.approvaltoggle,'class');
            expect(togglevalueafterclick).toContain('bg-border')
            console.log("Before click:",togglevalue);
            console.log("Before click:",togglevalueafterclick);
            await commonPage.performClick(projectschedule.hideall);
            await commonPage.isElementDisplayed(projectschedule.hiddenfield);
            await commonPage.performClick(projectschedule.showall);
            const textaftershowall=await commonPage.getElementText(projectschedule.nohiddenfield);
            expect(textaftershowall).toContain('No hidden fields');

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
   it('It should verify that in schedule,  first view is "Default view", and user can not edit and delelte default view', async () => {

        try {
            await commonPage.performClick(projectschedule.defaultviewbtn);
            const defaultview=await commonPage.getElementText(projectschedule.viewcreated);
            expect(defaultview).toContain('Default View');
            await commonPage.performClick(projectschedule.viewthreeedots);
            await commonPage.performClick(projectschedule.vieweditbtn);
            await commonPage.performClick(projectschedule.viewupdatebtn);
            const toastnotification=await commonPage.getElementText(projectschedule.cantupdatedefaultview);
            expect(toastnotification).toEqual('Cannot change the access level of the last public view.');
            await commonPage.refreshPage();
            await commonPage.performClick(projectschedule.defaultviewbtn);
            await commonPage.performClick(projectschedule.viewthreeedots);
            await commonPage.performClick(projectschedule.viewdeletebtn);
            await commonPage.performClick(projectschedule.delelteconfirm);
            const toastnotificationtodelelte=await commonPage.getElementText(projectschedule.cantdeletetoast);
            expect(toastnotificationtodelelte).toEqual('Cannot delete the last public view.');

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }

    });
   it('It should verify that in schedule, when user want to create view it is mendatory to provide "View Name"', async () => {

        try {
            await commonPage.refreshPage();
            await commonPage.performClick(projectschedule.defaultviewbtn);
            await commonPage.performClick(projectschedule.createnewview);
            await commonPage.performClick(projectschedule.createviewbtn);
            const validationmessage=await commonPage.getElementText(projectschedule.providenamemessage);
            expect(validationmessage).toEqual('Provide a view name');
            await commonPage.performClick(projectschedule.cancelbutton);
            const ismodalVisible = await commonPage.isElementExists(projectschedule.createviewbtn);
            expect(ismodalVisible).toBe(false);

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that in schedule, user can create view, user can not create view with same name which already exist and user can delete view', async () => {

        try {
            await commonPage.refreshPage();
            await commonPage.performClick(projectschedule.defaultviewbtn);
            await commonPage.performClick(projectschedule.createnewview);
            await commonPage.clearAndSendKeys(projectschedule.createviewtextbox,'View_1');
            await commonPage.performClick(projectschedule.createviewbtn);
            const istoastVisible = await commonPage.getElementText(projectschedule.viewaddedtoast);
            expect(istoastVisible).toStrictEqual("View created")
            await commonPage.performClick(projectschedule.createnewview);
            await commonPage.clearAndSendKeys(projectschedule.createviewtextbox,'View_1');
            await commonPage.performClick(projectschedule.createviewbtn);
            const istoastVisibleforexistview = await commonPage.getElementText(projectschedule.viewaddedtoast);
            expect(istoastVisibleforexistview).toStrictEqual("There is already a view named 'View_1'");
            await commonPage.performClick(projectschedule.addedview3dots);
            await commonPage.performClick(projectschedule.editviewbtn);
            await commonPage.clearAndSendKeys(projectschedule.createviewtextbox,'View_2');
            await commonPage.performClick(projectschedule.updateviewbtn);
            const forupdateviewVisible = await commonPage.getElementText(projectschedule.viewaddedtoast);
            expect(forupdateviewVisible).toStrictEqual("View updated");
            await commonPage.performClick(projectschedule.addedview3dots);
            await commonPage.performClick(projectschedule.deleteviewbtn);
            await commonPage.performClick(projectschedule.deletebutton);
            const deleteviewVisible = await commonPage.getElementText(projectschedule.viewaddedtoast);
            expect(deleteviewVisible).toStrictEqual("View deleted");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
   it('It should verify that in schedule, user can have 2 types of filters[Add Condition, Add Group condition]', async () => {

        try {
            await commonPage.refreshPage();
            await commonPage.performClick(projectschedule.filterbuttn);
            await commonPage.performClick(projectschedule.addconditionbutton);
            await commonPage.performClick(projectschedule.selectdropdown);
            await commonPage.performClick(projectschedule.dropdownvaluestatus);
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(projectschedule.thirddropdown);
            await commonPage.performClick(projectschedule.selectspprovebycliet);
            await commonPage.refreshPage();
            await commonPage.performClick(projectschedule.filterbuttn);
            await commonPage.getList(projectschedule.filterresult);
            await commonPage.performClick(projectschedule.filterbuttn);
            await commonPage.performClick(projectschedule.addgroupcondition);
            await commonPage.performClick(projectschedule.addgroupplusicon);
            await commonPage.performClick(projectschedule.group1stdropdown);
            await commonPage.performClick(projectschedule.numberfieldvalue);
            await commonPage.clearAndSendKeys(projectschedule.inputtextbox,'111')
            await commonPage.waitForLoadComplete();
            const filterresult = await commonPage.getElementText(projectschedule.filterresult);
            expect(filterresult).toEqual('111.00');
           
            await commonPage.performClick(projectschedule.filterbuttn);
            await commonPage.performClick(projectschedule.groupconditionremovebutton);
            await commonPage.performClick(projectschedule.removefilterbutton);
            

        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that in schedule, user can sort schedule records[First to Last, Last to First]', async () => {

        try {
            const expected_sorting = [
                "333.00",
                "222.00",
                "111.00",
    
              ];
            await commonPage.performClick(projectschedule.sortbuttontool);
            await commonPage.performClick(projectschedule.sortinglink);
            await commonPage.performClick(projectschedule.sortfirstdropdown);
            await commonPage.performClick(projectschedule.seconddropdownvalue);
            await commonPage.performClick(projectschedule.ftolsorting);
            await commonPage.performClick(projectschedule.ltofsorting);
            await commonPage.performClick(projectschedule.sortbutton);
            await commonPage.waitForLoadComplete();

            const sortedProductsText = await commonPage.getList(projectschedule.sortinfresult);
            const sortedProduct = sortedProductsText.split('\n').map(item => item.trim());
            console.log("Sorted are:",sortedProduct);
            const cleanedProducts = sortedProduct.filter((item) => item !== '');
            const locallySortedProducts = [...cleanedProducts];
            console.log("Values are:",locallySortedProducts);
            expect(expected_sorting).toEqual(locallySortedProducts);
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(projectschedule.sortbuttontool);
            await commonPage.performClick(projectschedule.ltof)
            await commonPage.performClick(projectschedule.ftol);
           await commonPage.performClick(projectschedule.ftolsorting);
           await commonPage.performClick(projectschedule.sortbuttontool);
           await commonPage.waitForLoadComplete();
            await commonPage.performClick(projectschedule.removesortingbutton);
            await commonPage.refreshPage();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
   it('It should verify that in schedule, user can change height of row', async () => {

        try {
            
            const defaultheight=await commonPage.getAttribute(projectschedule.heightofrow,'style');
            expect(defaultheight).toEqual('height: 64px;');
            await commonPage.performClick(projectschedule.heighttool);
            await commonPage.performClick(projectschedule.heightsmall);
            const smalltheight=await commonPage.getAttribute(projectschedule.heightofrow,'style');
            expect(smalltheight).toEqual('height: 32px;');
            await commonPage.performClick(projectschedule.heighttool);
            await commonPage.performClick(projectschedule.heightlarge);
            const largetheight=await commonPage.getAttribute(projectschedule.heightofrow,'style');
            expect(largetheight).toEqual('height: 128px;');
            await commonPage.performClick(projectschedule.heighttool);
            await commonPage.performClick(projectschedule.heightmedium);

          
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that in schedule, user can Export schedule using "Export" tool from toolbar', async () => {
        await commonPage.waitForLoadComplete();
        const downloadPath = path.resolve(__dirname, 'downloads');
        try {
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath
            });
            const windowDetailPage = new WindowDetailPage(page, downloadPath);
            await commonPage.performClick(projectschedule.exportTool);
            await commonPage.wait();            
            const isDownloaded =await windowDetailPage.checkFileDownloaded('Default View');
           console.log(`File downloaded: ${isDownloaded}`);
           expect(isDownloaded).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that in schedule, user can not copy product to one project to another project if no product is selected', async () => {
        
        try {
            await commonPage.performClick(projectschedule.threedotsbutton);
            await commonPage.performClick(projectschedule.copyproductbutton);
            const toastmessage = await commonPage.getElementText(projectschedule.noproductmessage);
            expect(toastmessage).toStrictEqual("You don't have any products selected. Please select products first.");         
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that in schedule, user can copy product to one project to another project if product is selected', async () => {
        
        try {
            await commonPage.refreshPage();
            await commonPage.hoverOverElement(projectschedule.productcheckbox);
            await commonPage.performClick(projectschedule.checkbox);
            await commonPage.performClick(projectschedule.threedotsbutton);
            await commonPage.performClick(projectschedule.copyproductbutton);
            await commonPage.performClick(projectschedule.firstprojecttocopy);
            const toastmessage = await commonPage.getElementText(projectschedule.productcopiedmessage);
            expect(toastmessage).toStrictEqual('Product copied successfully.');
            await commonPage.performClick(projectschedule.checkbox);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
    it('It should verify that in schedule, user can "Remove Product" and "DElete schedule" options when product is selected from schedule', async () => {
        
        try {
            await commonPage.refreshPage();
            await commonPage.hoverOverElement(projectschedule.productcheckbox);
            await commonPage.performClick(projectschedule.checkbox);
            await commonPage.performClick(projectschedule.threedotsbutton);
            await commonPage.performClick(projectschedule.removeproductbutton);
            const toastmessage = await commonPage.getElementText(projectschedule.deleteproductmessage);
            expect(toastmessage).toStrictEqual('Are you sure you want to delete this product?');
            await commonPage.performClick(projectschedule.removeproductcancelbutton);
            await commonPage.performClick(projectschedule.threedotsbutton);
            await commonPage.performClick(projectschedule.deleteschedulebutton);
            await commonPage.isElementExists(projectschedule.deletescheduleproceed);
            //expect(deletemodalschedule).toEqual('Are you sure you want to delete this schedule? This cannot be undone.');
            await commonPage.performClick(projectschedule.deleteschedulecancelbutton);
            await commonPage.performClick(projectschedule.checkbox);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'SignInButton_HomePage');
            throw error;
        }
    });
})