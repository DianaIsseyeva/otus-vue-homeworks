import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['src/spec/**/*.spec.{js,ts}'], // Укажите правильный путь для тестов
    exclude: ['node_modules', 'dist', 'e2e/**/*'], // Исключите ненужные директории
    environment: 'jsdom', // Используйте jsdom для тестирования компонентов Vue
  },
});
