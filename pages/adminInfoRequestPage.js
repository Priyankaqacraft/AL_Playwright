import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class AdminRequest extends CommonPage {
  constructor(page) {
    super(page);
    this.page = page;
    this.searchBar = "//input[@id='search-bar-input']";
    this.searchResultText = "//a[contains(@href,'/manufacturer/jeh-windows')]";
    this.btnRequestInformation = "//button[contains(text(),'Request Information')]";
    this.btnGeneralResearch = "//button[contains(text(),'General Research')]";
    this.selectProducts = "(//button[@type='button' and @class='text-left'])[1]";  
    this.btnSelectProducts = "//button[contains(text(),'Skip Question')]";
    this.selectCheckbox = "(//label[contains(@class,'pointer-events-none')])[1]";
    this.btnConnectWithExpert = "//button[contains(text(),'Connect with Expert')]";
    this.btnGoToProject = "//a[contains(text(),'Project')]";
    this.btnClose = " //button[@type='button' and text()='Close']";
    this.btnRequests = "//span[text()='Requests']";
    this.btnInfoRequests = "//span[text()='Info Requests']";
    this.txtDate = "(//p[contains(@class,'text-secondary')])[1]";
    this.btnIconPlus = "(//button[contains(@class,'justify-center')])[1]";
    this.popupOption = "//span[contains(@class,'inline-flex')]";
    this.btnActiveRequests = "//span[contains(text(),'Active Requests')]"
    this.elementActiveRequest = "(//div[contains(@class,'py-5')])[1]";
    this.inputSearchBar = "//input[contains(@placeholder,'Search Projects')]";
    this.searchBarResults = "//a[contains(@href,'/admin/projects') and contains(@class,'text-green-element')]";
    this.btnRequestedBy = "//div[contains(text(),'Requested By')]";
    this.btnSortAscending = "(//span[contains(text(),'Sort Ascending')])[1]";
    this.sortedProducts = "//div[contains(@class,'cursor-pointer relative')]";
    this.btnSortDescending = "(//span[contains(text(),'Sort Descending')])[1]";
    this.btnDate = "//div[contains(text(),'Date')]";
    this.btnDateAscending = "(//div[contains(text(),'Date')]//span)[2]";
    this.sortedDate = "//p[contains(@class,'text-secondary')]";
    this.btnDateDescending = "(//div[contains(text(),'Date')]//button)[2]//span";
    this.btnManufacturer = "//div[contains(text(),'Manufacturer')]";
    this.btnManufacturerAscending = "(//div[contains(text(),'Manufacturer')]//span)[2]"
    this.sortedManufacturer = "//p[contains(@class,'max-w-[180px]')]";
    this.btnManufacturerDescending = "(//div[contains(text(),'Manufacturer')]//button)[2]//span";
    this.btnDeadline = "//div[contains(text(),'Deadline')]";
    this.btnDeadlineAscending = "(//div[contains(text(),'Deadline')]//span)[2]";
    this.sortDeadlineDate = "//input[contains(@name,'deadline')]";
    this.btnDeadlineDescending = "(//div[contains(text(),'Deadline')]//button)[2]//span";
    this.btnProjectNameGR = "(//a[contains(text(),'General Research')])[1]";
    this.btnBacktoProjectsDashboard = "//a[contains(text(),'Back to Projects Dashboard')]";
    this.btnStatusDropdown = "(//div[@class='pr-5'])[1]//div";
    this.txtDropdownOption = "(//div[@class='pr-5'])[1]//option";
    this.btnAdd = "(//span[text()='ADD'])[1]";
    this.btn$ = "(//span[text()='$'])[1]";
    this.inputDiscoveredSalesValue = "//input[@id='dsv-discovered-sales-value']";
    this.btnSave = "//button[text()='save']";
    this.btnDeleteIcon = "(//button[contains(@class,'text-gray-700')])[1]";
    this.btnDeleteRequest = "//button[text()='DELETE REQUEST']";
    this.txtAlertPopup = "//div[@role='alert' and contains(text(),'Info request deleted successfully.')]";

    this.monthMap = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
  }

  async getSortedDates() {
    const inputElements = await this.page.$x(this.sortedDate);
    const deadlineDates = [];
    for (const element of inputElements) {
      const dateValue = await this.page.evaluate(el => el.textContent.trim(), element);
      deadlineDates.push(dateValue);
    }
    return deadlineDates;
  }

  async extractDates() {
    const inputElements = await this.page.$x(this.sortDeadlineDate);
    const deadlineDates = [];
    for (const element of inputElements) {
      const dateValue = await this.page.evaluate(el => el.value, element);
      deadlineDates.push(dateValue);
    }
    return deadlineDates;
  }

  parseDate(dateStr) {
    const [month, day] = dateStr.split(' ');
    return { month: this.monthMap[month], day: parseInt(day) };
  }

  formatDate(dateObj) {
    const day = dateObj.day < 10 ? `0${dateObj.day}` : dateObj.day;
    return (
      Object.keys(this.monthMap).find(key => this.monthMap[key] === dateObj.month) + ' ' + day
    );
  }

  async isSortedAscending(dates) {
    const parsedDates = dates.map(this.parseDate.bind(this));
    const sortedDates = [...parsedDates].sort((a, b) => {
      if (a.month === b.month) return a.day - b.day;
      return a.month - b.month;
    });
    return sortedDates.map(this.formatDate.bind(this));
  }

  async isSortedDescending(dates) {
    const parsedDates = dates.map(this.parseDate.bind(this));
    const sortedDates = [...parsedDates].sort((a, b) => {
      if (a.month === b.month) return b.day - a.day;
      return b.month - a.month;
    });
    return sortedDates.map(this.formatDate.bind(this));
  }

  async getDollarSignColor() {
    const [elementHandle] = await this.page.$x(this.btn$);
    return this.page.evaluate(
      (el) => window.getComputedStyle(el).color,
      elementHandle
    );
  }
}
export default AdminRequest