import puppeteer from 'puppeteer';
import CommonPage from './commonPage';
import WindowDetailPage from './windowDetailPage';

class AdminRecommendation extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.commonPage = new CommonPage(page);
        this.windowDetailPage = new WindowDetailPage(page);
        this.btnRequests = "//span[text()='Requests']";
        this.btnRecommendationRequests = "//span[text()='Recommendation Requests']";
        this.txtDate = "(//p[contains(@class,'text-xs')])[1]";
        this.productCount = "//div[contains(@class,'py-5 text-sm')]";
        this.iconStar = "(//button[contains(@type,'button') and contains(@class,'font-medium')])[1]";
        this.btnStarred = "(//input[@type='checkbox'])[1]";
        this.btnGetProRecmmendatins = "//span[contains(text(),'GET PRO RECOMMENDATIONS')]";
        this.btnStartOver = "//button[@type='button' and contains(@class,'inline-flex')]//span";
        this.projectText = "//span[contains(text(),'Co-ed school')]";
        this.btnActiveRequests = "(//input[@type='checkbox'])[2]"
        this.dropdownAcelabManagers = "//option[contains(text(),'All Acelab Managers')]";
        this.txtAcelabManagersResults = "//span[contains(text(),'Acelab Admin User')]";
        this.txtProductCategory = "//button[contains(text(),'Windows')]";
        this.sortedProducts = "//div[contains(@class,'gap-1')]//p[1]";
        this.btnProductCategory = "//div[contains(text(),'Product Category')]";
        this.btnProductCategoryAscending = "(//div[contains(text(),'Product Category')]//span)[2]";
        this.sortedProductCategory = "//button[@type='button' and contains(@class,'lg:pt-0')]";
        this.btnProductCategoryDescending = "(//div[contains(text(),'Product Category')]//button)[2]//span";
        this.btnRecommended = "//div[contains(text(),'Recommended')]";
        this.btnRecommendedAscending = "(//div[contains(text(),'Recommended')]//span)[2]";
        this.sortedRecommended = "//div[contains(@class,'flex w-36')]//span";
        this.btnRecommendedDescending = "(//div[contains(text(),'Recommended')]//button)[2]//span";
        this.btnStatusDropdown = "(//div[@class='pr-2.5'])[1]//div";
        this.txtDropdownOption = "(//div[@class='pr-2.5'])[1]//option";
        this.btnAdd = "(//button[contains(text(),'ADD')])[1]";
        this.txtAlertPopup = "//div[@role='alert' and contains(text(),'Recommendation request deleted successfully.')]"
    }

    async quizWindows() {
        await this.commonPage.hoverOverElement(this.windowDetailPage.productButton);
        await this.commonPage.performClick(this.windowDetailPage.windoesButton);
        await this.commonPage.wait();
        const selectWindowType = await this.page.$x(this.windowDetailPage.txtSelectWindowType);
        const selectWindow = selectWindowType.length;
        if (selectWindow > 0) {
            await this.commonPage.performClick(this.windowDetailPage.txtDoubleHung);
            await this.commonPage.performClick(this.projectText);
            await this.commonPage.performClick(this.windowDetailPage.btnNextQuestion);
            await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
            await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
            await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
            await this.commonPage.performClick(this.btnGetProRecmmendatins);
            await this.commonPage.wait();
            const tooltip = await this.page.$x(this.windowDetailPage.btnPopoverClose);
            const btntooltip = tooltip.length;
            if (btntooltip > 0) {
                await this.commonPage.performClick(this.windowDetailPage.btnPopoverClose);
            }
        }
        else {
            const tooltip = await this.page.$x(this.windowDetailPage.btnPopoverClose);
            const btntooltip = tooltip.length;
            if (btntooltip > 0) {
                await this.commonPage.performClick(this.windowDetailPage.btnPopoverClose);
            }
            const btnStartOverarrow = await this.page.$x(this.btnStartOver);
            const btnStratOverVisible = btnStartOverarrow.length;
            if (btnStratOverVisible > 0) {
                await this.commonPage.performClick(this.btnStartOver);
                await this.commonPage.wait();
                const selectWindowType = await this.page.$x(this.windowDetailPage.txtSelectWindowType);
                const selectWindow = selectWindowType.length;
                if (selectWindow > 0) {
                    await this.commonPage.performClick(this.windowDetailPage.txtDoubleHung);
                    await this.commonPage.performClick(this.projectText);
                    await this.commonPage.performClick(this.windowDetailPage.btnNextQuestion);
                    await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
                    await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
                    await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
                    await this.commonPage.performClick(this.btnGetProRecmmendatins);
                    await this.commonPage.wait();
                    const tooltip = await this.page.$x(this.windowDetailPage.btnPopoverClose);
                    const btntooltip = tooltip.length;
                    if (btntooltip > 0) {
                        await this.commonPage.performClick(this.windowDetailPage.btnPopoverClose);
                    }
                }
            }
        }
    }
}
export default AdminRecommendation