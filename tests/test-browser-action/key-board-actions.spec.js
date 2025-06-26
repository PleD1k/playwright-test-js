const { test, expect } = require('@playwright/test');

test.describe('Task4', () => {
  test('test1: Check key-board action', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    const result = page.locator('#result')
    page.keyboard.press('Control')

    expect(result).toHaveText('You entered: CONTROL');

  });

  test('test2:Check key-board name fielld', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    const result = page.locator('#result')

    await page.locator('#target').click();
    page.keyboard.press('I');
    page.keyboard.press('G');
    page.keyboard.press('O');
    page.keyboard.press('R');

    expect(result).toHaveText('You entered: R');
  });
});