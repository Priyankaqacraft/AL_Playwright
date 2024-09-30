import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import FooterPage from '../pages/footerPage';
import ArticlesListPage from '../pages/articlesListPage';
const assert = require('assert');

jest.setTimeout(30000);

describe('Footer Tests', () => {
    let page,
        timestampUTC,
        commonPage,
        footerpage,
        articlesListPage,
        context,
        browser

    const publicPages = [

        Paths.About,
        Paths.Articles,
        Paths.Articles + Paths.DefaultArticle,
        Paths.ConstructionDetailsFinder,
        Paths.ContactUs,
        Paths.Courses,
        Paths.Manufacturer,
        Paths.PrivacyPolicy,
        Paths.TermsOfUse
    ];

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        footerpage = new FooterPage(page);
        articlesListPage = new ArticlesListPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

    it('The "Articles" link opens expected page in same tab', async () => {

        try {
            await commonPage.performClick(footerpage.articles_link);
            await commonPage.waitForLoadComplete();

            const spanTag = await commonPage.getElementsByTagName('span');
            expect(spanTag.includes('informed')).toBeTruthy();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'spanTag');
            throw error;
        }

    });

    it('The "Articles" link opens expected page in same tab', async () => {
        try {
            const pTag = await commonPage.getElementsByTagName('p');
            expect(pTag.includes('I want to read about')).toBeTruthy();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'pTag');
            throw error;
        }
    });

    it('The "Articles" link opens expected page in same tab', async () => {

        try {
            const title = await page.title();
            assert.strictEqual(title, "Acelab | Architect Blog & Articles: Guides, Tips & Case Studies");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'title_Articles');
            throw error;
        }
    });

    it('The "Articles" link opens expected page in same tab', async () => {
        try {
            const url = page.url();
            assert.strictEqual(url, commonPage.getUrl(Paths.Articles), "Could not find the expected page.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'url_Articles');
            throw error;
        }
    });

    it('The Building Science Courses', async () => {

        await commonPage.performClick(footerpage.courses_link);
        await commonPage.waitForLoadComplete();

        try {
            const url = page.url();
            assert.strictEqual(url, commonPage.getUrl(Paths.Courses), "Could not find the expected page.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Building Science Courses');
            throw error;
        }
    });

    it('The "Contact Us" link opens expected page in same tab', async () => {

        await commonPage.performClick(footerpage.contact_us_link);
        await commonPage.waitForLoadComplete();
        await commonPage.performClick(articlesListPage.modalCloseButton);

        try {
            const Urls = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(Urls.length, 1, "The link did not open in the same tab as expected.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Tab_Contact Us');
            throw error;
        }
    });

    it('The "Contact Us" link opens expected page in same tab', async () => {

        try {
            const currentUrl = page.url();
            expect(currentUrl).toContain('contact');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'url_ContactUs');
            throw error;
        }
    });

    it('The "Web Accessibility" link opens expected page in same tab', async () => {

        await commonPage.performClick(footerpage.web_accessibility_link);
        await commonPage.waitForLoadComplete();

        try {
            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 1, "The link did not open in the same tab as expected.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'tab_accessibility');
            throw error;
        }
    });

    it('The "Web Accessibility" link opens expected page in same tab', async () => {

        try {
            const currentUrl = page.url();
            expect(currentUrl).toContain('accessibility');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'url_accessibility');
            throw error;
        }
    });


    publicPages.forEach(extension => {
        it(`The "About Us" link is as expected on the ${extension} page`, async () => {

            try {
                await commonPage.navigateTo(extension, { waitUntil: 'networkidle0' });
                await commonPage.waitForLoadComplete();

                await commonPage.refreshPage();

                await commonPage.performClick(footerpage.about_us_link);

                await commonPage.refreshPage();

                await page.waitForTimeout(5000);
                const currentUrl = await commonPage.getCurrentUrl();
                expect(currentUrl).toContain('about-us');
            } catch (error) {
                await captureAndAttachScreenshot(page, 'Footer_Aboutus');
                throw error;
            }
        });
    });

    it('The "Log In" link opens expected page in same tab', async () => {

        try {
            await commonPage.performClick(footerpage.log_in_link);
            const email_field = await commonPage.isElementDisplayed(footerpage.email_field);
            expect(email_field).toBeTruthy();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Login_link');
            throw error;
        }
    });

    it('The "Sign Up" link opens expected page in same tab', async () => {

        try {
            await commonPage.performClick(footerpage.sign_up_link);
            const email_field = await commonPage.isElementDisplayed(footerpage.email_field);
            expect(email_field).toBeTruthy();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Sign_Up_link');
            throw error;
        }
    });

    it('The "Privacy Policy" link opens privacy policy page in same tab', async () => {

        await commonPage.refreshPage();

        await commonPage.performClick(footerpage.privacy_policy_link);
        await commonPage.waitForLoadComplete();

        try {
            const popupElement = await page.$x(await articlesListPage.modalCloseButton);
            if (popupElement.length > 0) {
                await commonPage.performClick(popupElement[0]);
            }

            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 1, "The link did not open in the same tab as expected.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Privacy_Policy_link');
            throw error;
        }
    })

    it('The "Privacy Policy" link opens privacy policy page in same tab', async () => {

        await commonPage.refreshPage();
        try {
            const currentUrl = page.url();
            expect(currentUrl).toContain('privacy-policy');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Privacy_Policy_link');
            throw error;
        }
    })

    it('The "Terms of Use" link opens expected page in same tab', async () => {

        await commonPage.refreshPage();

        await commonPage.performClick(footerpage.terms_of_use_link);
        await commonPage.waitForLoadComplete();

        try {

            const popupElement = await page.$x(await articlesListPage.modalCloseButton);
            if (popupElement.length > 0) {
                await commonPage.performClick(popupElement[0]);
            }

            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 1, "The link did not open in the same tab as expected.");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Terms of Use_link');
            throw error;
        }

    })

    it('The "Terms of Use" link opens expected page in same tab', async () => {

        await commonPage.refreshPage();

        try {
            const currentUrl = page.url();
            expect(currentUrl).toContain('terms-of-use');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Terms of Use_link');
            throw error;
        }

    })

    it('The "LinkedIn" link opens expected page in new tab', async () => {

        try {
            await commonPage.performClick(footerpage.linkedin_link);
            await commonPage.waitForLoadComplete();

            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 2, "The link did not open in the same tab as expected.");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'LinkedIn_link');
            throw error;
        }
    })

    it('The "LinkedIn" link opens expected page in new tab', async () => {

        try {
            await commonPage.waitForLoadComplete();

            const allPages = await browser.pages();

            for (const currentPage of allPages) {
                const currentUrl = await currentPage.url();

                if (currentUrl.includes('linkedin.com')) {
                    expect(currentUrl).toContain('linkedin.com');
                }

                if (currentUrl.includes('linkedin.com')) {
                    await currentPage.close();
                }
            }

        } catch (error) {
            await captureAndAttachScreenshot(page, 'url_linkdin');
            throw error;
        }
    });

    it('The "Instagram" link opens expected page in new tab', async () => {

        try {
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(footerpage.instagram_link);

            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 2, "The link did not open in the same tab as expected.");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'Instagram_link');
            throw error;
        }
    })

    it('The "Instagram" link opens expected page in new tab', async () => {

        try {
            await commonPage.waitForLoadComplete();

            const allPages = await browser.pages();

            for (const currentPage of allPages) {
                const currentUrl = await currentPage.url();

                if (currentUrl.includes('instagram.com')) {
                    expect(currentUrl).toContain('instagram.com');
                }

                if (currentUrl.includes('instagram.com')) {
                    await currentPage.close();
                }
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'url_Instagram');
            throw error;
        }
    });

    it('The "YouTube" link opens expected page in new tab', async () => {

        try {
            await commonPage.waitForLoadComplete();
            await commonPage.performClick(footerpage.youtube_link);

            const tab = await commonPage.getAllOpenTabUrls(context);
            assert.strictEqual(tab.length, 2, "The link did not open in the same tab as expected.");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'youtube_link');
            throw error;
        }
    })

    it('The "YouTube" link opens expected page in new tab', async () => {

        try {
            await commonPage.waitForLoadComplete();

            const allPages = await browser.pages();

            for (const currentPage of allPages) {
                const currentUrl = await currentPage.url();

                if (currentUrl.includes('https://www.youtube.com/channel/UClBM3_Zt_LebOX6UTwL1Pgg')) {
                    expect(currentUrl).toContain('youtube.com');
                }

                if (currentUrl.includes('https://www.youtube.com/channel/UClBM3_Zt_LebOX6UTwL1Pgg')) {
                    await currentPage.close();
                }
            }
        } catch (error) {
            await captureAndAttachScreenshot(page, 'url_Youtube');
            throw error;
        }
    });

    it('Footer contains expected text', async () => {

        try {

            const footerText = await commonPage.getElementText(footerpage.footerText);
            expect(footerText).toContain("Copyright © 2024 Acelab Inc. All rights reserved");

        } catch (error) {
            await captureAndAttachScreenshot(page, 'Footer_text');
            throw error;
        }
    });

    publicPages.forEach(extension => {
        it(`The "construction-details" link is as expected on the ${extension} page`, async () => {

            try {
                await commonPage.navigateTo(extension, { waitUntil: 'networkidle0' });
                await commonPage.waitForLoadComplete();

                await commonPage.refreshPage();

                await commonPage.performClick(footerpage.construction_details);

                await commonPage.refreshPage();

                await page.waitForTimeout(5000);
                const currentUrl = await commonPage.getCurrentUrl();
                expect(currentUrl).toContain('construction-details');
            } catch (error) {
                await captureAndAttachScreenshot(page, 'Footer_ConstructionDetail');
                throw error;
            }
        });
    });
})