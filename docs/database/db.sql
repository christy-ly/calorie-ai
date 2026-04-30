-- =============================================================
-- Calorie AI — Supabase Migration Script
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- =============================================================


-- ------------------------------------------------------------
-- Tables
-- ------------------------------------------------------------

CREATE TABLE "Food" (
  "id"          SERIAL        PRIMARY KEY,
  "name"        TEXT          NOT NULL UNIQUE,
  "calories"    INTEGER       NOT NULL,
  "protein"     DOUBLE PRECISION NOT NULL,
  "carbs"       DOUBLE PRECISION NOT NULL,
  "fat"         DOUBLE PRECISION NOT NULL,
  "servingSize" TEXT          NOT NULL,
  "createdAt"   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE "FoodEntry" (
  "id"       SERIAL           PRIMARY KEY,
  "foodId"   INTEGER          NOT NULL REFERENCES "Food"("id"),
  "loggedAt" TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
  "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1.0
);


-- ------------------------------------------------------------
-- Seed data — 25 foods
-- ------------------------------------------------------------

INSERT INTO "Food" ("name", "calories", "protein", "carbs", "fat", "servingSize") VALUES
  ('Chicken Breast',  165, 31.0,  0.0,  3.6,  '100g'),
  ('Large Egg',        72,  6.0,  0.4,  5.0,  '1 large (50g)'),
  ('Brown Rice',      216,  5.0, 45.0,  1.8,  '1 cup cooked (195g)'),
  ('Banana',          105,  1.3, 27.0,  0.4,  '1 medium (118g)'),
  ('Greek Yogurt',    100, 17.0,  6.0,  0.7,  '170g container'),
  ('Oatmeal',         150,  5.0, 27.0,  3.0,  '1 cup cooked (234g)'),
  ('Almonds',         164,  6.0,  6.0, 14.0,  '1 oz (28g)'),
  ('Peanut Butter',   190,  7.0,  7.0, 16.0,  '2 tbsp (32g)'),
  ('Avocado',         160,  2.0,  9.0, 15.0,  '1/2 fruit (100g)'),
  ('Broccoli',         55,  3.7, 11.0,  0.6,  '1 cup chopped (91g)'),
  ('Salmon (baked)',  208, 28.0,  0.0, 10.0,  '100g'),
  ('Black Beans',     227, 15.0, 41.0,  0.9,  '1 cup cooked (172g)'),
  ('Whole Milk',      149,  8.0, 12.0,  8.0,  '1 cup (244ml)'),
  ('Apple',            95,  0.5, 25.0,  0.3,  '1 medium (182g)'),
  ('Spinach',           7,  0.9,  1.1,  0.1,  '1 cup raw (30g)'),
  ('Tuna (canned)',   109, 25.0,  0.0,  0.5,  '100g drained'),
  ('Sweet Potato',    103,  2.3, 24.0,  0.1,  '1 medium (130g)'),
  ('Ground Beef 85%', 218, 22.0,  0.0, 14.0,  '100g'),
  ('Pasta (cooked)',  220,  8.0, 43.0,  1.3,  '1 cup (140g)'),
  ('Cheddar Cheese',  113,  7.0,  0.4,  9.0,  '1 oz (28g)'),
  ('Cottage Cheese',  206, 28.0,  8.0,  5.0,  '1 cup (226g)'),
  ('Blueberries',      84,  1.1, 21.0,  0.5,  '1 cup (148g)'),
  ('Orange',           62,  1.2, 15.0,  0.2,  '1 medium (131g)'),
  ('Olive Oil',       119,  0.0,  0.0, 14.0,  '1 tbsp (14g)'),
  ('White Bread',      79,  2.7, 15.0,  1.0,  '1 slice (30g)');
