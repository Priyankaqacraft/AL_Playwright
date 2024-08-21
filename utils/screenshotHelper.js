import { addAttach } from 'jest-html-reporters/helper';

export const captureAndAttachScreenshot = async (page, description) => {
  const screenshotBuffer = await page.screenshot({ fullPage: true });
  const url = page.url();
  const descriptionWithUrl = `${description}\nPage URL: ${url}`;
  await addAttach({ attach: screenshotBuffer, description:descriptionWithUrl });
};
