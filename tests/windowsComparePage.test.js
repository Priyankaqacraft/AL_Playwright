import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { performLogins } from '../utils/logins';
import WindowDetailPage from '../pages/windowDetailPage';
import WindowsSearchResultPage from '../pages/windowsSearchResultPage';
import WindowsComparePage from '../pages/windowsComparePage';

jest.setTimeout(65000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        windowDetailPage,
        windowsComparePage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        windowDetailPage = new WindowDetailPage(page);
        windowsComparePage = new WindowsComparePage(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

     it("Should verify Compare Product Button and Url", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.waitForLoadComplete();
            await commonPage.hoverOverElement(windowDetailPage.productButton);
            await commonPage.performClick(windowDetailPage.windoesButton);
            await commonPage.wait();
            const tooltip = await page.$x(windowDetailPage.btnPopoverClose);
            const btntooltip = tooltip.length;
            console.log(btntooltip);
            if (btntooltip > 0) {
                await commonPage.performClick(windowDetailPage.btnPopoverClose);
            }
            await commonPage.performClick(windowsComparePage.compare_footer);
            await commonPage.performClick(windowsComparePage.projectDropdown);
            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(100);
            await page.keyboard.press('Enter');
            await commonPage.performClick(windowsComparePage.btnCompare);
            await commonPage.waitForLoadComplete();
            const currentUrl = page.url();
            console.log(`Current Tab URL: ${currentUrl}`);
            expect(currentUrl).toContain('product-comparison');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Compare Button and Url');
            throw error;
        }
    }); 
});