import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from '#server/database/schema'

let _db: ReturnType<typeof drizzle> | null = null

export function useDb() {
  if (!_db) {
    const config = useRuntimeConfig();
    const pool = mysql.createPool({ uri: config.databaseUrl });
    _db = drizzle(pool, {schema, mode: 'default'}) as any;
  }
  return _db
}