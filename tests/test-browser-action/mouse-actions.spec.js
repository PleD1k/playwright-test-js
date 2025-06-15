const { test, expect } = require('@playwright/test');

test.describe('Task3', () => {
  test('Check mouse action text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    const figure = page.locator('.figure').nth(0);
    const box = await figure.boundingBox();

    if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y +box.height / 2);
        await page.waitForTimeout(3000);
        const link = figure.locator('a:has-text("View profile")');
        await expect(link).toBeVisible();
    }
  });
});