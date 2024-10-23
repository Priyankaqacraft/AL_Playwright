import puppeteer from 'puppeteer';
import CommonPage from './commonPage';


let commonPage;
class ArticlesPage extends CommonPage{
    constructor(page){
        super(page);
        this.page = page;
        commonPage = new CommonPage(this.page)
        this.link_article = "//a[contains(text(),'Articles')]";
        this.btn_model_close = "(//button[@id='close-modal-button'])[1]";
        this.link_article_3marketing = "//p[contains(text(),'3 Marketing')]";
        this.link_back = "//button[contains(text(),'Back')]";
        this.hero_image = "//img[@class='hero-image']";
        this.link_technology = "//a[contains(text(),'Technology')]";
        this.block_quote = "//div[@class='quote-wrapper']";
        this.text_block_quote = "//div[@class='quote-wrapper']//p";
        this.author_section = "//h3[@class='section-title']";
        this.link_author = "//dl[@class= 'credits']//span";
        this.text_external_link_title = "//h1[contains(text(),'Energy')]";
        this.text_internal_link_title = "//h1[contains(text(),'Technology')]";
        this.cordinary_img = "(//div[@class='author-image'])[1]//img";
    }

    async closeModel(){
        // await commonPage.waitForLoadComplete();
        await this.page.waitForXPath(this.btn_model_close, { timeout: 40000 });
        const [element] = await this.page.$x(this.btn_model_close);
        if (element) {
        await Promise.all([element.click(), this.wait(3)]);
        }
    }
}
export default ArticlesPage;