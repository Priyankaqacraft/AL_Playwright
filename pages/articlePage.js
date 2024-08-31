import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class Article extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.about_the_author_section = 'about-author-wrapper';
    }
   
}

export default Article;