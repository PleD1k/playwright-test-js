const { test, expect } = require('@playwright/test');

test.describe('Task 8', () => {
  test('Check page title', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');

    const pageTitle = await page.evaluate(() => document.title);

    await expect(pageTitle).toBe('The Internet');
  });
});