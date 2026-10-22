import { properties } from '~~/server/database/schema/properties.ts';
import { eq } from 'drizzle-orm';

export default defineEventHandler( async (event) => {
	const uuid = String(getRouterParam(event, 'uuid'));
	const db = useDb();
	return await db?.select()
		.from(properties)
		.where(eq(properties.uuid, uuid));
		
})