const { test, expect } = require('@playwright/test');

test.describe('Task6', () => {
  test('Check uploading txt file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.setInputFiles('#file-upload', 'tests/test-browser-action/test-data/sample.txt');
    await page.click('#file-submit');

    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
  });
});