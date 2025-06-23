const { test, expect } = require('./fixtures');

test.describe('Problem User Tests', () => {
  test('empty cart on start @problem', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });

  test.skip('skipped test', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  const pages = [
    { path: '/inventory.html', name: 'Inventory', locator: '.inventory_list' },
    { path: '/cart.html', name: 'Cart', locator: '.cart_list' },
  ];

  for (const { path, name, locator } of pages) {
    test(`navigate to ${name} page`, async ({ page }) => {
      await page.goto(path);

      await expect(page.locator(locator)).toBeVisible();
    });
  }

  test('logout displays login logo', async ({ page }) => {
    await page.goto('/inventory.html');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await page.waitForURL('/');

    await expect(page.locator('.login_logo')).toBeVisible();
  });

  test('add item to cart @problem', async ({ page, testIdGenerator }) => {
    await page.goto('/inventory.html');
    const addButton = page.locator('.inventory_item .btn_inventory').first();
    console.log(`Adding item with test ID: ${testIdGenerator}`);
    await addButton.click();
    
    await expect(addButton).toHaveText('Remove');
  });
});