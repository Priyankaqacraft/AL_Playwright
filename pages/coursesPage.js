import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class CoursesPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.titleAndDescription = "//main/div/div[1]/div/div[1]//p";
        this.infoBlocks = "//main/div/div[1]/div/div[2]";


    }
    
   
}

export default CoursesPage;