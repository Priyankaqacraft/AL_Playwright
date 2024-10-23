import puppeteer from 'puppeteer';
import HomePage from './homePage';
import CommonPage from './commonPage';
import { Path } from 'glob';
const extensions = ['Courses'];
import { activeBaseUrl } from '../utils/config';

class WindowSearchResultPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.product_image='//img[contains(@src,"Ashlar_wtbwm3.png")]'
        this.productdisplaypage_title='h2'
        this.window_link='//a[contains(text(),"Windows")]'
        
        
        

    }
}



export default WindowSearchResultPage;