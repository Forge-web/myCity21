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
	previewImage: z.string().nullable(),
	activity: z.boolean().nullable()
})

export default defineEventHandler(async (event) => {
	try {
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
			previewImage,
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
			previewImage,
			activity
		}).$returningId()

		setResponseStatus(event, 201);

		return { success: true, announcements: newAnnouncement?.uuid, error: null};
	} catch (e: any) {
		return {success: false, announcements: null, error: e};
	}
	
})