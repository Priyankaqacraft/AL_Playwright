import puppeteer from 'puppeteer';
import CommonPage from './commonPage';
import LoginPage from './loginPage';

class SignupPage extends CommonPage{
    constructor(page) {
        super(page);
        this.firstNameField = "//input[@id='registration-fn']";
        this.lastNameField = "//input[@id='registration-ln']";
        this.emailField = "//input[@id='signin-email']";
        this.passwordField = "//input[@id='signin-pass']";
        this.registration_success_message = "//h2[contains(text(),'Welcome to the Acelab Community!')]";
        this.btnDone = "//button[@type='button']";
        this.link_account_setup = "//h1[contains(text(),'Complete Your Account')]";
        this.btnCreateAccount = "//span[text()='Create Account']";
        this.terms_of_use_link = "//a[contains(text(),'Terms of Use')]";
        this.privacy_policy_link = "//a[contains(text(),'Privacy Policy')]";
        this.paragraph_second = "//p[3]";
        this.privacy_policy_paragraph = "//p[2]";
        this.emailValidation = "//span[@id='vee_Email']";
        this.passwordValidation = "//span[@id='vee_pass']";
        this.loginPage = new LoginPage(page);
        this.commonPage = new CommonPage(page);
    }
    
    async registerANewUser(firstName, lastName, email, password) {
        await this.commonPage.waitForLoadComplete(); 
        await this.commonPage.performClick(this.loginPage.joinforfreeButton);
        await this.commonPage.waitForLoadComplete(); 
        await this.commonPage.clearAndSendKeys(this.firstNameField, firstName);
        await this.commonPage.clearAndSendKeys(this.lastNameField, lastName);
        await this.commonPage.clearAndSendKeys(this.emailField, email);
        await this.commonPage.clearAndSendKeys(this.passwordField, password)
        await this.commonPage.performClick(this.loginPage.login_btn);
    }
}
export default SignupPage;