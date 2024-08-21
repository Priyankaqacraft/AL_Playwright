//const fs = require('fs').promises;
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { activeBaseUrl } from '../utils/config';


class CommonPage {
  constructor (page) {
    this.page = page;
  }

  async performClick (viewXPath) {
    await this.page.waitForXPath(viewXPath, { timeout: 40000 });
    const [element] = await this.page.$x(viewXPath);
    if (element) {
      await Promise.all([element.click(), this.wait(3)]);
    } else {
      throw new Error(`Element not found for XPath: ${viewXPath}`);
    }
  }

  async getElementText (viewXPath) {
    await this.page.waitForXPath(viewXPath, { timeout: 10000 });
    const [element] = await this.page.$x(viewXPath);
    if (element) {
      const text = await this.page.evaluate((el) => el.textContent, element);
      return text.trim();
    } else {
      throw new Error(`Element not found for XPath: ${viewXPath}`);
    }
  }

  async hoverOverElement(viewXPath) {
    try {
        await this.page.waitForXPath(viewXPath, { timeout: 10000 });

        const [element] = await this.page.$x(viewXPath);

        if (element) {
            await element.hover();
            
            await this.page.waitForTimeout(1000);
        } else {
            throw new Error(`Element not found for XPath: ${viewXPath}`);
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
 }

  async getElementValue (viewXPath) {
    await this.page.waitForXPath(viewXPath, { timeout: 10000 });
    const [element] = await this.page.$x(viewXPath);
    if (element) {
      const value = await this.page.evaluate((el) => el.value, element);
      return value ? value.trim() : null;
    } else {
      throw new Error(`Element not found for XPath: ${viewXPath}`);
    }
  }

  async isElementExists (viewXPath, timeout = 10000) {
    try {
      await this.page.waitForXPath(viewXPath, { timeout });
      const elements = await this.page.$x(viewXPath);
      return elements.length > 0;
    } catch (error) {
      return false;
    }
  }

  async enterText (viewXPath, text) {
    await this.page.waitForXPath(viewXPath, { timeout: 10000 });
    const [element] = await this.page.$x(viewXPath);
    if (element) {
      await element.click({ clickCount: 3 }); // Triple click to select all text
      await element.press('Backspace');
      await element.type(text);
    } else {
      throw new Error(`Element not found for XPath: ${viewXPath}`);
    }
  }

  generateRandomString (prefix = '') {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `${prefix}${randomString}`;
  }

  async wait (seconds = 5) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async clickTabWithLabel (label) {
    await this.page.waitForXPath(`//span[text()='${label}']`, { timeout: 10000 });
    const [tile] = await this.page.$x(`//span[text()='${label}']`);
    if (tile) {
      await Promise.all([tile.click()]);
    } else {
      throw new Error(`Tab with label '${label}' not found`);
    }
  }

  async createRandomNumber (rowNum) {
    return Math.floor(Math.random() * rowNum) + 1;
  }

  async getLength (viewXPath, timeout = 10000) {
    try {
      await this.page.waitForXPath(viewXPath, { timeout });
      const elements = await this.page.$x(viewXPath);
      return elements.length;
    } catch (error) {
      return 0;
    }
  }

  async getCurrentUrl(timeout = 10000) {
    try {
        //await this.page.waitForNavigation({ timeout });
        const currentUrl = await this.page.url();
        return currentUrl;
    } catch (error) {
        console.error('Error fetching the current URL:', error);
        return null;
    }
   }
  async setRandomJson (count, elementxpath, jsonName) {
    const rows = await this.getLength(elementxpath);

    // Ensure we have at least count rows
    if (rows < count) {
      throw new Error(`Not enough rows to select ${count} ${jsonName}.`);
    }

    // Create a set to keep track of unique row indices
    const selectedRows = new Set();
    while (selectedRows.size < count) {
      selectedRows.add(await this.createRandomNumber(rows));
    }

    // Retrieve region text for each selected row
    const listOfElements = [];
    for (let row of selectedRows) {
      const xpath = `(${elementxpath})[${row}]`;
      const elementText = await this.getElementText(xpath);
      console.log(elementText);
      listOfElements.push(elementText);
    }
    // Path where regions.json will be saved
    const filePath = `./data/${jsonName}.json`;

    try {
      // Convert regions array to JSON string
      const elementsJSON = JSON.stringify(listOfElements, null, 2);

      // Write regions JSON to file
      await fs.writeFile(filePath, elementsJSON);

      console.log(`Regions data saved to ${filePath}`);

      return listOfElements; // Return the regions array
    } catch (error) {
      console.error(`Error saving ${jsonName} data to ${filePath}:`, error);
      throw error; // Throw the error for handling in calling code
    }
  }

  async getAttribute (viewXPath, attributeName, timeout = 10000) {
    try {
      await this.page.waitForXPath(viewXPath, { timeout });
      const elements = await this.page.$x(viewXPath);
      if (elements.length > 0) {
        const attributeValue = await this.page.evaluate(
          (el, attr) => el.getAttribute(attr),
          elements[0],
          attributeName
        );
        return attributeValue;
      } else {
        throw new Error(`Element not found for XPath: ${viewXPath}`);
      }
    } catch (error) {
      console.error(`Failed to get attribute ${attributeName} from element with XPath ${viewXPath}:`, error);
      return null;
    }
  }

  async setDownloadBehavior (downloadPath) {
    await this.page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath,
    });
  }

