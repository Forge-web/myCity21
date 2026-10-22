export default defineNuxtRouteMiddleware((to, from) => {
	const { loggedIn } = useUserSession()
	
	if (!loggedIn.value && to.path !== '/account/login' || to.path !== '/account/register') {
		return navigateTo('/account/login');
	}
})