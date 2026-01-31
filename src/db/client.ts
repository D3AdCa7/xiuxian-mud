import { drizzle } from 'drizzle-orm/tidb-serverless';
import { connect } from '@tidbcloud/serverless';
import * as schema from './schema';

export function createDb(connectionString: string) {
  const client = connect({ url: connectionString });
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof createDb>;
