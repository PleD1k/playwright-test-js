const { test, expect } = require('@playwright/test');

test.describe('Task7', () => {
  test('Check drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain("I am a JS Confirm");
      await dialog.accept();
    })

    await page.click('button:has-text("Click for JS Confirm")')
    await expect(page.locator('#result')).toHaveText('You clicked: Ok')
  });
});
