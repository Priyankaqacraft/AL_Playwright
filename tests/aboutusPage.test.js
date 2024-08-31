import { teardown, noLoginsetup } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import LandingPage from '../pages/landingPage';
import { Paths } from '../utils/path';
import AboutUs from '../pages/aboutusPage';
import { afterAll } from '@jest/globals';


describe('AboutUs Page Tests', () => {
  let page,
    timestampUTC,
    commonPage,
    landingPage,
    aboutusPage

  beforeAll(async () => {

    const setupResults = await noLoginsetup();
    page = setupResults.page;
    timestampUTC = setupResults.timestampUTC;
    commonPage = new CommonPage(page);
    landingPage = new LandingPage(page);
    aboutusPage = new AboutUs(page);
    await page.goto(activeBaseUrl + Paths.About)
  }, 60000);


  afterAll(async () => {
    await teardown();
  });

  it('About Us Page SEO tags', async () => {

    await page.waitForSelector('h1');
    
    const h1Elements = await commonPage.getElementsByTagName('h1');
    expect(h1Elements.length).toBe(1); // Ensure exactly one h1 tag is present

    const h1Text = await commonPage.getElementsTextByTagName('h1');
    expect(h1Text.includes('About Us')).toBeTruthy();

    const pageTitle = await page.title();
    expect(pageTitle).toBe('About Acelab');

    const metaDescription = await commonPage.getMetaContentName('meta[name="description"]');
    expect(metaDescription).toBe("Acelab is the world's most detailed database of building products. Made by architects, for architects.");

    const metaViewport = await commonPage.getMetaContentName('meta[name="viewport"]');
    expect(metaViewport).toBe('width=device-width, initial-scale=1');

    const metaFormatDetection = await commonPage.getMetaContentName('meta[name="format-detection"]');
    expect(metaFormatDetection).toBe('telephone=no');

    const metaCharset = await page.$('meta[charset]');
    expect(metaCharset).not.toBeNull();

    const metaRobots = await commonPage.getMetaContentName('meta[name="robots"]');
    expect(metaRobots).toBe('index, follow');

    const metaPinterest = await commonPage.getMetaContentName('meta[name="pinterest"]');
    expect(metaPinterest).toBe('nopin');

  }, 50000);

  it('Navigate', async () => {
    await commonPage.navigateTo(Paths.About);

    await page.waitForSelector('h1');

    const h1Elements = await page.$$('h1');
    expect(h1Elements.length).toBe(1);

    const h1Text = await page.evaluate(() => document.querySelector('h1').innerText);
    expect(h1Text).toContain("About Us");

    const title = await page.title();
    expect(title).toBe("About Acelab");
  }, 50000);

});