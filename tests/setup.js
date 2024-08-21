// setup.js
import puppeteer from 'puppeteer';
import { performLogins } from '../utils/logins';
import { activeBaseUrl ,acelabAdminCredentials,acelabRegressionCredentials} from '../utils/config';


let browser, page;
const now = new Date();
const startOfDayUTC = 'QARey3';
const timestampUTC = startOfDayUTC;


export const setup = async (loginType = 'admin') => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--start-maximized',
      '--force-device-scale-factor=1.0'
  ],
  });

  page = await browser.newPage();
  await page.setViewport({ width: 1880, height: 881 });
  await performLogins(page,loginType);
  return { browser, page, timestampUTC };
};

export const noLoginsetup = async (loginType = 'admin') => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--start-maximized',
      '--force-device-scale-factor=1.0'
  ],
  });

  page = await browser.newPage();
  await page.setViewport({ width: 1880, height: 881 });
  return { browser, page, timestampUTC };
};


export const mfgsetup = async (loginType = 'mfgRep') => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--start-maximized',
      '--force-device-scale-factor=1.0'
  ],
  });

  page = await browser.newPage();
  await page.setViewport({ width: 1880, height: 881 });
  await performLogins(page,loginType);
  return { browser, page, timestampUTC };
};

export const regressionsetup = async (loginType = 'regression') => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--start-maximized',
      '--force-device-scale-factor=1.0'
  ],
  });

  page = await browser.newPage();
  await page.setViewport({ width: 1880, height: 881 });
  await performLogins(page,loginType);
  return { browser, page, timestampUTC };
};




export const teardown = async () => {
  await browser.close();
};
