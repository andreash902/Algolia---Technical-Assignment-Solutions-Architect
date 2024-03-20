export default defineNuxtConfig({
  head: {
    titleTemplate: '%',
    title: 'Algolia Client UI Demo',
  },
  css: [
    '~/assets/style.css', 
  ],
  modules: ['@nuxtjs/algolia', '@nuxt/image'],
  algolia: {
    instantSearch: {
      theme: 'algolia'
    }
  },
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/algolia-insights.js' 
 
  ]
} as any);