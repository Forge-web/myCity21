<script setup lang="ts">
import AppToaster from '~/components/Toast/AppToaster.vue';

// auth: замените на ваш composable
const { user, clear } = useUserSession()

const nav = [
  { label: 'Обзор', to: '/account', icon: '🏠' },
  { label: 'Избранное', to: '/cabinet/favorites', icon: '❤️' },
  { label: 'Мои объявления', to: '/account/announcements', icon: '📩' },
  { label: 'Настройки', to: '/account/settings', icon: '⚙️' },
]

async function logout() {
	await clear()
	await navigateTo('/')
}
</script>

<template>
	<ClientOnly>
		<AppToaster />
	</ClientOnly>
	
	<div class="flex flex-col min-h-screen bg-gray-50">
		<AppHeader />

		<div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
			<div class="grid gap-6 lg:grid-cols-[260px_1fr]">

				<aside class="lg:sticky lg:top-24 h-fit">
					<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
					<div class="flex items-center gap-3 pb-5 border-b border-gray-100">
						<div class="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-lg">
							{{ user?.login?.charAt(0)?.toUpperCase() ?? 'U' }}
						</div>
						<div class="min-w-0">
							<p class="font-semibold text-gray-900 truncate">{{ user?.login ?? 'Пользователь' }}</p>
						</div>
					</div>

					<nav class="mt-4 flex flex-col gap-1">
						<NuxtLink
						v-for="item in nav"
						:key="item.to"
						:to="item.to"
						class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
						active-class="bg-brand-50 text-brand-700 hover:bg-brand-50"
						>
						<span class="text-base">{{ item.icon }}</span>
							{{ item.label }}
						</NuxtLink>
					</nav>

					<div class="mt-5 pt-5 border-t border-gray-100">
						<BaseButton variant="ghost" size="sm" block @click="logout">
							Выйти
						</BaseButton>
					</div>
					</div>
				</aside>

				<!-- Content -->
				<div class="min-w-0 flex flex-col justify-center items-center text-center">
					<div class="flex flex-col max-w-7xl w-max">
						<slot />
					</div>
				</div>
			</div>
		</div>
		
		<AppFooter />
	</div>
	
</template>