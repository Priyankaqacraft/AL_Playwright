import puppeteer from 'puppeteer';
import CommonPage from './commonPage';
const fs = require('fs');
const path = require('path');

class WindowDetailPage extends CommonPage {
    constructor(page, downloadPath) {
        super(page);
        this.page = page;
        this.downloadPath = downloadPath;
        this.design_options_section_headline = "//p[contains(text(),'Product Description')]";
        this.product_info_manufacturer = "//a[contains(text(),\"Andersen Windows, Inc.\")]";
        this.bread_crumb_home_link = "//a[text()='Home']";
        this.browse_all_Product_button = "(//a[@href='/divisions/new-search'])[1]";
        this.bread_crumb_windows_link = "//p[contains(text(),'Windows')]";
        this.bread_crumb_all_windows_link = "//ul//p[contains(text(),'Windows')][1]";
        this.back_to_search_button = "//button[@id='back-to-search-button']";
        this.filters = "//h3[contains(@class,'text-xs uppercase')]";
        this.productButton = "//a[text()='Products']";
        this.windoesButton = "//a[contains(text(),'Windows')]";
        this.txtSelectWindowType = "//h2[contains(text(),'Select a window type')]";
        this.txtDoubleHung = "//span[contains(text(),'Double Hung')]"
        this.project = "(//p[contains(@title,'Project')])[1]";
        this.freme = "//span[contains(text(),'Bronze')]";
        this.btnNextQuestion = "//span[contains(text(),'NEXT QUESTION')]";
        this.btnSkipQuestion = "//span[contains(text(),'Skip Question')]";
        this.btnSkipShowResults = "//span[contains(text(),'Skip & Show Results')]";
        this.brochure_pdf_button = "//span[contains(text(),'Brochures')]";
        this.product_info_section = "//span[contains(@class,'inline-block')]";
        this.product_info_series = "(//span[contains(text(),'E Series')])[1]";
        this.product_info_section_additional_tags = "//div[@id='tooltip']//div";
        this.download_documents_button = "(//span[contains(text(),'MB')])[1]";
        this.download_documents_modal_download_button = "//span[contains(text(),'Clad Wood E Series Size Chart')]";
        this.design_options_section_headline = "//p[contains(text(),'Product Description')]";
        this.finish_colors_tile_title = "//div[contains(@class,'text-center')]//p[@class='text-sm font-bold']";
        this.hardware_finish_colors_images = "//div[contains(@class,'relative p')]";
        this.finish_colors_hoverover = "(//div[contains(@class,'text-center')])[1]";
        this.hardware_finish_colors_section = "//h3[contains(text(),'Finishes')]";
        this.colorImg = "//img[@alt='Terratone']";
        this.start_Over_link = "//span[contains(text(),'Start Over')]";
        this.mouserover_picture = "//img[contains(@alt,'Picture')]";
        this.window_Type_image = "//span[contains(text(),'Picture')]";
        this.mouserover_casement = "//img[contains(@alt,'Casement')]";
        this.window_Type_casement = "//span[contains(text(),'Casement ')]";
        this.mouserover_tileturn = "//img[contains(@alt,'Tilt & Turn')]";
        this.window_Type_TiltTurn = "//span[contains(text(),'Tilt & Turn ')]";
        this.mouserover_singlehung = "//img[contains(@alt,'Single Hung ')]";
        this.window_Type_SingleHung = "//span[contains(text(),'Single Hung ')]";
        this.mouserover_doublehung = "//img[contains(@alt,'Double Hung')]";
        this.window_Type_Doublehung = "//span[contains(text(),'Double Hung ')]";
        this.mouserover_specialshape = "//img[contains(@alt,'Specialty Shapes')]";
        this.window_Type_Speciality = "//span[contains(text(),'Specialty Shapes')]";
        this.mouserover_sliding = "//img[contains(@alt,'Sliding')]";
        this.window_Type_sliding = "//span[contains(text(),'Sliding')]";
        this.mouserover_awning = "//img[contains(@alt,'Awning')]";
        this.window_Type_Awning = "//span[contains(text(),'Awning')]";
        this.mouserover_hopper = "//img[contains(@alt,'Hopper')]";
        this.window_Type_hopper = "//span[contains(text(),'Hopper')]";
        this.grid_profiles_section_title = "//h3[contains(text(),'Grid Types')]";
        this.grid_profile_img_click = "(//img[contains(@src,'xT7IxxbO08Rgh-gwyZBObkb7R05bzyCkBVUsFKIbxlE_ysaofl.png')])[1]";
        this.grid_patterns_note_button = "(//div[contains(@class,'mb-8 space-y-1')]//child::p[1])[2]";
        this.grid_profile_img_click1 = "//img[contains(@src,'Acelab_WIndows_GridProfiles_TDL_msy6rr.svg')][1]";
        this.grid_profile_img_click2 = "//img[contains(@src,'Acelab_WIndows_GridProfiles_SDL_d75gxv.svg')][1]";
        this.grid_profile_img_click3 = "(//img[contains(@src,'Acelab_WIndows_GridProfiles_Removeable_Interior_Grid_lgsats.svg')])[1]"
        this.decorative_glass_section_title = "//h3[contains(text(),'Decorative Glazing')]";
        this.decorative_glass_about_section = "//p[contains(text(),'Textured')]";
        this.decorative_glass_images = "(//img[contains(@src,'Acelab_Windows_GlassTypes_Textured_wlxbrm.png')])[1]";
        this.performancedata_heading = "//h2[contains(text(),'Performance Data')]";
        this.short_summary_link = "//div[@class='absolute inset-x-0 bottom-full flex justify-center']//button";
        this.compare_footer = "//div[@id='compare-sticky-footer']";
        this.btnSeeMore = "//span[contains(text(),'See more')]";
        this.btnPopoverClose = "//button[@class='driver-popover-close-btn']";
        this.btnSave = "//button[contains(@Class,'save-product-button-1')]";
        this.firstProject = "(//li[@role='button'])[2]";
        this.btnAdd = "(//span[text()='Add'])[1]";
        this.btnRemove = "(//span[text()='Remove'])[1]";
        this.txtProductfooter = "(//p[contains(text(),'Double Hung')])[2]";
        this.firstNextButton ="//button[contains(text(),'Next')]";
        this.finishButton="//button[contains(text(),'Finish')]"
        this.startOver="//span[contains(text(),'Start ')]//ancestor::button";
        this.addproduct="(//span[text()='Add'])[1]";
        this.firstProductName="//a[contains(text(),'Double Hung  - Bronze')]";
        this.removeProduct="//span[text()='Remove']";
        this.alert="//div[contains(text(),'Product removed from project.')]";
        this.firstProductDoubleHung="//a[contains(text(),'Double Hung - Aluminum')]";
    }
        async checkFileDownloaded(filename) {
            const maxRetries = 5;
            const retryInterval = 500; 
            const freshnessDuration = 2 * 60 * 1000; 
            const currentDate = new Date().toISOString().slice(0, 10); 
        
            for (let i = 0; i < maxRetries; i++) {
                const files = fs.readdirSync(this.downloadPath);
                const matchedFile = files
                    .map(file => ({
                        name: file,
                        fullPath: path.join(this.downloadPath, file),
                        lastWriteTime: fs.statSync(path.join(this.downloadPath, file)).mtime
                    }))
                    .filter(file => file.name.includes(filename) && file.name.includes(currentDate))
                    .sort((a, b) => b.lastWriteTime - a.lastWriteTime)[0];
        
                if (matchedFile) {
                    const isFresh = Date.now() - matchedFile.lastWriteTime.getTime() < freshnessDuration;
                    fs.unlinkSync(matchedFile.fullPath); 
                    return isFresh; 
                }
                await new Promise(resolve => setTimeout(resolve, retryInterval));
            }
            return false;
        }

    async skipSuggestion(){
        await this.performClick(this.firstNextButton);
        await this.performClick(this.firstNextButton);
        await this.performClick(this.firstNextButton);
        await this.performClick(this.finishButton);
    }
}

export default WindowDetailPage;