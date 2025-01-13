import {
    pgTable,
    text,
    timestamp,
    varchar,
    integer,
    serial
  } from 'drizzle-orm/pg-core';
  import { relations } from 'drizzle-orm';
  
  export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    industry: text('industry').notNull(),
    name: text('name').notNull(),
    email: varchar('email').notNull().unique(),
    phone: varchar('phone').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  })
  
  export const userRelations = relations(user, ({many}) => ({
    apiKeys: many(portfolioItem)
  }))
  
  export const portfolioItem = pgTable('portfolioitem', {
    id: serial('id').primaryKey(),
    hashedKey: varchar('hashed_key').notNull().unique(),
    ownerid: integer('owner_id'),
    keyPrefix: varchar('key_prefix').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  })
  
