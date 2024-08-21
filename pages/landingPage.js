import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class LandingPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.homeLink="(//*[local-name()='g'][@id='Desktop_Logo'])[1]";
        this.construction_details_footerLink="//p[text()='Resources']/following::a[@href='/construction-details']";
        this.building_science_courses_footelLink="//p[text()='Resources']/following::a[@href='/courses']";
        this.articles_footerLink="//p[text()='Resources']/following::a[@href='/articles']";
        this.manufacturerFinder_footerLink="//p[text()='Tools']/following::a[@href='/manufacturers']";
        this.tutorials_footerLink="//p[text()='Resources']/following::a[@href='https://intercom.help/acelab-bb372ca4afa3']";
        this.about_us_headerLink="(//*[local-name()='g'][@id='Desktop_Logo'])[1]/parent::*/parent::*/parent::div/following-sibling::div/div[1]/a[@href='/about-us']"
    }


    
}

export default LandingPage;