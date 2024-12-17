import { expect, test } from '@playwright/test';

test.describe('Корзина', () => {
  test.beforeEach(async ({ page }) => {
    // Перейдите на главную страницу вашего приложения
    await page.goto('/'); // Использует baseURL из конфигурации

    // Добавьте первый товар в корзину
    // Убедитесь, что кнопка имеет уникальный data-testid, например data-testid="add-to-cart-button-1"
    await page.click('[data-testid="add-to-cart-button-1"]');

    // Переходим в корзину
    await page.click('[data-testid="nav-cart"]'); // Селектор из Nav.vue
  });

  test('должен правильно рассчитывать сумму при изменении количества товара', async ({ page }) => {
    // Проверяем, что товар добавлен в корзину
    const cartItems = page.locator('[data-testid="cart-item"]');
    await expect(cartItems).toHaveCount(1);

    // Проверяем начальное количество и цену
    const quantityInput = page.locator('[data-testid="quantity-input"]');
    await expect(quantityInput).toHaveValue('1'); // Предполагаем начальное количество 1

    const priceElement = page.locator('.cart-table tbody tr td:nth-child(3)');
    const totalPriceElement = page.locator('[data-testid="total-price"]');

    // Получаем начальную цену
    const initialPriceText = await priceElement.textContent();
    const initialPrice = parseFloat(initialPriceText?.replace(/[^0-9.]/g, '') || '0');

    // Получаем начальную общую сумму
    const initialTotalPriceText = await totalPriceElement.textContent();
    const initialTotalPrice = parseFloat(initialTotalPriceText?.replace(/[^0-9.]/g, '') || '0');

    expect(initialTotalPrice).toBe(initialPrice); // Изначально количество 1

    // Изменяем количество на 3
    await quantityInput.fill('3');

    // Проверяем обновленную общую сумму
    await expect(totalPriceElement).toHaveText(`${(initialPrice * 3).toLocaleString()} $.`);

    // Проверяем, что общее количество товаров обновилось
    const totalQuantityElement = page.locator('[data-testid="total-quantity"]');
    await expect(totalQuantityElement).toHaveText('3');
  });

  test('должен отображать сообщение о пустой корзине после очистки', async ({ page }) => {
    // Очищаем корзину
    await page.click('[data-testid="clear-cart-button"]');

    // Проверяем, что корзина пуста
    const emptyCartMessage = page.locator('[data-testid="empty-cart"] p');
    await expect(emptyCartMessage).toHaveText('Ваша корзина пуста.');

    // Проверяем, что ссылка "Продолжить покупки" присутствует
    const continueShoppingLink = page.locator('[data-testid="continue-shopping-link"]');
    await expect(continueShoppingLink).toBeVisible();
  });
});
