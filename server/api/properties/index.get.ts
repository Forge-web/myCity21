import { eq, gte, lte, and } from 'drizzle-orm'
import { properties } from '../../database/schema.ts'
import { useDb } from '~~/server/utils/db.ts'

export default defineEventHandler(async (event) => {
  const db = useDb()
  const q = getQuery(event)

  const conditions = []
//   if (q.minPrice) conditions.push(gte(properties.price, q.minPrice))
//   if (q.maxPrice) conditions.push(lte(properties.price, q.maxPrice))
//   if (q.rooms) conditions.push(eq(properties.rooms, Number(q.rooms)))

  return db!
    .select()
    .from(properties)
    // .where(conditions.length ? and(...conditions) : undefined)
    .limit(50)
})