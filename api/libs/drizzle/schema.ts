import {
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  serial,
  numeric,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User Table
export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Portfolio Item Table
export const portfolioItem = pgTable('portfolio_item', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id').notNull(), // Foreign key to user.id
  stockSymbol: varchar('stock_symbol').notNull(), // Stock ticker symbol (e.g., AAPL, TSLA)
  stockName: text('stock_name').notNull(), // Full name of the stock
  market: varchar('market').notNull(), // Market (e.g., NASDAQ, NYSE)
  shares: numeric('shares').notNull(), // Number of shares owned
  purchasePrice: numeric('purchase_price').notNull(), // Price per share at purchase
  currentPrice: numeric('current_price').notNull(), // Latest price from API
  keyPrefix: varchar('key_prefix').notNull(), // Grouping or categorization prefix
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Define Relations
export const userRelations = relations(user, ({ many }) => ({
  portfolioItems: many(portfolioItem), // One user can have many portfolio items
}));

export const portfolioItemRelations = relations(portfolioItem, ({ one }) => ({
  owner: one(user, {
    fields: [portfolioItem.ownerId], // Foreign key in portfolio_item
    references: [user.id], // References user.id
  }),
}));
