import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@nuxt/fonts', 'nuxt-auth-utils', '@nuxt/image'],
	css: ['~/assets/css/main.css'],
	vite: {
		plugins: [tailwindcss()],
	},
	app: {
		head: {
			titleTemplate: '%s — Мой город 21',
			meta: [
				{ name: 'description', content: 'Агентство недвижимости «Мой город» в Алатыре. Квартиры, дома, коммерческая недвижимость с 2009 года.' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap' },
			],
		},
	},
	nitro: {
		preset: 'node-server'
	},
	runtimeConfig: {
		databaseUrl: process.env.DATABASE_URL,
		photosDir: 'public/images'
	},
})