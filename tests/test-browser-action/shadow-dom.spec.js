const { test, expect } = require('@playwright/test');

test.describe('Task1', () => {
  test('Check search text in shadow-dom', async ({ page }) => {
    await page.goto('https://books-pwakit.appspot.com/');

    const searchTextLocator = await page.locator('.books-desc');

    await expect(searchTextLocator).toBeVisible();
    await expect(searchTextLocator).toHaveText("Search the world's most comprehensive index of full-text books.");
  });
});