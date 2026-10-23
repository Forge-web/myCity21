import { z } from 'zod';
import { users } from '#server/database/schema/users'
import decimal from '#shared/utils/zod/decimal'
import { announcements } from '~~/server/database/schema';


const db = useDb();
const bodySchema = z.object({
	title: z.string(),
	description: z.string().nullable(),
	price: decimal,
	area: decimal.nullable(),
	rooms: z.int().nullable(),
	address: z.string(),
	images: z.string().array().nullable(),
	activity: z.boolean().nullable()
})

export default defineEventHandler(async (event) => {
	const { user } = await getUserSession(event);

	const owner_uuid = user!.uuid;

	const { 
		title, 
		description, 
		price, 
		area, 
		rooms, 
		address, 
		images, 
		activity 
	} = await readValidatedBody(event, bodySchema.parse);
	

	const [newAnnouncement] = await db!.insert(announcements).values({
		owner_uuid,
		title,
		description, 
		price, 
		area, 
		rooms, 
		address, 
		images, 
		activity
	}).$returningId()

	console.log(newAnnouncement)

	return { success: true, announcements: newAnnouncement?.uuid}
})