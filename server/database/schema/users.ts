// server/database/schema.ts
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import generatorUUIDv4  from '../../utils/generatorUUIDv4.ts';

export const users = mysqlTable('users', {
	uuid: varchar('uuid', { length: 36 }).primaryKey().$defaultFn(() =>  generatorUUIDv4()),
	login: varchar('login', { length: 255 }).notNull().unique(),
	email: varchar('email', { length: 255 }).unique(),
	password: varchar('password', { length: 255 }).notNull(),
})