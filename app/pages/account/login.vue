<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({ login: '', password: '' })
const errorMessage = ref('')

async function login() {
	errorMessage.value = ''
	try {
		await $fetch('/api/auth/login', {
			method: 'POST',
			body: credentials,
		})
		// Обновляем сессию на клиенте и перенаправляем
		await refreshSession()
		await navigateTo('/')
	} catch (e: any) {
		errorMessage.value = e.data?.message || 'Login failed'
	}
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100">
		<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-3">
			<div class="">
				<h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
				<form @submit.prevent="login" class="space-y-4">
					<div>
						<BaseInput v-model="credentials.login" type="text" id="login" required label="Логин" />
					</div>
					<div>
						<BaseInput v-model="credentials.password" type="password" id="password" required label="Пароль"/>
					</div>
					<BaseButton type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Войти
					</BaseButton>
					<p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>
				</form>
			</div>
			<div class="">
				Нет аккаунт? <span class="text-red-600 hover:text-red-900">
					<NuxtLink to="/account/register">
						Регистрация
					</NuxtLink>
				</span>
			</div>
		</div>
	</div>
</template>