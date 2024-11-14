import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import { performLogins } from '../utils/logins';
import WindowDetailPage from '../pages/windowDetailPage';
import Collaborator from '../pages/addCollaboratorCompanyPage';
import ArticlesPage from '../pages/articlesPage';
import MyAccountPage from '../pages/myAccountPage';
const fs = require('fs');
const path = require('path');

jest.setTimeout(99000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        addCollaboratorCompanyPage,
        windowDetailPage,
        myAccountPage,
        articlesPage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        windowDetailPage = new WindowDetailPage(page);
        addCollaboratorCompanyPage = new Collaborator(page);
        myAccountPage = new MyAccountPage(page);
        articlesPage = new ArticlesPage(page);
        await page.goto(activeBaseUrl);
      
    });

    afterAll(async () => {
        await teardown();
    });

     it("Should verify window detail sticky header links design options", async () => {  
        try {
            await commonPage.navigateTo(Paths.Divisions + Paths.DivisionProductDetail);
            await commonPage.waitForLoadComplete(); 
            await page.reload();
            await commonPage.waitForLoadComplete();

            const isDesignOptionsVisible = await commonPage.isVisibleInViewportXpath(windowDetailPage.design_options_section_headline);
            expect(isDesignOptionsVisible).toBe(false);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Design Options');
            throw error;
        }
    });

  it("Should verify window detail sticky header links product info", async () => {
        try {
            const isDesignOptionsVisible = await commonPage.isVisibleInViewportXpath(windowDetailPage.product_info_manufacturer);
            expect(isDesignOptionsVisible).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product Info');
            throw error;
        }
    });     

    it("Should verify window detail home breadcrumb", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.Divisions + Paths.WindowSearchResultPage);
            await commonPage.wait();
            await commonPage.performClick(windowDetailPage.bread_crumb_home_link);
            const productButton = await commonPage.isElementDisplayed(windowDetailPage.browse_all_Product_button);
            expect(productButton).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Home Breadcrumb');
            throw error;
        }
    });

    it("Should verify window detail windows breadcrumb", async () => {
        try {
            const windowLink = await commonPage.isElementDisplayed(windowDetailPage.bread_crumb_windows_link);
            expect(windowLink).toBe(true);
            await myAccountPage.logOut();
            await commonPage.wait();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Windows Breadcrumb');
            throw error;
        }
    }); 

    it("Should verify 'Back To Search' link maintains filters", async () => {
        
        try {
            await performLogins(page, 'regression');
            await commonPage.wait();
            await commonPage.hoverOverElement(windowDetailPage.productButton);
            await commonPage.performClick(windowDetailPage.windoesButton);

            const selectWindowType = await page.$x(windowDetailPage.txtSelectWindowType);
            const selectWindow = selectWindowType.length;
            if(selectWindow > 0)
            {
                await commonPage.performClick(windowDetailPage.txtDoubleHung);
                await commonPage.performClick(windowDetailPage.project);
                await commonPage.performClick(windowDetailPage.freme);
                await commonPage.performClick(windowDetailPage.btnNextQuestion);
                await commonPage.performClick(windowDetailPage.btnSkipQuestion);
                await commonPage.performClick(windowDetailPage.btnSkipQuestion);
                await commonPage.performClick(windowDetailPage.btnSkipQuestion);
                await commonPage.performClick(windowDetailPage.btnSkipShowResults);
                await commonPage.wait();
                await windowDetailPage.skipSuggestion();
                await commonPage.wait();
                await commonPage.wait();
                const filterOptions = await commonPage.getList(windowDetailPage.filters);
                expect(filterOptions).toContain('Window Type\nProject\nFrame Material\nThermal Performance\nSpecial Requirements\nProfile Aesthetics');
                await commonPage.wait();
                await myAccountPage.logOut();
            }
            else 
            {
                await commonPage.wait();
                await windowDetailPage.skipSuggestion();
                const filterOptions = await commonPage.getList(windowDetailPage.filters);
                console.log("Filter list is:"+filterOptions);
                expect(filterOptions).toContain('Window Type\nProject\nFrame Material\nThermal Performance\nSpecial Requirements\nProfile Aesthetics');
                await commonPage.waitForLoadComplete();
                await myAccountPage.logOut();
            }    
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Back To Search link maintains filters');
            throw error;
        }
    });

     it("Should verify Window detail download pdf button", async () => {
        try {
            
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.Divisions + Paths.DivisionProductDetail);
            await commonPage.waitForLoadComplete();
            const pdfBrochure = await commonPage.isElementDisplayed(windowDetailPage.brochure_pdf_button);
            expect(pdfBrochure).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Download pdf button');
            throw error;
        }
    }); 

   it("Should verify Window detail page has expected product info series", async () => {
        try {
            const productInfo = await commonPage.getElementText(windowDetailPage.product_info_series);
            expect(productInfo).toContain('E Series');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product info series');
            throw error;
        }
    }); 

     it("Should verify Window detail page has expected product info section", async () => {
        try {
            const productSection = await commonPage.getList(windowDetailPage.product_info_section);
            console.log(productSection);
            expect(productSection).toContain('Impact Rated\nFlanged\nAluminum-Clad Solid Wood\nSlim Profiles\nEPD Available\nAAMA Gold Certified\nSpecialty Shapes\n08.52.13 - Metal-Clad Wood Windows\nEnergy Star Certified\nPerformance Grade C');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product info section');
            throw error;
        }
    });

   it("Should verify Window detail page has expected product info section (additional tags)", async () => {
        try {
            const productSectionadditionaltags = await commonPage.getList(windowDetailPage.product_info_section_additional_tags);
            const productSectionadditional = productSectionadditionaltags.split('\n').slice(0, 10).join('\n');
            console.log(productSectionadditional);
            expect(productSectionadditional).toContain('Impact Rating\nInstallation Style\nFrame Material\nSightlines\nEPD Certification\nAAMA Certification\nWindow Type\nMasterformat Section\nEnergy Star\nPerformance Grade');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product info section additional tags');
            throw error;
        }
    }); 
    

     it("Should verify Windows download documents button", async () => {
        try {
            await commonPage.performClick(windowDetailPage.btnSeeMore);
            const downloadDocumentsButton = await commonPage.isElementDisplayed(windowDetailPage.download_documents_button);
            expect(downloadDocumentsButton).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Download Documents Button');
            throw error;
        }
    }); 

    it("Should verify Windows download documents rep connect", async () => {

        await commonPage.waitForLoadComplete();  
        const downloadPath = path.resolve(__dirname, 'downloads');
        try {
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath
            });
            const windowDetailPage = new WindowDetailPage(page, downloadPath);
            await commonPage.performClick(windowDetailPage.download_documents_modal_download_button);
            await commonPage.wait();
            const isDownloaded = await windowDetailPage.checkFileDownloaded('Andersen Windows Inc - Specialty Al. Clad Wood E Series Size Chart');
            console.log(`File downloaded: ${isDownloaded}`);
            expect(isDownloaded).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Download Documents Button');
            throw error;
        }
    }); 

    it("Should verify Windows detail page Product Description Text", async () => {
        try {
            const productDescriptionText = await commonPage.getElementText(windowDetailPage.design_options_section_headline);
            expect(productDescriptionText).toContain('Product Description');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Product Description Text');
            throw error;
        }
    }); 

    it("Should verify Windows detail finish colors section text", async () => {
        try {
            const colorsSectionText = await commonPage.getElementText(windowDetailPage.finish_colors_tile_title);
            expect(colorsSectionText).toContain('Terratone');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Colors Section Text');
            throw error;
        }
    }); 

    it("Should verify Windows detail hover over color functionality detail text", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.hardware_finish_colors_images);
            await commonPage.waitForLoadComplete();
            const finishColorsText = await commonPage.getElementText(windowDetailPage.finish_colors_hoverover);
            expect(finishColorsText).toContain('Terratone Factory Painted Interior');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Colors Details Text');
            throw error;
        }
    }); 

    it("Should verify Windows finish colors images", async () => {
        try {
            const colorImage = await commonPage.isElementDisplayed(windowDetailPage.colorImg);
            expect(colorImage).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Color Image');
            throw error;
        }
    }); 

    it("Should verify Windows hardware finish colors section text", async () => {
        try {
            const hardwareFinishText = await commonPage.getElementText(windowDetailPage.hardware_finish_colors_section);
            expect(hardwareFinishText).toContain('Finishes');
            await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Finishes Text');
            throw error;
        }
    }); // URL Changed please chnage the new URL

    it("Should verify Windows detail hardware about text of Picture window type", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.Divisions + Paths.WindowSearchResultPage);
            await commonPage.performClick(windowDetailPage.start_Over_link);
            await commonPage.wait();
            await commonPage.hoverOverElement(windowDetailPage.productButton);
            await commonPage.performClick(windowDetailPage.windoesButton); 
            await commonPage.hoverOverElement(windowDetailPage.mouserover_picture);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_image);
            expect(windowTypeText).toContain('Picture');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Picture Text');
            throw error;
        }
    }); 

    it("Should verify Windows detail hardware about text of Casement window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_casement);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_casement);
            expect(windowTypeText).toContain('Casement');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Casement Text');
            throw error;
        }
    });

    it("Should verify Windows detail hardware about text of Tilt & Turn window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_tileturn);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_TiltTurn);
            expect(windowTypeText).toContain('Tilt & Turn');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Tilt & Turn Text');
            throw error;
        }
    });

    it("Should verify Windows detail hardware about text of Single Hung window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_singlehung);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_SingleHung);
            expect(windowTypeText).toContain('Single Hung');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Single Hung Text');
            throw error;
        }
    });

    it("Should verify Windows detail hardware about text of Double Hung window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_doublehung);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_Doublehung);
            expect(windowTypeText).toContain('Double Hung');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Double Hung Text');
            throw error;
        }
    });

    it("Should verify Windows detail hardware about text of Specialty Shapes window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_specialshape);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_Speciality);
            expect(windowTypeText).toContain('Specialty Shapes');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Specialty Shapes Text');
            throw error;
        }
    });

    it("Should verify Windows detail hardware about text of Sliding window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_sliding);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_sliding);
            expect(windowTypeText).toContain('Sliding');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Sliding Text');
            throw error;
        }
    });

    it("Should verify Windows detail hardware about text of Awning window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_awning);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_Awning);
            expect(windowTypeText).toContain('Awning');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Awning Text');
            throw error;
        }
    });

    it("Should verify Windows detail hardware about text of Hopper window type", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.mouserover_hopper);
            const windowTypeText = await commonPage.getElementText(windowDetailPage.window_Type_hopper);
            expect(windowTypeText).toContain('Hopper');
            await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Hopper Text');
            throw error;
        }
    }); 

    it("Should verify Windows detail grid profiles section text", async () => {
        try {
            await performLogins(page, 'regression');
            await commonPage.navigateTo(Paths.Divisions + Paths.DivisionProductDetail);
            const gridProfileTitle = await commonPage.getElementText(windowDetailPage.grid_profiles_section_title);
            expect(gridProfileTitle).toContain('Grid Types');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Grid Types Text');
            throw error;
        }
    }); 

    it("Should verify Windows detail grid profiles image url", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.grid_profile_img_click);
            const gridProfileImg = await commonPage.getAttribute(windowDetailPage.grid_profile_img_click, "src");
            expect(gridProfileImg).toBe('https://res.cloudinary.com/acelab/image/fetch/f_auto,q_auto/https://res.cloudinary.com/acelab/image/upload/v1707234110/product-files/xT7IxxbO08Rgh-gwyZBObkb7R05bzyCkBVUsFKIbxlE_ysaofl.png');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Grid Profiles Image Url');
            throw error;
        }
    }); 

    it("Should verify Windows detail Grilles Between Glass (GBG) Text", async () => {
        try {
            const grillesText = await commonPage.getList(windowDetailPage.grid_patterns_note_button);
            expect(grillesText).toContain('Grilles Between Glass (GBG)')
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Grilles Text');
            throw error;
        }
    }); 

    it("Should verify Windows detail True Divided Lite (TDL) Profiles Image Url", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.grid_profile_img_click1);
            const dividedLiteImg = await commonPage.getAttribute(windowDetailPage.grid_profile_img_click1, "src");
            expect(dividedLiteImg).toBe('https://res.cloudinary.com/acelab/image/fetch/f_auto,q_auto/https://res.cloudinary.com/acelab/image/upload/product-default-images/Acelab_WIndows_GridProfiles_TDL_msy6rr.svg');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Divided Lite (TDL) Profiles Image Url');
            throw error;
        }
    }); 

    it("Should verify Windows detail Divided Lite (TDL) Text", async () => {
        try {
            const dividedLiteText = await commonPage.getList(windowDetailPage.grid_patterns_note_button);
            expect(dividedLiteText).toContain('Divided Lite (TDL)')
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Divided Lite (TDL) Text');
            throw error;
        }
    }); 

    it("Should verify Windows detail True Simulated Divided Lite (SDL) Profiles Image Url", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.grid_profile_img_click2);
            const simulateDividedLiteImg = await commonPage.getAttribute(windowDetailPage.grid_profile_img_click2, "src");
            expect(simulateDividedLiteImg).toBe('https://res.cloudinary.com/acelab/image/fetch/f_auto,q_auto/https://res.cloudinary.com/acelab/image/upload/product-default-images/Acelab_WIndows_GridProfiles_SDL_d75gxv.svg');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Simulated Divided Lite (SDL) Profiles Image Url');
            throw error;
        }
    }); 

    it("Should verify Windows detail Simulated Divided Lite (SDL) Text", async () => {
        try {
            const simulateDividedLiteText = await commonPage.getList(windowDetailPage.grid_patterns_note_button);
            expect(simulateDividedLiteText).toContain('Simulated Divided Lite (SDL)')
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Simulated Divided Lite (SDL) Text');
            throw error;
        }
    });

    it("Should verify Windows detail True Removable Interior Grid Profiles Image Url", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.grid_profile_img_click3);
            const removableInteriorGridImg = await commonPage.getAttribute(windowDetailPage.grid_profile_img_click3, "src");
            expect(removableInteriorGridImg).toBe('https://res.cloudinary.com/acelab/image/fetch/f_auto,q_auto/https://res.cloudinary.com/acelab/image/upload/product-default-images/Acelab_WIndows_GridProfiles_Removeable_Interior_Grid_lgsats.svg');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Removable Interior Grid Profiles Image Url');
            throw error;
        }
    }); 

    it("Should verify Windows detail Removable Interior Grid Text", async () => {
        try {
            const removableInteriorGridText = await commonPage.getList(windowDetailPage.grid_patterns_note_button);
            expect(removableInteriorGridText).toContain('Removable Interior Grid')
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Removable Interior Grid Text');
            throw error;
        }
    });
                //------------------------------------------//
    it("Should verify Windows detail decorative glass section Text", async () => {
        try {
            const decorativeGlassSectionText = await commonPage.getElementText(windowDetailPage.decorative_glass_section_title);
            expect(decorativeGlassSectionText).toContain('Decorative Glazing')
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Decorative Glass Section Text');
            throw error;
        }
    });

    it("Should verify Windows detail decorative glass about section Text", async () => {
        try {
            const decorativeGlassSectionText = await commonPage.getElementText(windowDetailPage.decorative_glass_about_section);
            expect(decorativeGlassSectionText).toContain('Textured')
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Decorative glass about section Text');
            throw error;
        }
    });

    it("Should verify Windows detail decorative glass Textured Profiles Image Url", async () => {
        try {
            await commonPage.hoverOverElement(windowDetailPage.decorative_glass_images);
            const decorativeGlassImageUrl = await commonPage.getAttribute(windowDetailPage.decorative_glass_images, "src");
            expect(decorativeGlassImageUrl).toBe('https://res.cloudinary.com/acelab/image/fetch/f_auto,q_auto/https://res.cloudinary.com/acelab/image/upload/product-default-images/Acelab_Windows_GlassTypes_Textured_wlxbrm.png');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Decorative Glass Textured Profiles Image Url');
            throw error;
        }
    });

    it("Should verify Windows detail performance class table displays 'No data available' when appropriate", async () => {
        try {
            const performancedataHeading = await commonPage.getElementText(windowDetailPage.performancedata_heading);
            expect(performancedataHeading).toContain('Performance Data');
            // await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Performance Data Heading');
            throw error;
        }
    });  

    it("Should verify compare footer Saved Products for Text", async () => {
        try {
            const savedProductsForText = await commonPage.getElementText(windowDetailPage.compare_footer);
            expect(savedProductsForText).toContain('Saved Products for');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Compare footer Saved Products for Text');
            throw error;
        } 
    });   
});
