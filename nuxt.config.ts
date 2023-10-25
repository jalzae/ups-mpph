// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt'
require("dotenv").config();

export default defineNuxtConfig({
  app: {
    head: {
      title: "Treksistem - Solusi Suport Transportasi",
      link: [{ rel: "icon", type: "image/png", href: "/images/logo.png" }],
      meta: [
        {
          name: "description",
          content: "Aplikasi untuk mendukung bisnis kurir anda.",
        },
      ],
    },
  },
  ssr: false,
  target: "static",
  typescript: {
    strict: false,
  },
  css: ["@/assets/css/styles.css"],
  modules: ["@pinia/nuxt", "nuxt3-leaflet"],
  plugins: [{ src: "~/plugins/axios.ts" }],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  build: {
    transpile: ["browserify", "browserify-zlib"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
