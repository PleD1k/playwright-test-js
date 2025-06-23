const { chromium } = require('@playwright/test');
require('dotenv').config(); // только одна строка вызова

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(process.env.BASE_URL);
  await page.fill('#user-name', process.env.USERNAMETEST);
  await page.fill('#password', process.env.PASSWORD);
  await page.click('#login-button');

  await page.waitForURL('**/inventory.html');
  
  await page.context().storageState({ path: 'problem-user-state.json' });
  await browser.close();
}

module.exports = globalSetup;