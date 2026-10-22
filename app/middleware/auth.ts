export default defineNuxtRouteMiddleware((to, from) => {
	const { loggedIn } = useUserSession()
	
	// Если пользователь не авторизован и пытается зайти на защищенную страницу
	if (!loggedIn.value && to.path !== '/account/login' && to.path !== '/account/register') {
		return navigateTo('/account/login')
	}
})