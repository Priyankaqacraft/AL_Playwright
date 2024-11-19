import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class WindowsComparePage extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.compare_footer = "//span[text()='Saved Products']";
        this.projectDropdown = "//div[contains(@class,'inline-block')]";
        this.optionsDropdown = "//div[contains(@class,'inline-block')]//following::option";
        this.selectProject = "//option[contains(text(),'Project_gqj9sj0z')]";
        this.btnCompare = "//button[text()='Compare']";
    }
}
export default WindowsComparePage 