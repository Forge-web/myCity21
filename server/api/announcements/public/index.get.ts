import { eq, gte, lte, and } from 'drizzle-orm'
import { announcements } from '#server/database/schema/announcements'
import { useDb } from '#server/utils/db'

export default defineEventHandler(async (event) => {
	const db = useDb()
	const q = getQuery(event)

	const conditions = []
	if (q.minPrice) conditions.push(gte(announcements.price, q.minPrice))
	if (q.maxPrice) conditions.push(lte(announcements.price, q.maxPrice))
	if (q.rooms) conditions.push(eq(announcements.rooms, Number(q.rooms)))
	
	conditions.push(eq(announcements.activity, true))

	return db!
		.select()
		.from(announcements)
		.where(conditions.length ? and(...conditions) : undefined)
		.limit(50)
})