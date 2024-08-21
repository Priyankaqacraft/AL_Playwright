import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class HomePage extends CommonPage{
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
        this.productLink="//li[@title='Products']";
        this.manufacturerLink="//li[@title='Manufacturers']";
        this.resourcesLink="//li[@title='Resources']";
        this.myconversationLink="//a[@href='/my-conversations']";
        this.searchbar="//input[@id='search-bar-input']";
        this.profileicon="//button[@id='profile-dropdown']";
        this.projectButton="//button[@id='workspace-button']";
        this.openPreviousProjectLink="//a[contains(text(),'Open Project')]";
        this.homeLogo="//a[@href='/home']/*[local-name()='svg']";
        this.manageAccountLink="//span[text()='Manage Account']";
        this.myProjectsLink="//li/a[@href='/my-projects']";

    }


    
}

export default HomePage;