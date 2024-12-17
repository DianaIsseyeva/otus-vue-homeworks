// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup',
  testDir: './tests/e2e', // Папка с E2E тестами
  timeout: 30 * 1000, // Максимальное время выполнения теста
  expect: {
    timeout: 5000, // Максимальное время ожидания для expect
  },
  fullyParallel: true, // Запуск тестов параллельно
  retries: 0, // Количество повторов при неудаче
  reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
  use: {
    baseURL: 'http://localhost:5173/', // Замените на URL вашего приложения
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
