export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // when enabling/disabling ssr option, remember to update ssr option in plugins/vuetify.ts
  ssr: true,

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: true,
    devLogs: true,
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  css: ['@mdi/font/css/materialdesignicons.css', 'vuetify/styles'],

  modules: ['@nuxt/fonts', '@nuxt/eslint'],
  plugins: [
    '@/plugins/vuetify.ts',
    '@/plugins/pinia.ts', // Заменяем store plugin на pinia
  ],
  vuetify: {
    autoImport: true,

    styles: {
      configFile: 'assets/settings.scss',
    },
  },
});
