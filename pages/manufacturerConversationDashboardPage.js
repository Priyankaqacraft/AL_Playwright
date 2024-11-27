import puppeteer from 'puppeteer';
import WindowDetailPage from './windowDetailPage';
import CommonPage from './commonPage';

class ManufacturerConversationPage extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.commonPage = new CommonPage(page);
        this.overviewnewinquiry="//span[contains(text(),'New')]/following-sibling::p";
        this.overviewprocessing="//span[contains(text(),'Processing')]/following-sibling::p";
        this.overviewawaiting="//span[contains(text(),'Awaiting')]/following-sibling::p";
        this.overviewcompleted="//span[contains(text(),'Completed')]/following-sibling::p";
        this.overviewhold="//span[contains(text(),'Hold')]/following-sibling::p";
        this.newinquirynumber ="(//table[contains(@class,'px-1')])[1]//child::tbody//child::tr";
        this.processinginquirynumber="(//table)[2]//child::tbody//child::tr";
        this.awaitingreply="//p[contains(text(),'Awaiting')]/parent::div/parent::div/following-sibling::div/descendant::table/child::tbody/child::tr";
        this.completed = "//p[contains(text(),'Completed')]/parent::div/parent::div/following-sibling::div/descendant::table/child::tbody/child::tr";
        this.onhold="(//table)[last()]/child::tbody/child::tr";
        this.addbutton="(//td[contains(@class,'max-w-[17rem]')])[1]//descendant::div//child::button";
        this.ownername="(//div[contains(@class,'shadow-md')]//child::div//child::span)[1]";
        this.listofowner="//div[contains(@class,'shadow-md')]//child::div//child::span";
        this.conversation="(//p[contains(@class,'font-bold')])[1]";
        this.removebutton="(//button[contains(@class,'hover:bg-gray-300')])[1]";
        this.firstconv="(//p[contains(@class,'font-bold')])[1]";
        this.backbutton="//button[contains(@class,'!font-medium')]";
        this.Newinquirystts="(//p[contains(text(),'Inquiry')])[1]";
        this.sttsbutton="(//button[contains(@class,'z-10')])[1]";
        this.checkbox = "(//*[local-name() = 'svg' and @data-name='Icon/Check'])[1]";
        this.newinquirystts="(//span[contains(@class,'rounded-md')])[1]//following-sibling::span";
        this.statuslist="//div[contains(@class,'gap-2.5')]//child::span[1]//following-sibling::span";
        this.processingquirystatus="(//div[contains(@class,'hover:bg-light-gray')])[2]//child::div//child::span[1]";
        this.processinginquirybutton="(((//table)[2]//following::tbody)[1]//tr[last()]//child::button)[1]";
        this.clicknewinquiry="//span[text()='New Inquiry']";
        this.tablesection="//p[contains(text(),'New Inquiry')]//parent::div//parent::div//following-sibling::div//child::table";
        this.expandbutton="(//span[@class='mr-4'])[1]";
        this.buttonpropertyafter="(//*[local-name()='svg' and @class='h-4 w-4 transition rotate-180'])[1]";
        this.buttonpropertybefore="(//*[local-name()='svg' and @class='h-4 w-4 transition'])[1]";
        this.conversation="//div[contains(@class,'message-area-height')]"
    }
}
export default ManufacturerConversationPage;