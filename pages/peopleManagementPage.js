import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class PeopleManagement extends CommonPage {
    constructor(page){
        super(page);
        this.account_Status_Text = "//p[text()='Account Status']";
        this.upload_Profile_Pic_Button = "//span[@class='uppercase']";
        this.change_Password_Button = "//a[@id='change-password-link']";
        this.delete_Account_Button = "//button[@id='delete-account-button']";
        this.people_Management_Text = "//p[contains(.,'People Management')]";
        this.btnCancel = "//button[@type='button'][contains(.,'Cancel')]";
        this.leave_Company_Button = "//button[@type='button'][contains(.,'Leave Company')]";
        this.people_management_email = "(//p[contains(@class,'text-secondary')])[1]";
        this.button_add_another_email_member = "//button[contains(text(),'Add another team member')]";
        this.new_email_invitation = "//p[contains(text(),'abc@acelab.com')]";
        this.button_resend_email = "(//button[contains(text(),'Resend email')])[1]";
        this.button_close_button = "(//button[contains(text(),'×')])[2]";
        this.button_remove = "//span[text()='Remove']";
        this.button_close = "//button[text()='Close']";
        this.manage_account_link = "//a[@id='manage-account-link']";
        this.admin_user_List = "//div[contains(@class,'col-span-2')]//child::div//*[contains(@class,'font-bold')]";
        this.dropdownRoleOp = "(//span[contains(@class,'pointer-events-none')]//preceding-sibling::select)//option";
        this.userText = "//p[contains(.,'User')]";
        this.roleText = "//p[contains(.,'Role')]";
        this.first_Team_Member = "(//div[contains(@class,'grid grid-cols-4')])[4]";
        this.company_Info = "//div[@id='company-info-card']";


    }
}
export default PeopleManagement