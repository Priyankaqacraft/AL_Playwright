import puppeteer from 'puppeteer';
import HomePage from './homePage';
import CommonPage from './commonPage';
import { Path } from 'glob';
const extensions = ['Courses'];
import { activeBaseUrl } from '../utils/config';

class manufacturerFinder extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page; 
        this.division_filters='//span[@class="flex-grow"]';
        this.concrete = '//a[@href="/manufacturers/03_concrete"]';
        this.findManufacturer='((//div[contains(@class,"col-span-12")])//li)[2]//a';
        this.breadcrumbdivision='//a[contains(text(),"Divisions")]';
        this.abcWindowsystem = '(//p[contains(text(),"ABC")])[1]//parent::div';
        this.abcbrandpagelogo='(//child::img[contains(@alt,"Window Systems")])[2]';
        this.requestInfoButton='//button[contains(@class,"active:bg-green-shade")]' ;
        this.pricequote='(//span[contains(@class,"bg-white")])[1]';
        this.Technicalcheckbox='(//span[contains(@class,"bg-white")])[2]';
        this.templeproject='//button[contains(text(),"General ")]';
        this.connectButton='//button[contains(text(),"Connect")]';
        this.gotoConversationButton='(//a[contains(@href,"conversations")])[2]';
        this.selectProductButton='//button[contains(text(),"Select")]';
        this.selectProductfromList='//span[contains(text(),"Casement")]/parent::button'

    
    }
    // Method to retrieve and return text content from a list of elements
    async getFiltersText(filtersXPath) {
        const elements = await this.page.$x(filtersXPath); // Get all matching elements
        const filtersText = await Promise.all(
            elements.map(async (element) => {
                const text = await this.page.evaluate(el => el.innerText.trim(), element);
                return text;
            })
        );
        return filtersText;
    }
}

export default manufacturerFinder;