import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class AboutUs extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.meta_keywords = 'meta[name="keywords"]';
        this.meta_description = "meta[name='description']";
        this.meta_robots = "meta[name='robots']";
        this.meta_viewport = "meta[name='viewport']";
        this.meta_charset = "meta[charset='utf-8']";
        this.meta_format_detection = "meta[name='format-detection']";
        this.meta_pinterest = "meta[name='pinterest']";
    
        this.first_paragraph =  "//p[contains(., 'Design and build teams face new and old built')]";
        this.second_paragraph_first_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[1]";
        this.second_paragraph_second_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[2]";
        this.second_paragraph_third_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[3]";
        this.second_paragraph_fourth_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[4]";
        this.second_paragraph_fifth_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[5]";
        this.second_paragraph_sixth_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[6]";
        this.second_paragraph_seventh_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[7]";
        this.second_paragraph_eighth_line = "//h2[contains(.,'Information Overload Drives Inefficiency')]//following::p[8]";
    
        this.image_one = ".//img[@title='Vardhan Mehta']";
        this.image_two = ".//img[@title='Dries Carmeliet']";
        this.image_three = ".//img[@title='James Minor']";
        this.image_four = ".//img[@title='Bo Lotozo']";
        this.image_five = ".//img[@title='Dave Lemont']";
        this.name_one = ".//p[contains(text() ,'Vardhan Mehta')]";
        this.name_two = ".//p[contains(text() ,'Dries Carmeliet')]";
        this.name_three = ".//p[contains(text() ,'James Minor')]";
        this.name_four = ".//p[contains(text() ,'Bo Lotozo')]";
        this.name_five = ".//p[contains(text() ,'Dave Lemont')]";
        this.JobTitle_one = ".//p[contains(text() ,'Co-founder & CEO. Architect')]";
        this.JobTitle_two = ".//p[contains(text() ,'Co-founder & CPO. Architect')]";
        this.JobTitle_three = ".//p[contains(text() ,'VP of Product Development')]";
        this.JobTitle_four = ".//p[contains(text() ,'Architectural Product Specialist')]";
        this.JobTitle_five = ".//p[contains(text() ,'Chairman. Former CEO of Revit')]";
        // this.imageOne = "img[src*='Vardhan_yyhwkw.png']";

        this.images = [
            {
                selector: "//img[contains(@src,'Vardhan_yyhwkw.png')]",
                expectedUrl: "https://res.cloudinary.com/acelab/image/upload/v1657313871/CMS/About%20Us%20Page/Team/Vardhan_yyhwkw.png"
            },
            {
                selector: "//img[contains(@src,'Dries2_scanyr.png')]",
                expectedUrl: "https://res.cloudinary.com/acelab/image/upload/v1657313870/CMS/About%20Us%20Page/Team/Dries2_scanyr.png"
            },
            {
                selector: "//img[contains(@src,'James_oxt3dz.png')]",
                expectedUrl: "https://res.cloudinary.com/acelab/image/upload/v1657313871/CMS/About%20Us%20Page/Team/James_oxt3dz.png"
            },
            {
                selector: "//img[contains(@src,'1660926262514_zjylro.jpg')]",
                expectedUrl: "https://res.cloudinary.com/acelab/image/upload/v1663699425/CMS/About%20Us%20Page/Team/1660926262514_zjylro.jpg"
            },
            {
                selector: "//img[contains(@src,'Dave_untpn9.jpg')] ",
                expectedUrl: "https://res.cloudinary.com/acelab/image/upload/v1672998153/CMS/About%20Us%20Page/Team/Dave_untpn9.jpg"
            },
            
        ];
    }

    // async getParagraphText(xpath) {

    //     const elements = await this.page.$x(xpath);
    //     if (elements.length > 0) {
           
    //         return this.page.evaluate(el => el.innerText, elements[0]);
    //     }
    //     else {
    //         throw new Error(`Element with XPath ${xpath} not found`);
    //     }
    // }

    async verifyImageSrc(page) {
        for (const image of this.images) {
            const [imageHandle] = await page.$x(image.selector);
            
            if (imageHandle) {
                const imageSrc = await page.evaluate(img => img.src, imageHandle);
                try{
                    expect(imageSrc).toBe(image.expectedUrl);
                }catch(error){
                    await captureAndAttachScreenshot(page, 'image_src');
                    throw error;
                }
                
            } else {
                console.error(`Image element not found for the given XPath: ${image.selector}`);
            }
        }
    }
   
}

export default AboutUs;