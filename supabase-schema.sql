-- ============================================================
-- BusinessDash — Supabase / PostgreSQL schema
-- Run this in the Supabase SQL editor to create all tables.
-- ============================================================

-- --------------------------------------------------------
-- 1. users
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id             SERIAL PRIMARY KEY,
  name           TEXT        NOT NULL,
  email          TEXT        NOT NULL UNIQUE,
  password_hash  TEXT        NOT NULL,
  role           TEXT        NOT NULL DEFAULT 'user',
  status         TEXT        NOT NULL DEFAULT 'active',
  avatar         TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 2. products
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  name        TEXT             NOT NULL,
  description TEXT,
  price       NUMERIC(10, 2)   NOT NULL,
  category    TEXT             NOT NULL,
  stock       INTEGER          NOT NULL DEFAULT 0,
  status      TEXT             NOT NULL DEFAULT 'active',
  created_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 3. customers
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
  id               SERIAL PRIMARY KEY,
  name             TEXT            NOT NULL,
  email            TEXT            NOT NULL UNIQUE,
  phone            TEXT,
  company          TEXT,
  status           TEXT            NOT NULL DEFAULT 'active',
  total_purchases  NUMERIC(12, 2)  NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 4. posts
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
  id          SERIAL PRIMARY KEY,
  title       TEXT        NOT NULL,
  content     TEXT        NOT NULL,
  category    TEXT        NOT NULL DEFAULT 'general',
  status      TEXT        NOT NULL DEFAULT 'draft',
  author_name TEXT        NOT NULL DEFAULT 'Admin',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 5. activity
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity (
  id          SERIAL PRIMARY KEY,
  type        TEXT        NOT NULL,
  description TEXT        NOT NULL,
  entity_name TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- Trigger: auto-update updated_at on row changes
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- --------------------------------------------------------
-- Indexes for common query patterns
-- --------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_users_email    ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role     ON users (role);
CREATE INDEX IF NOT EXISTS idx_users_status   ON users (status);

CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_status   ON products (status);

CREATE INDEX IF NOT EXISTS idx_customers_email  ON customers (email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers (status);

CREATE INDEX IF NOT EXISTS idx_posts_status   ON posts (status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts (category);

CREATE INDEX IF NOT EXISTS idx_activity_type       ON activity (type);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity (created_at DESC);

-- --------------------------------------------------------
-- Seed data (optional — remove if you don't want demo data)
-- --------------------------------------------------------

-- Admin user  (password: admin123)
-- Hash format: salt:sha256(password+salt) — matches the app's hashPassword()
INSERT INTO users (name, email, password_hash, role, status) VALUES
  ('Admin User',    'admin@empresa.com',   'seed_salt_admin:placeholder_run_app_to_seed', 'admin',   'active'),
  ('Jane Manager',  'jane@empresa.com',    'seed_salt_jane:placeholder_run_app_to_seed',  'manager', 'active'),
  ('Bob Employee',  'bob@empresa.com',     'seed_salt_bob:placeholder_run_app_to_seed',   'user',    'active')
ON CONFLICT (email) DO NOTHING;

-- NOTE: The password_hash values above are placeholders.
-- The real hashed passwords are generated by the Node.js crypto module
-- when the API server first starts (seedIfEmpty).
-- To get real hashes, start the API server against this DB and it will
-- seed itself automatically if the users table is empty.

INSERT INTO products (name, description, price, category, stock, status) VALUES
  ('Laptop Pro X',   'High-performance laptop', 1299.99, 'Electronics', 45, 'active'),
  ('Wireless Mouse', 'Ergonomic wireless mouse',   29.99, 'Electronics', 120, 'active'),
  ('Standing Desk',  'Height-adjustable desk',    449.99, 'Furniture',   18, 'active'),
  ('Office Chair',   'Lumbar support chair',       299.99, 'Furniture',   32, 'active'),
  ('Monitor 27"',    '4K UHD display',             599.99, 'Electronics',  8, 'active')
ON CONFLICT DO NOTHING;

INSERT INTO customers (name, email, phone, company, status, total_purchases) VALUES
  ('Alice Corp',   'alice@corp.com',   '+1-555-0101', 'Corp Inc.',    'active', 12500.00),
  ('Bob Ventures', 'bob@ventures.com', '+1-555-0102', 'Ventures LLC', 'active',  8750.50),
  ('Carol Studio', 'carol@studio.com', '+1-555-0103', 'Studio Co.',   'active',  3200.00)
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (title, content, category, status, author_name) VALUES
  ('Welcome to BusinessDash', 'Our new platform is live!',         'announcement', 'published', 'Admin User'),
  ('Q1 Sales Report',         'Sales exceeded targets by 15%.',    'report',       'published', 'Admin User'),
  ('Product Roadmap 2026',    'Here is what we are building next.','planning',     'draft',     'Admin User')
ON CONFLICT DO NOTHING;

INSERT INTO activity (type, description, entity_name) VALUES
  ('user_created',     'New user registered',     'Alice Smith'),
  ('product_created',  'New product added',        'Laptop Pro X'),
  ('customer_created', 'New customer onboarded',   'Corp Inc.'),
  ('post_published',   'Post published',           'Welcome to BusinessDash'),
  ('user_updated',     'User profile updated',     'Bob Employee')
ON CONFLICT DO NOTHING;
