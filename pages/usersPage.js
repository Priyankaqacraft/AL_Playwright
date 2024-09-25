import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class UserPage extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.userTab = "//a[contains(@href,'/admin/users')]";
        this.searchUser = "//div//div//input[@placeholder='Search Users by Name or Email']";
        this.warningMessage = "//*[@class='py-4' and text()='No Users found!']";
        this.crossIcon = "//div[@class='absolute inset-y-0 right-0 flex items-center px-3']//*[name()='svg']";
        this.view_account_details = "//span[@class='font-semibold underline hover:cursor-pointer'and text()='View']";
        this.First_name_title = "//div/dt[contains(.,'First Name')]";
        this.First_name_value =  "//div[1]//dd[1]";
        this.Email_address_title = "//div/dt[contains(.,'Email')]";
        this.Email_address_value = "//div[3]//dd[1]";
        this.User_type_title = "//div/dt[contains(.,'User Type')]";
        this.User_type_value = "//div[4]//dd[1]";
        this.Company_title = "//div/dt[contains(.,'Company')]";
        this.Company_value = "//div[5]//dd[1]";
        this.Job_title = "//div/dt[contains(.,'Job Title')]";
        this.Job_value = "//div[6]//dd[1]";
        this.Phone_number_title = "//div/dt[contains(.,'Phone Number')]";
        this.Phone_number_value = "//div[7]//dd[1]";
        this.Home_address_title = "//div/dt[contains(.,'Home Address')]";
        this.Home_address_value = "//div[8]//dd[1]";
        this.close_button = "//p//button[contains(text(), 'Close')]";





    }
    
   
}

export default UserPage;