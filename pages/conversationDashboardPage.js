import puppeteer, { Page } from 'puppeteer';
import CommonPage from './commonPage';

class ConversationDashboardPage extends CommonPage{

    
    

    constructor(page) {
        super(page);
        this.page = page;
        this.heading = "//h1";
        this.overview = "//h2";
        this.newinq = "//span[contains(text(),'New')]";
        this.processinginq = "//span[contains(text(),'Processing')]";
        this.awaiting = "//span[contains(text(),'Awaiting')]";
        this.completedinq="//span[contains(text(),'Completed')]";
        this.onholdinq = "//span[contains(text(),'On')]";
        this.expandbutton = "(//span[@class='mr-4']//*[local-name()='svg'])[1]";
        this.table = "(//table)[1]";
        this.changestatusbutton = "((//table)[1]//child::button)[1]";
        this.status ="//div[contains(@class,'shadow-lg')]//child::div//child::div";
        this.listofstatus ="//div[contains(@class,'shadow-lg')]//child::div//child::div";
        
    }
}
export default ConversationDashboardPage;