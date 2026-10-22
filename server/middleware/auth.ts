export default defineEventHandler(async (event) => {

	const url = event.path;
	const { user } = await getUserSession(event);

	const protected_links_start_with = [
		'/api/announcements/edit'
	]

	if (user) {} 
	
	else {
		protected_links_start_with.forEach(link => {
			if (url.startsWith(link)) {
				throw createError({
					statusCode: 401,
					statusMessage: 'Unauthorized'
				})
			}
		})
	}

});