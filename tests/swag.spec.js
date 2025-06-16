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

  test.skip('Test 1: should verify page title after login', async ({ page }) => {

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page).toHaveTitle(/Swag Labs/);
});


    test('Test 2: should add product to cart and verify cart badge', async ({ page }) => {

      await page.click('.inventory_item:first-child .btn_inventory');
      
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.fa-layers-counter.shopping_cart_badge')).toHaveText('1');
});

   test.skip('Test 3: should navigate to cart and verify product', async ({ page }) => {
     await page.click('.inventory_item:first-child .btn_inventory'); //для первого продукта
     await page.click('.shopping_cart_link.fa-layers.fa-fw');

     await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
});

   test.skip('Test 4: should complete checkout process', async ({ page }) => {
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

   test.skip('Test 5: should verify logout', async ({ page }) => {
     await page.click('.bm-burger-button');
     await page.click('#logout_sidebar_link');

     await expect(page).toHaveURL('');
   });
 });

//codgen tests. Без редактирования - как есть

 test.skip('test 1: should error when login like locked_out_user', async ({ page }) => {
   await page.goto('https://www.saucedemo.com/v1/index.html');
   await page.locator('[data-test="username"]').click();
   await page.locator('[data-test="username"]').fill('locked_out_user');
   await page.locator('[data-test="password"]').click();
   await page.locator('[data-test="password"]').fill('secret_sauce');
   await page.getByRole('button', { name: 'LOGIN' }).click();

   await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
 });

 test.skip('test 2: should add items from items page', async ({ page }) => {
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

 test.skip('test 3: should delete items from all items page', async ({ page }) => {
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

//report tests
test.describe('Sauce Demo Report Tests', () => {
  // Тест 1: Проверка заголовка страницы
  test('Test1: Check page title', async ({ page }) => {
    await page.goto('');

    await expect(page).toHaveTitle(/Swag Labs/); // Проверяем заголовок
    await expect(page).toHaveScreenshot('login-page.png'); // Проверка скриншота всей страницы
  });

  // Тест 2: Проверка логина с валидными данными
  test('Test2: should login with valid credentials', async ({ page }) => {
    await page.context().tracing.start({screenshots: true, snapshots: true});

    await page.goto('');
    await page.fill('#user-name', process.env.USERNAMETEST);
    await page.fill('#password', process.env.PASSWORD);
    await page.click('#login-button');


    await expect(page).toHaveURL(/inventory\.html/); // Проверяем URL
    await expect(page).toHaveScreenshot('inventory-page.png'); // Проверка скриншота страницы инвентаря

    await page.context().tracing.stop({path: `traces/test2-login-trace-${Date.now()}.zip`});
  });

  // Тест 3: Проверка отображения названия товара
  test('Test3: should product have a name', async ({ page }) => {
    await page.goto('');
    await page.fill('#user-name', process.env.USERNAMETEST);
    await page.fill('#password', process.env.PASSWORD);
    await page.click('#login-button');
    
    const product = page.locator('.inventory_item:first-child .inventory_item_name');
    await expect(product).toHaveText('Sauce Labs Backpack'); // Проверка текста
    await expect(product).toHaveScreenshot('product-name.png'); // Проверка скриншота элемента
  });
});
