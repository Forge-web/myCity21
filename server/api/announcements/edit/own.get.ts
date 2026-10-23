import { users } from '#server/database/schema/users';
import { useDb } from '#server/utils/db';
import { eq } from 'drizzle-orm';
import { announcements } from '~~/server/database/schema';

const db = useDb();


export default defineEventHandler(async (event) => {
	const { user } = await getUserSession(event);
	return db!
		.select()
		.from(announcements)
		.where(eq(announcements.owner_uuid, user.uuid))
		.limit(50)
})