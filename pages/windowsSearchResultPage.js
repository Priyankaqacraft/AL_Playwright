import puppeteer from 'puppeteer';
import WindowDetailPage from './windowDetailPage';
import CommonPage from './commonPage';

class WindowsSearchResultPage extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.commonPage = new CommonPage(page);
        this.windowDetailPage = new WindowDetailPage(page);
        this.frame = "(//p[contains(@class,'space-y-1')]//span)[1]";
        this.btnDone = "//button[text()='Done']";
        this.filterOption = "//span[contains(text(),'Double Hung ')]";
        this.doubleHung = "//div[@class='p-4']//descendant::a";
        this.txtFilterDoubleHung = "(//p[contains(text(),'Double Hung')])[1]";
        this.filterWindowType = "//h3[contains(text(),'Window Type')]//following-sibling::button";
        this.filterProject = "//h3[contains(text(),'Project')]//following-sibling::button";
        this.project = "//span[contains(text(),'General Research')]//following::div[1]";
        this.btnCross = "//h2[contains(text(),'Select your project')]//following::button[1]";
        this.filterFrameMaterial = "//h3[contains(text(),'Frame Material')]//following-sibling::button";
        this.frameFilterProductText = "//span[contains(@class,'inline-block') and text()='Aluminum']"
        this.filterFrameText = "(//p[contains(text(),'Aluminum')])[1]";
        this.btnRefresh = "//div[@id='parent']//div//button[@type='button']";
        this.btnFilterThermalPerformance = "//h3[contains(text(),'Thermal Performance')]//following-sibling::button";
        this.optionThermalPerformance = "//p[contains(text(),'Best in Class')]//parent::button";
        this.filterSpecialRequirements = "//h3[contains(text(),'Special Requirements')]//following-sibling::button";
        this.optionSpecialRequirements = "(//p[contains(@class,'space-y-1')]//child::span)[1]";
        this.spacialRequirementsProductText = "//span[contains(@class,'inline-block') and text()='AAMA Gold Certified']";
        this.filterSpecialRequirementText = "//p[contains(text(),'AAMA Gold Certified')]";
        this.filterProfileAesthetics = "//h3[contains(text(),'Profile Aesthetics')]//following-sibling::button";
        this.optionProfileAesthetics = "//img[contains(@src,'product-finder-quiz-images/Hung_C_xhzn27.png')]";
        this.Manufactureview="//div[contains(@class,'lg:space-x-8')]/child::div/child::button";
        this.manufacturername="//div[@class='space-y-7']//child::div//child::h3";
        this.homelink = "//a[contains(text(),'Home')]";
        this.productadvisorlink="//a[contains(text(),'ProductAdvisor')]";
        this.firstProductName="//a[contains(@href,'aluminum-window-8400tl-series')]/child::span"
        this.productremove="//span[contains(text(),'Remove')]";
        this.productadd="(//span[contains(text(),'Add')])[1]";
        this.addproduct="(//*[local-name()='svg' and @class='h-4 w-4'])[1]";
        this.firstproject="(//li[contains(@class,'hover:bg-green-highlight')])[1]/child::p";
    }

    async countElements(xpath) {
        const elements = await this.page.$x(xpath);
        return elements.length;
    }

    async quiz() {
        await this.commonPage.hoverOverElement(this.windowDetailPage.productButton);
        await this.commonPage.performClick(this.windowDetailPage.windoesButton);
        await this.commonPage.wait();
        const selectWindowType = await this.page.$x(this.windowDetailPage.txtSelectWindowType);
        const selectWindow = selectWindowType.length;
        if (selectWindow > 0) {
            await this.commonPage.performClick(this.windowDetailPage.txtDoubleHung);
            await this.commonPage.performClick(this.windowDetailPage.project);
            await this.commonPage.performClick(this.windowDetailPage.btnNextQuestion);
            await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
            await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
            await this.commonPage.performClick(this.windowDetailPage.btnSkipQuestion);
            await this.commonPage.performClick(this.windowDetailPage.btnSkipShowResults);
            await this.commonPage.wait();
            const tooltip = await this.page.$x(this.windowDetailPage.btnPopoverClose);
            const btntooltip = tooltip.length;
            console.log(btntooltip);
            if (btntooltip > 0) {
                await this.commonPage.performClick(this.windowDetailPage.btnPopoverClose);
            }
        }
        else {
            await this.commonPage.wait();
            const tooltip = await this.page.$x(this.windowDetailPage.btnPopoverClose);
            const btntooltip = tooltip.length;
            console.log(btntooltip);
            if (btntooltip > 0) {
                await this.commonPage.performClick(this.windowDetailPage.btnPopoverClose);
            }
        }
    }
}
export default WindowsSearchResultPage;