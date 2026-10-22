import { announcements } from '~~/server/database/schema/announcements';
import { eq } from 'drizzle-orm';

export default defineEventHandler( async (event) => {
	const uuid = String(getRouterParam(event, 'uuid'));
	const db = useDb();
	return await db?.select()
		.from(announcements)
		.where(eq(announcements.uuid, uuid));
		
})