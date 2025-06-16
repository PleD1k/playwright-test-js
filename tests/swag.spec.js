import {test, expect} from "@playwright/test"
import dotenv from 'dotenv'
dotenv.config()

test.describe('UI Tests for Saucedemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.fill('#user-name', process.env.USERNAMETEST || '');
    await page.fill('#password', process.env.PASSWORD || '');
    await page.click('#login-button');
  });

  test('Test 1: should verify page title after login', async ({ page }) => {

    await expect(page).toHaveTitle(/Swag Labs/);
  });

    test('Test 2: should add product to cart and verify cart badge', async ({ page }) => {
      await page.click('.inventory_item:first-child .btn_inventory');
      
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.fa-layers-counter.shopping_cart_badge')).toHaveText('1');
  });

  test('Test 3: should navigate to cart and verify product', async ({ page }) => {
    await page.click('.inventory_item:first-child .btn_inventory'); //для первого продукта
    await page.click('.shopping_cart_link.fa-layers.fa-fw');

    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
  });

  test('Test 4: should complete checkout process', async ({ page }) => {
    await page.click('.inventory_item:first-child .btn_inventory');
    await page.click('.shopping_cart_link.fa-layers.fa-fw');
    await page.click('.btn_action.checkout_button');
    await page.fill('#first-name', 'Igor');
    await page.fill('#last-name', 'Truhanovich');
    await page.fill('#postal-code', '12345');
    await page.click('.btn_primary.cart_button');
    await page.click('.btn_action.cart_button');

    await expect(page.locator('.complete-header')).toContainText('THANK YOU FOR YOUR ORDER');
  });

  test('Test 5: should verify logout', async ({ page }) => {
    await page.click('.bm-burger-button');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL('');
  });
});

//codgen tests. Без редактирования - как есть

test('test 1: should error when login like locked_out_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});

test('test 2: should add items from items page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('link', { name: 'Sauce Labs Backpack' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();

  await expect(page.locator('#shopping_cart_container')).toContainText('1');
});

test('test 3: should delete items from all items page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'REMOVE' }).click();

  await expect(page.locator('#contents_wrapper')).toContainText('ADD TO CART');
});
