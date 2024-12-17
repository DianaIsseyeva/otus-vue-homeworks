import { expect, test } from '@playwright/test';

test.describe('Корзина', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="nav-cart"]');

    // Очистка корзины
    const cartItems = page.locator('[data-testid="cart-item"]');
    while ((await cartItems.count()) > 0) {
      await cartItems.nth(0).locator('[data-testid="remove-button"]').click();
    }
  });

  test('должен удалять товар из корзины', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="nav-home"]');
    await page.waitForTimeout(2000);

    await page.click('[data-testid="product-item-1"]');
    await page.waitForURL(/\/\d+$/);
    await page.waitForTimeout(2000);

    const imgSrc = await page.locator('[data-testid="product-content"] img').getAttribute('src');
    await page.click('[data-testid="add-to-cart-button"]');
    await page.click('[data-testid="nav-cart"]');
    const cartItems = page.locator('[data-testid="cart-item"]');
    await expect(cartItems).toHaveCount(1);

    // Удаляем первый товар
    await page.click('[data-testid="remove-button"]:nth-of-type(1)');

    // Проверяем, что корзина пуста
    await expect(cartItems).toHaveCount(0);
    const emptyCartMessage = page.locator('[data-testid="empty-cart"] p');
    await expect(emptyCartMessage).toHaveText('Ваша корзина пуста.');
  });

  test('должен правильно отображать несколько товаров', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="nav-home"]');
    await page.waitForTimeout(3000);

    await page.click('[data-testid="product-item-1"]');
    await page.waitForURL(/\/\d+$/);
    await page.waitForTimeout(3000);

    const productContent1 = page.locator('[data-testid="product-content"]');
    await expect(productContent1).toBeVisible();
    await expect(productContent1.locator('img')).toHaveAttribute('src', /.+/);
    await page.click('[data-testid="add-to-cart-button"]');

    await page.click('[data-testid="nav-home"]');
    await page.waitForTimeout(3000);

    await page.click('[data-testid="product-item-2"]');
    await page.waitForURL(/\/\d+$/);
    await page.waitForTimeout(3000);

    const productContent2 = page.locator('[data-testid="product-content"]');
    await expect(productContent2).toBeVisible();
    await expect(productContent2.locator('img')).toHaveAttribute('src', /.+/);

    await page.click('[data-testid="add-to-cart-button"]');

    await page.waitForTimeout(3000);
    await page.click('[data-testid="nav-cart"]');
    const cartItems = page.locator('[data-testid="cart-item"]');

    // Убедимся, что корзина содержит два товара
    await expect(cartItems).toHaveCount(2, { timeout: 3000 });

    // Проверяем названия товаров
    const productTitles = page.locator('[data-testid="cart-item"] span');
    const titleTexts = [];

    for (let i = 0; i < 2; i++) {
      const title = await productTitles.nth(i).textContent();
      titleTexts.push(title.trim());
    }

    // Проверки на непустые названия
    await expect(titleTexts.length).toBe(2);
    titleTexts.forEach(title => expect(title).not.toBe(''));
  });

  test('должен позволять оформить заказ', async ({ page }) => {
    await page.goto('/cart');
    const emptyCartMessage = page.locator('[data-testid="empty-cart"] p');
    if (!emptyCartMessage) {
      const checkoutButton = page.locator('[data-testid="checkout-button"]');
      await expect(checkoutButton).toBeVisible();

      // Кликаем по кнопке и проверяем редирект
      await checkoutButton.click();
      await expect(page).toHaveURL('/checkout');
    }
  });

  test('должен сохранять корзину при перезагрузке страницы', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="nav-home"]');
    await page.waitForTimeout(2000);

    await page.click('[data-testid="product-item-1"]');
    await page.waitForURL(/\/\d+$/);
    await page.waitForTimeout(2000);

    const imgSrc = await page.locator('[data-testid="product-content"] img').getAttribute('src');
    await page.click('[data-testid="add-to-cart-button"]');

    await page.waitForTimeout(2000);

    await page.click('[data-testid="nav-cart"]');
    const cartItems = page.locator('[data-testid="cart-item"]');
    await expect(cartItems).toHaveCount(1, { timeout: 2000 });

    // Перезагружаем страницу
    await page.reload();

    // Проверяем, что товар остался в корзине
    await expect(cartItems).toHaveCount(1, { timeout: 2000 });
  });
});
