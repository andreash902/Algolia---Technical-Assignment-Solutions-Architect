export default defineNuxtConfig({
  head: {
    titleTemplate: '%',
    title: 'Algolia Client UI Demo',
  },
  css: [
    '~/assets/style.css', // Keeps your custom styles
  ],
  modules: ['@nuxtjs/algolia', '@nuxt/image'],
  algolia: {
    instantSearch: {
      theme: 'algolia'
    }
  },
  plugins: [
    '~/plugins/fontawesome.js' 
  ]
} as any);