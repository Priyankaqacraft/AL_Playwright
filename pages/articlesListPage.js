import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class ArticlesListPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.categoryButtonList = "//ul[@id='quick-categories']";
        this.caseStudiesCategoryHeader = "(//h2[@id='case-studies']//following::ul)[1]";
        this.modalCloseButton = "//button[@id='close-modal-button']";
        this.caseStudiesCategoryButton = "//button[contains(text(), 'Case Studies')]";
        this.title = "//div[@id='article-landing']/h1";
        this.subheader = "//div[@id='article-landing']//p";
        this.second_article_link = "(//div[@class='glider-contain']//a//p)[2]"
        

    }
    
   
}

export default ArticlesListPage;