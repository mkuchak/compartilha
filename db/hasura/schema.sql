-- Postgres Schema

CREATE TABLE "user" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "inscription" varchar UNIQUE,
  "email" varchar UNIQUE NOT NULL,
  "phone" varchar UNIQUE,
  "first_name" varchar,
  "last_name" varchar,
  "picture" varchar,
  "code" varchar,
  "code_tries" int,
  "code_expires_at" timestamp NOT NULL DEFAULT NOW(),
  "longitude" varchar,
  "latitude" varchar,
  "is_active" boolean NOT NULL DEFAULT true,
  "address_id" int UNIQUE,
  "associated_id" int
);

CREATE TABLE "refresh_token" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "refresh_token" varchar NOT NULL,
  "last_ip" varchar,
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "updated_at" timestamp NOT NULL DEFAULT NOW(),
  "user_id" int UNIQUE NOT NULL
);

CREATE TABLE "institution" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "inscription" varchar UNIQUE NOT NULL,
  "company_name" varchar,
  "trading_name" varchar NOT NULL,
  "description" text,
  "picture" varchar,
  "pix_key" varchar,
  "impacted_people" int,
  "foundation_date" timestamp NOT NULL DEFAULT NOW(),
  "is_active" boolean NOT NULL DEFAULT true,
  "other_cause" varchar,
  "address_id" int UNIQUE,
  "user_id" int UNIQUE
);

CREATE TABLE "address" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "zip" varchar NOT NULL,
  "state" varchar NOT NULL,
  "city" varchar NOT NULL,
  "neighborhood" varchar NOT NULL,
  "street" varchar NOT NULL,
  "number" int NOT NULL,
  "complement" varchar
);

CREATE TABLE "cause" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "name" varchar UNIQUE NOT NULL
);

CREATE TABLE "cause_institution" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "cause_id" int NOT NULL,
  "institution_id" int NOT NULL
);

CREATE TABLE "item" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "name" varchar NOT NULL,
  "measure" varchar,
  "price" float NOT NULL,
  "category_id" int NOT NULL
);

CREATE TABLE "category" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "name" varchar UNIQUE NOT NULL
);

CREATE TABLE "item_institution" (
  "id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "item_id" int NOT NULL,
  "institution_id" int NOT NULL
);

ALTER TABLE "user" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "institution" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "institution" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("associated_id") REFERENCES "institution" ("id");

ALTER TABLE "cause_institution" ADD FOREIGN KEY ("cause_id") REFERENCES "cause" ("id");

ALTER TABLE "cause_institution" ADD FOREIGN KEY ("institution_id") REFERENCES "institution" ("id");

ALTER TABLE "item" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "item_institution" ADD FOREIGN KEY ("institution_id") REFERENCES "institution" ("id");

ALTER TABLE "item_institution" ADD FOREIGN KEY ("item_id") REFERENCES "item" ("id");
