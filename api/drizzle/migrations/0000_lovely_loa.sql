CREATE TABLE "portfolio_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer NOT NULL,
	"stock_symbol" varchar NOT NULL,
	"stock_name" text NOT NULL,
	"market" varchar NOT NULL,
	"shares" numeric NOT NULL,
	"purchase_price" numeric NOT NULL,
	"current_price" numeric NOT NULL,
	"key_prefix" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
