import { expect, test } from '@playwright/test';

test.describe('Оформление Заказа', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="nav-cart"]');
    const cartItems = page.locator('[data-testid="cart-item"]');
    const itemCount = await cartItems.count();
    if (itemCount > 0) {
      for (let i = 0; i < itemCount; i++) {
        await cartItems.nth(0).locator('[data-testid="remove-button"]').click();
        await expect(cartItems.nth(0)).toBeHidden();
      }
    }

    await page.click('[data-testid="nav-home"]');
    await page.click('[data-testid="product-item-1"]');
    await page.click('[data-testid="add-to-cart-button"]');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
  });

  test('успешное оформление заказа с предоплатой', async ({ page }) => {
    // Переход в корзину
    await page.click('[data-testid="nav-cart"]');
    await page.click('[data-testid="checkout-button"]');
    await expect(page).toHaveURL(/\/checkout$/);

    // Заполнение формы
    await page.fill('[data-testid="checkout-firstName"]', 'Иван');
    await page.fill('[data-testid="checkout-lastName"]', 'Иванов');
    await page.fill('[data-testid="checkout-email"]', 'ivan@example.com');
    await page.fill('[data-testid="checkout-phone"]', '1234567890');
    await page.fill('[data-testid="checkout-city"]', 'Москва');
    await page.fill('[data-testid="checkout-street"]', 'Ленина');
    await page.fill('[data-testid="checkout-house"]', '10');
    await page.fill('[data-testid="checkout-apartment"]', '5');

    // Выбор доставки и предоплаты
    await page.check('[data-testid="checkout-delivery-courier"]');
    await page.check('[data-testid="checkout-payment-online"]');

    // Проверка видимости полей карты
    await expect(page.locator('[data-testid="checkout-cardHolder"]')).toBeVisible();
    await page.fill('[data-testid="checkout-cardHolder"]', 'Ivan Ivanov');
    await page.fill('[data-testid="checkout-cardNumber"]', '1234567812345678');
    await page.fill('[data-testid="checkout-expiryDate"]', '12/25');
    await page.fill('[data-testid="checkout-cvc"]', '123');

    // Согласие с правилами
    await page.check('[data-testid="checkout-agreement"]');
    await expect(page.locator('[data-testid="checkout-agreement"]')).toBeChecked();

    // Отправка формы
    await page.click('[data-testid="checkout-submit"]');

    // Ожидание перенаправления на главную
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');

    // Проверка, что корзина пуста
    await page.click('[data-testid="nav-cart"]');
    const emptyCartMessage = page.locator('[data-testid="empty-cart"] p');
    await expect(emptyCartMessage).toHaveText('Ваша корзина пуста.');
  });

  test('проверка ошибок при незаполненной форме', async ({ page }) => {
    // Переход в корзину
    await page.click('[data-testid="nav-cart"]');
    await page.click('[data-testid="checkout-button"]');
    await expect(page).toHaveURL(/\/checkout$/);

    // Нажатие на кнопку отправки формы без заполнения
    await page.click('[data-testid="checkout-submit"]');

    // Проверка сообщений об ошибках
    await expect(page.locator('[data-testid="checkout-firstName-error"]')).toHaveText('Введите имя');
    await expect(page.locator('[data-testid="checkout-lastName-error"]')).toHaveText('Введите фамилию');
    await expect(page.locator('[data-testid="checkout-email-error"]')).toHaveText('Введите email');
    await expect(page.locator('[data-testid="checkout-phone-error"]')).toHaveText('Введите телефон');
    await expect(page.locator('[data-testid="checkout-city-error"]')).toHaveText('Введите город');
    await expect(page.locator('[data-testid="checkout-street-error"]')).toHaveText('Введите улицу');
    await expect(page.locator('[data-testid="checkout-house-error"]')).toHaveText('Введите номер дома');
    await expect(page.locator('[data-testid="checkout-apartment-error"]')).toHaveText('Введите номер квартиры');
    await expect(page.locator('[data-testid="checkout-delivery-error"]')).toHaveText('Выберите способ доставки');
    await expect(page.locator('[data-testid="checkout-payment-error"]')).toHaveText('Выберите способ оплаты');
    await expect(page.locator('[data-testid="checkout-agreement-error"]')).toHaveText(
      'Вы должны согласиться с правилами обработки заказов'
    );
  });
});
