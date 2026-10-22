import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', 'nuxt-auth-utils'],
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
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap' },
			],
		},
	},
	runtimeConfig: {
		databaseUrl: process.env.DATABASE_URL,
	},

	
})