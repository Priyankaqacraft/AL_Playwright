import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class LoginPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.signinButton="(//*[local-name()='g'][@id='Desktop_Logo'])[1]/parent::*/parent::*/parent::div/following-sibling::div/div[1]/button[text()='Sign In']";
        this.joinforfreeButton="(//*[local-name()='g'][@id='Desktop_Logo'])[1]/parent::*/parent::*/parent::div/following-sibling::div/div[1]/button[text()='Join For Free']"
        this.joinforfreeButtonCount="//button[@id='desktop-signup-button']"
        this.forManufacturersButton="//span[text()='FOR MANUFACTURERS']";
        this.scheduleAnIntroCall="//a[text()='Schedule an intro call']";
        this.discoverHowItWorks="//p[text()='Discover how it works']";
        this.scheduleADemoButton="//a[text()='Schedule a Demo']";
        this.howAcelabWorksHeader="//h1[text()='How Acelab Works']";
        this.startASearchbutton="//a[@href='/divisions/new-search']";
        this.chatWithAnExpertButton="//span[contains(text(),'Chat with an Expert')]";
        this.ResourceAndEducationHeader="//p[text()='Resources & Education']";
        this.faqHeader="//h2[text()='FAQ']";
        this.welcomeBackHomePage="//h1[contains(text(),'Welcome Back')]";
        
    }


    
}

export default LoginPage;