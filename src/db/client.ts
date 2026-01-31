import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let pool: mysql.Pool | null = null;

export function createDb(connectionString: string) {
  if (!pool) {
    pool = mysql.createPool({
      uri: connectionString,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return drizzle(pool, { schema, mode: 'default' });
}

export type Database = ReturnType<typeof createDb>;
