import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Page } from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function captureFailure(page: Page, testName: string) {
  const dir = path.resolve(__dirname, 'failures');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const safeName = testName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  // Screenshot
  const screenshotPath = path.join(dir, `${safeName}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved failure screenshot to: ${screenshotPath}`);

  // DOM HTML
  const htmlPath = path.join(dir, `${safeName}.html`);
  const htmlContent = await page.content();
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`Saved failure DOM snapshot to: ${htmlPath}`);
}
