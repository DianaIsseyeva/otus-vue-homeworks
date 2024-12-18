import { expect, test } from '@playwright/test';

test.describe('Форма Логина', () => {
  test.beforeEach(async ({ page }) => {
    // Перейдите на страницу логина
    await page.goto('/login'); // Предположим, что маршрут для логина - /login
  });

  test('успешный вход', async ({ page }) => {
    // Введите логин
    await page.fill('[data-testid="login-input"]', 'testuser');

    // Введите пароль
    await page.fill('[data-testid="password-input"]', 'password123');

    // Нажмите кнопку "Войти"
    await page.click('[data-testid="login-submit"]');

    // Ожидание перенаправления на главную страницу
    await expect(page).toHaveURL('/');
  });

  test('вход с пустыми полями', async ({ page }) => {
    // Нажмите кнопку "Войти" без ввода данных
    await page.click('[data-testid="login-submit"]');

    // Проверяем, что отображаются сообщения об ошибках
    const loginError = page.locator('[data-testid="login-error"]');
    const passwordError = page.locator('[data-testid="password-error"]');

    await expect(loginError).toHaveText('Введите логин');
    await expect(passwordError).toHaveText('Введите пароль');
  });
});
