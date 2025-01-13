import { defineConfig } from 'drizzle-kit';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './libs/drizzle/schema'

export const dbClient = new Client(process.env.DATABASE_URL);

export default defineConfig({
  schema: './libs/drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: process.env.NODE_ENV === 'development'
});

export const dbWithSchema = <T>(schema : T ) => {
  return drizzle(dbClient, {
      schema : schema as any
  });
};

export const drizzleSchema = drizzle(dbClient, {
  schema: schema
});