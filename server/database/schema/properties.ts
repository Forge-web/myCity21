import { mysqlTable, int, varchar, decimal, text } from 'drizzle-orm/mysql-core'
import generatorUUIDv4 from '../../utils/generatorUUIDv4.ts'

export const properties = mysqlTable('properties', {
	uuid: varchar('uuid', {length: 36}).primaryKey().$defaultFn(() => generatorUUIDv4()),
	title: varchar('title', { length: 255 }).notNull(),
	description: text(),
	price: decimal('price', { precision: 12, scale: 2 }).notNull(),
	area: decimal('area', { precision: 8, scale: 2 }),
	rooms: int('rooms'),
	address: text().notNull(),
	image: text(),
})