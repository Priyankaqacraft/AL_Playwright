import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class WindowsComparePage extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.compare_footer = "//span[text()='Saved Products']";
        this.projectDropdown = "//div[contains(@class,'inline-block')]";
        this.optionsDropdown = "//div[contains(@class,'inline-block')]//following::option";
        this.selectProject = "//option[contains(text(),'Project_gqj9sj0z')]";
        this.txtProductText1 = "//p[contains(text(),'Awning - Vinyl-Clad Wood')]";
        this.txtProductText2 = "//p[contains(text(),'Double Hung - Aluminum')]";
        this.btnCompare = "//button[text()='Compare']";
        this.btnAddComment = "(//button[contains(text(),'Add Comment')])[1]";
        this.inputboxAddComments = "//div[contains(@class,'custom-scrollbar')]//child::p";
        this.btnSave = "//span[contains(text(),'Save')]";
        this.btnCancel = "//button[contains(text(),'Cancel')]";
        this.textCommentIsVisible = "//div[contains(@class,'comment_message')]//p";
        this.btnThreeDot = "(//p[contains(text(),'Comments')])[1]//following::button[1]";
        this.btnEdit = "//button[contains(text(),'Edit')]";
        this.btnDelete = "//button[contains(text(),'Delete')]";
        this.btnUpdate = "//span[contains(text(),'Update')]";
        this.fileInputXPath = "//input[@type='file']";
        this.addDocumentsButtonXPath = "//button[contains(text(),'Add Documents')]";
        this.textUploadedFile = "//p[contains(text(),'dummy.pdf')]";
        this.btnAdd = "(//button[contains(text(),'Add')])[1]";
        this.btnDelete = "//button[contains(text(),'Delete')]";
        this.imgProduct1 = "(//div[@id='product-images']//img)[1]";
        this.imgProduct2 = "((//div[@id='product-images'])[2]//img)[1]";
        this.productCompanyName1 = "(//a[contains(@class,'text-sm text-green-element')])[1]";
        this.productCompanyName2 = "(//a[contains(@class,'text-sm text-green-element')])[2]";
        this.productName1 = "(//a[contains(@class,'text-base font-medium')])[1]";
        this.productName2 = "(//a[contains(@class,'text-base font-medium')])[2]";
        this.productSecondaryText1 = "(//p[contains(@class,'text-sm text-secondary')])[1]";
        this.productSecondaryText2 = "(//p[contains(@class,'text-sm text-secondary')])[2]";
        this.detailsProductHighlights1 = "(//ul[contains(@class,'grid-cols-1')])[1]";
        this.detailsProductHighlights2 = "(//ul[contains(@class,'grid-cols-1')])[2]";
        this.productDescription1 = "(//p[@class='text-sm'])[1]";
        this.productDescription2 = "((//div[@class='space-y-5'])[2]//p)[1]";
        this.detailsDimensions1 = "(//div[@class='p-5'])[1]"
        this.detailsDimensions2 = "((//div[contains(@class,'divide-y')])[2]//div)[1]";
        this.finishes1 = "(//div[contains(@class,'flex-1 place-items-center')])[1]";
        this.finishes2 = "(//div[contains(@class,'flex-1 place-items-center')])[2]"
        this.btnLeftArrow = "(//button[contains(@class,'shrink-0')])[1]";
        this.btnRightArrow = "(//button[contains(@class,'shrink-0')])[2]";
        this.btnRequestDataTrim = "//button[contains(text(), 'Request Data')]";
        this.trimImg = "(//div[contains(@class, 'rounded-xl')])[1]//img";
        this.gridTypeImg = "((//h3[contains(text(),'Grid Types')]//following::div[1]//child::div)[1]//descendant::img)[1]"; //img[contains(@class,'aspect-square') and @xpath='1']";
        this.txtDesignNote1 = "(//p[contains(text(),'Design Note')])[1]//following-sibling::p";
        this.txtDesignNote2 = "(//p[contains(text(),'Design Note')])[2]//following-sibling::p";
        this.txtU_Factor1 = "(//div[contains(@class,'min-h-[6rem]')])[1]";
        this.txtU_Factor2 = "(//div[contains(@class,'min-h-[6rem]')])[2]"
        this.txtPerformanceGrade1 = "(//p[contains(text(),'Performance Grade')])[1]//following-sibling::p";
        this.txtPerformanceGrade2 = "(//p[contains(text(),'Performance Grade')])[2]//following-sibling::p";
        this.tableGlazingTable1 = "(//div[contains(@class,'last:lg:mb-0')])[1]";
        this.tableGlazingTable2 = "(//div[contains(@class,'last:lg:mb-0')])[2]";
        this.elementCertficate1 = "(//div[contains(@class,'items-center gap-x-3')])[1]";
        this.elementCertficate2 = "((//div[contains(@class,'space-y-2.5')])[2]//div)[1]";
        this.downloads1 = "//span[contains(text(),'Kawneer Company Inc - 3-Part Specs')]";
        this.downloads2 = "//span[contains(text(),'Andersen Windows Inc - Awning Vinyl-Clad Wood 400 Series Size Chart')]";
        this.txtFooterProductName1 = "(//p[contains(@class,'mb-5 font-medium')])[1]";
        this.txtFooterProductName2 = "(//p[contains(@class,'mb-5 font-medium')])[2]";
        this.btnRequestInformation1 = "(//button[contains(text(),'Request Information')])[1]";
        this.btnRequestInformation2 = "(//button[contains(text(),'Request Information')])[2]";
        this.txtCompanyNameFooter1 = "//p[text()='Kawneer Company, Inc.']";
        this.txtCompanyNameFooter2 = "//p[text()='Andersen Windows, Inc.']";
        this.txtAddressFooter1 = "//p[contains(text(),'555 Guthridge Ct. Technology Park/Atlanta Norcross')]";
        this.txtAddressFooter2 = "//p[contains(text(),'100 Fourth Ave. N. P. O. Box 12 Bayport')]";
        this.linkWebsiteFooter1 = "//a[text()='https://kawneer.us']";
        this.linkWebsiteFooter2 = "//a[text()='https://www.andersenwindows.com']";
        this.btnLearnMore1 = "(//a[text()='Learn More'])[1]";
        this.btnLearnMore2 = "(//a[text()='Learn More'])[2]";
        this.btnSpecs = "//span[text()='Specs']";
        this.btnCAD = "//span[text()='CAD']";
        this.btnBIM = "//span[text()='BIM']";
        this.btnCrossIcon1 = "(//button[contains(@class,'absolute right-0 top-0')])[1]";
        this.btnCrossIcon2 = "(//button[contains(@class,'absolute right-0 top-0')])[2]";
        this.btnImageView1 = "//img[contains(@src,'Kawneer_Company_Inc')]//preceding-sibling::div";
        this.viewImage = "//div[contains(@class,'overflow-hidden lg:block')]//img";
        this.btnViewImageCrossIcon = "//button[contains(@class,'top-3 right-3')]";
        this.btnImageView2 = "//img[contains(@src,'Andersen_Windows')]//preceding-sibling::div";
        this.btnWindowsSchedule = "//span[text()='Windows Schedule']";
        this.inputSearchBar = "//input[contains(@placeholder,'Search')]";
        this.btnNewSearch = "//a[contains(text(),'New Search')]";
        this.btnAddProducts = "//span[text()='Add Products']";
        this.btnShare = "//span[text()='Share']";
    }

    async uploadFile(filePath) {
        try {
            await this.page.waitForXPath(this.fileInputXPath);
            const [fileInput] = await this.page.$x(this.fileInputXPath);
            await this.page.evaluate((input) => {
                input.classList.remove("pointer-events-none", "invisible");
            }, fileInput);
            await fileInput.uploadFile(filePath);
            console.log(`File uploaded successfully: ${filePath}`);
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async isButtonClickable(xpath) {
        try {
            const elements = await this.page.$x(xpath);
            if (elements.length === 0) {
                console.error(`No element found for XPath: ${xpath}`);
                return false;
            }
            const buttonHandle = elements[0];
            const buttonText = await this.page.evaluate((el) => el.textContent.trim(), buttonHandle);
            const isVisible = await this.page.evaluate((el) => {
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0;
            }, buttonHandle);
            if (!isVisible) {
                console.log(`Button "${buttonText}" is not visible.`);
                return false;
            }
            const isEnabled = await this.page.evaluate((el) => !el.disabled, buttonHandle);
            if (!isEnabled) {
                console.log(`Button "${buttonText}" is disabled.`);
                return false;
            }
            console.log(`Button "${buttonText}" is clickable.`);
            return true;
        } catch (error) {
            console.error(`Error checking if button is clickable: ${error.message}`);
            return false;
        }
    }
}
export default WindowsComparePage 