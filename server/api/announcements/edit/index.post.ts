import { eq, and } from 'drizzle-orm';
import { announcements } from '~~/server/database/schema';
import { useDb } from '#server/utils/db';


export default defineEventHandler(async (event) => {
	
	

	const db = useDb();
	const { user } = await getUserSession(event);

	
	return db!
		.select()
		.from(announcements)
		.where(and(
			eq(announcements.owner_uuid, user!.uuid),
			eq(announcements.activity, true)
		))
		.limit(50)


});