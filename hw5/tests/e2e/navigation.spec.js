import { test, expect } from '@playwright/test';

test.describe('Навигация', () => {
  test.beforeEach(async ({ page }) => {
    // Перейдите на главную страницу
    await page.goto('/');
  });

  test('навигация между страницами', async ({ page }) => {
    // Кликните на ссылку "Login"
    await page.click('[data-testid="nav-login"]');
    await expect(page).toHaveURL('/login');

    // Вернитесь на главную страницу
    await page.click('[data-testid="nav-home"]');
    await expect(page).toHaveURL('/');

    // Кликните на ссылку "Create Product"
    // await page.click('[data-testid="nav-create-product"]');
    // await expect(page).toHaveURL('/create-product');

    // Вернитесь на главную страницу
    await page.click('[data-testid="nav-home"]');
    await expect(page).toHaveURL('/');

    // Кликните на корзину
    await page.click('[data-testid="nav-cart"]');
    await expect(page).toHaveURL('/cart');
  });
});
