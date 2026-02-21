-- ============================================================
-- NexHR — Supabase Database Schema
-- Run this in the Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── Departments ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  color       TEXT,
  head_count  INTEGER DEFAULT 0,
  budget      NUMERIC,
  manager_id  TEXT,
  icon        TEXT
);

-- ─── Employees ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS employees (
  id              TEXT PRIMARY KEY,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  phone           TEXT,
  avatar          TEXT,
  position        TEXT,
  department      TEXT REFERENCES departments(id) ON DELETE SET NULL,
  department_name TEXT,
  salary          NUMERIC,
  start_date      TEXT,
  status          TEXT CHECK (status IN ('active', 'inactive', 'on-leave', 'remote')),
  location        TEXT,
  manager         TEXT,
  skills          JSONB DEFAULT '[]'::jsonb,
  performance     NUMERIC,
  attendance_rate NUMERIC
);

-- ─── Attendance Records ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance_records (
  id            TEXT PRIMARY KEY,
  employee_id   TEXT REFERENCES employees(id) ON DELETE CASCADE,
  employee_name TEXT,
  date          TEXT NOT NULL,
  check_in      TEXT DEFAULT '',
  check_out     TEXT DEFAULT '',
  status        TEXT CHECK (status IN ('present', 'absent', 'late', 'half-day', 'remote')),
  hours_worked  NUMERIC DEFAULT 0
);

-- ─── Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_employees_status     ON employees(status);
CREATE INDEX IF NOT EXISTS idx_attendance_date       ON attendance_records(date);
CREATE INDEX IF NOT EXISTS idx_attendance_employee   ON attendance_records(employee_id);

-- ─── Row Level Security (RLS) ───────────────────────────────
-- Enable RLS on all tables
ALTER TABLE departments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees          ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users
-- (Swap for more granular policies once you add real auth)
CREATE POLICY "Allow all for authenticated users" ON departments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON employees
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON attendance_records
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow anon read-only (for the mock login flow used in this demo)
CREATE POLICY "Allow anon read" ON departments
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon read" ON employees
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon read" ON attendance_records
  FOR SELECT TO anon USING (true);

-- Allow anon write (needed because the demo uses mock OAuth, not real Supabase Auth)
-- Remove these and keep only the authenticated policies once you add real auth
CREATE POLICY "Allow anon write" ON departments
  FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon write" ON employees
  FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon write" ON attendance_records
  FOR ALL TO anon USING (true) WITH CHECK (true);
