export default defineNuxtRouteMiddleware((to, from) => {
	const { loggedIn } = useUserSession()
	
	if (!loggedIn.value && to.path !== '/account/login' && to.path !== '/account/register') {
		return navigateTo('/account/login');
	}

	if (loggedIn.value && to.path.startsWith('/account/login') && to.path.startsWith('/account/register')) {
		return navigateTo('/account');
	}
})