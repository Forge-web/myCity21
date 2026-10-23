import { mysqlTable, int, varchar, decimal, text, boolean, json } from 'drizzle-orm/mysql-core'
import generatorUUIDv4 from '../../utils/generatorUUIDv4.ts'
import { users } from './users.ts'

export const announcements = mysqlTable('announcements', {
	uuid: varchar('uuid', {length: 36}).primaryKey().$defaultFn(() => generatorUUIDv4()),
	owner_uuid: varchar('owner_uuid', {length: 36}).references(() => users.uuid),
	title: varchar('title', { length: 255 }).notNull(),
	description: text(),
	price: decimal('price', { precision: 12, scale: 2 }).notNull(),
	area: decimal('area', { precision: 8, scale: 2 }),
	rooms: int('rooms'),
	address: text().notNull(),
	images: json('images').$type<string[]>().default([]),
	activity: boolean().default(true)
})