import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class AboutUs extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        
        
    }
   
}

export default AboutUs;