import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class LoginPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.joinforfreeButton="(//a[@id='desktop-signup-button'])[1]";
        this.joinforfreeButtonCount="//a[@id='desktop-signup-button']";
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
        this.signinButton = "//a[@id='desktop-login-button']"
        this.email_field = "//input[@id='signin-email']";
        this.password_field = "//input[@id='signin-pass']";
        this.login_btn = "//button[@type='submit']";
        this.forgot_password_link = "//a[text()='Forgot Password?']";
        this.signinHeading="//h1";
        this.emailError='//span[@id="vee_Email"]';
        this.passwordError="//span[@id='vee_Password']"
        
    }
    async verifyLockedAccountMessage() {
        let lockedAccountMessageDisplayed = false;
        for (let i = 1; i <= 10; i++) {
          try {
            const lockedAccountMessageElement = await this.page.$(this.lockedAccountMessageSelector);
            if (lockedAccountMessageElement) {
              lockedAccountMessageDisplayed = await this.page.evaluate(
                el => window.getComputedStyle(el).visibility !== 'hidden' && el.offsetHeight > 0 && el.offsetWidth > 0,
                lockedAccountMessageElement
              );
            }
          } catch (error) {
            if (error.name !== 'TimeoutError') {
              console.error('Error while checking locked account message:', error);
            }
          }
          if (lockedAccountMessageDisplayed) {
            return true;
          }
          await this.page.waitForTimeout(300);
        }
        return false;
      }

   
}

export default LoginPage;