import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxt/icon/module'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
	plugins: [
		tailwindcss(),
	]
  },
})
