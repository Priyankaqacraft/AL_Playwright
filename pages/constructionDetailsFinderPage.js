import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class ConstructionDetailsFinder extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.filter_categories = "//button[contains(@id,'filter')]";
        this.filter = "//h4[contains(@class,'inline')]";
        this.detail_cards = "(//div[@id='windows-grid']//following::a)[1]";
        this.btnBacktoSearch = "//span[contains(text(),'Back to Search')]";
        this.R45Text = "//div[contains(@class,'mt-2.5')]//p";
        this.breadcrumbHome = "//a[text()='Home']";
        this.searchBar = "//input[@placeholder='Search construction details']";
        this.searchProductCountText = "//p[contains(@class,'font-medium')]";
        this.btnClearSearch = "//button[contains(text(),'Clear Search')]";
    }
}
export default ConstructionDetailsFinder