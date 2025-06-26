const { test, expect } = require('@playwright/test');

test.describe('Task2', () => {
  test('New tab test', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.click('a:has-text("Click Here")')
    ]);

    await newPage.waitForLoadState();

    await expect(newPage.locator('.example')).toHaveText("New Window");
  });
});