  async readPDF (pdfFilePath) {
    const dataBuffer = fs.readFileSync(pdfFilePath);

    try {
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (err) {
      throw new Error(`Error parsing PDF: ${err.message}`);
    }
  }

  async isElementDisabled(viewXPath, timeout = 10000) {
    try {
      // Wait for the element to be available
      await this.page.waitForXPath(viewXPath, { timeout });
      // Find the element using XPath
      const elements = await this.page.$x(viewXPath);
      
      if (elements.length > 0) {
        // Evaluate the "disabled" attribute
        const isDisabled = await this.page.evaluate(
          (el) => el.hasAttribute('disabled'),
          elements[0]
        );
        return isDisabled;
      } else {
        throw new Error(`Element not found for XPath: ${viewXPath}`);
      }
    } catch (error) {
      return false;
    }
  }
  

  async getValuesByKey(data, key) {
    const item = data.find(element => element.key === key);
    return item ? item.values : null;
  }

  async downloadGraph(downloadButtonSelector, downloadPath,downloadFormat) {
    
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    await this.setDownloadBehavior(downloadPath);
    await this.performClick(downloadButtonSelector);

    await this.wait(25);

    const files = fs.readdirSync(downloadPath);
    console.log('Files in download directory:', files);
    

    switch (downloadFormat) {
      case 'SVG':
        const svgFile = files.find((file) => file.endsWith('.svg'));

        if (svgFile) {
          const svgFilePath = path.join(downloadPath, svgFile);
          return svgFilePath;
        } else {
          throw new Error('No SVG file found in the download directory');
        }
        break;
  
      case 'PNG':
        const pngFile = files.find((file) => file.endsWith('.png'));

        if (pngFile) {
          const pngFilePath = path.join(downloadPath, pngFile);
          return pngFilePath;
        } else {
          throw new Error('No PNG file found in the download directory');
        }
        break;
  
      case 'CSV':
        const csvFile = files.find((file) => file.endsWith('.csv'));

        if (csvFile) {
          const csvFilePath = path.join(downloadPath, csvFile);
          return csvFilePath;
        } else {
          throw new Error('No CSV file found in the download directory');
        }
        
        break;
      case 'PDF':
        const pdfFile = files.find((file) => file.endsWith('.pdf'));

        if (pdfFile) {
          const pdfFilePath = path.join(downloadPath, pdfFile);
          return pdfFilePath;
        } else {
          throw new Error('No PDF file found in the download directory');
        }
        
        break;

      default:
          throw new Error('Invalid download format specified');
    }

  }

  async getPageURL(path) {
    return activeBaseUrl+path;
  }

  /**** Methods from Basepage.cs *******/
   async getAllOpenTabUrls(context) {
    const urls = [];
    const pages = context.pages();  // Get all open pages/tabs in the context
  
    for (const page of pages) {
      urls.push(await page.url());  // Get the URL of each page/tab
    }
  
    return urls;
   }

   async navigateTo(page) {
    const url = getPageURL(path);  // Get the full URL using the provided path
    await page.goto(url);  // Navigate to the URL
    // await waitForNuxtComplete(page);  // Uncomment if you have a function to wait for Nuxt.js to complete
  }

  /*****Method for equal URL*** */
  async areEqual(expected, actual, message, ...args) {
    try {
        expect(actual).toEqual(expected);
        console.log(message, ...args);
    } catch (error) {
        console.error(message, ...args);
        throw error;
    }
}

async getAllOpenTabUrls() {
  const urls = [];
  const pages = await context.pages(); // Get all open pages (tabs)

  for (let i = 0; i < pages.length; i++) {
      const url = await pages[i].url();
      urls.push(url);
  }

  return urls;
}

}

module.exports = CommonPage;
