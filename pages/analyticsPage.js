import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class AnalyticsPage extends CommonPage {

    constructor(page) {
        super(page);
        this.page = page;
        this.Type_of_Analytics = "//div//span[contains(.,'Analytics')]";
        this.User_type = "//a[@href='/admin/analytics']";
        this.Sign_Ups = "//p[contains(.,'Sign Ups')]";
        this.User_Retention = "//p[contains(.,'User Retention')]";
        this.Product_Usage_type = "//span[normalize-space()='Product Usage']";
        this.Page_view_type = "//a[@href='/admin/analytics/page-views']";
        this.Retention_Monthly = "//div//span[contains(text(),'Retention by Monthly Cohorts of Signed-Up Users')]";
        this.Retention_percentage = "//div//p[contains(.,'Retention percentage')]";
        this.percentage = "//div[@class='relative h-5 w-[25rem]']";
        this.Total_Registered_Users = "//div//span[contains(.,'Total Registered Users')]";
        this.Daily_Sign_Ups = "//div//span[contains(.,'Daily Sign Ups')]";
        this.Count_Days = "//div//span[contains(.,'Last 90 days')]";
        this.DailySignUpscanvas = "//canvas[@id='bar-chart']";
        this.Weekly_Active_Users = "//div//p[contains(.,'Weekly Active Users')]";
        this.Count_Days_in_users = "//div[3]//div[1]//div[1]//div[1]//p[1]";
        this.ShowLabel_in_users = "//div[@class='flex items-center text-sm']";
        this.Searches = "//div//p[contains(.,'Searches')]";
        this.Count_Days_in_search = "//div//p[contains(.,'Last 90 Days (by week)')]";
        this.Projects = "//div//p[contains(.,'Projects')]";
        this.Products = "//div//p[contains(.,'Products')]";
        this.Requests = "//div//p[contains(.,'Requests')]";
        this.Conversations = "//div//p[contains(.,'Conversations')]";
        this.Total_Page_Views = "//div/p[contains(.,'Total Page Views')]";
        this.Count_Days_in_page_view = "//p[@class='text-sm']";
        this.ShowLabel_in_page_view = "//div[@class='flex items-center text-sm']";
 
        


    }
  
}
export default AnalyticsPage;