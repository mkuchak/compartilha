CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "phone" varchar UNIQUE,
  "password" varchar,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "longitude" varchar,
  "latitude" varchar,
  "last_ip" varchar,
  "last_login" timestamp,
  "is_admin" boolean NOT NULL DEFAULT false,
  "is_super_admin" boolean NOT NULL DEFAULT false,
  "is_active" boolean NOT NULL DEFAULT true,
  "address_id" int,
  "institution_id" int,
  "associated_id" int
);

CREATE TABLE "institution" (
  "id" int PRIMARY KEY,
  "company_name" varchar,
  "trading_name" varchar NOT NULL,
  "description" varchar,
  "pix_key" varchar,
  "impacted_people" int,
  "foundation_date" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "other_cause" varchar,
  "address_id" int
);

CREATE TABLE "address" (
  "id" int PRIMARY KEY,
  "cep" varchar NOT NULL,
  "state" varchar NOT NULL,
  "city" varchar NOT NULL,
  "neighborhood" varchar NOT NULL,
  "street" varchar NOT NULL,
  "number" int NOT NULL,
  "complement" varchar NOT NULL
);

CREATE TABLE "cause" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "cause_institution" (
  "id" int PRIMARY KEY,
  "cause_id" int NOT NULL,
  "institution_id" int NOT NULL
);

CREATE TABLE "item" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL,
  "price" int,
  "category_id" int NOT NULL
);

CREATE TABLE "category" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "item_institution" (
  "id" int PRIMARY KEY,
  "item_id" int NOT NULL,
  "institution_id" int NOT NULL
);

ALTER TABLE "user" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");
ALTER TABLE "institution" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");
ALTER TABLE "user" ADD FOREIGN KEY ("institution_id") REFERENCES "institution" ("id");
ALTER TABLE "user" ADD FOREIGN KEY ("associated_id") REFERENCES "institution" ("id");
ALTER TABLE "cause_institution" ADD FOREIGN KEY ("institution_id") REFERENCES "institution" ("id");
ALTER TABLE "cause_institution" ADD FOREIGN KEY ("cause_id") REFERENCES "cause" ("id");
ALTER TABLE "item" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");
ALTER TABLE "item_institution" ADD FOREIGN KEY ("item_id") REFERENCES "item" ("id");
ALTER TABLE "item_institution" ADD FOREIGN KEY ("institution_id") REFERENCES "institution" ("id");
