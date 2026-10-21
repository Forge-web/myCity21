import { mysqlTable, int, varchar, decimal } from 'drizzle-orm/mysql-core'

export const properties = mysqlTable('properties', {
	id: int('id').autoincrement().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	price: decimal('price', { precision: 12, scale: 2 }).notNull(),
	area: decimal('area', { precision: 8, scale: 2 }),
	rooms: int('rooms'),
	address: varchar('address', { length: 255 }),
	image: varchar('image', { length: 500 }),
})