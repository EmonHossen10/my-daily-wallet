-- =====================================================
-- Personal Expense Manager
-- Complete Supabase Database Setup
-- =====================================================


-- =====================================================
-- 1. ENABLE UUID SUPPORT
-- =====================================================

create extension if not exists "pgcrypto";


-- =====================================================
-- 2. CREATE EXPENSES TABLE
-- =====================================================

create table if not exists public.expenses (

  -- Unique ID for every expense
  id uuid primary key default gen_random_uuid(),

  -- User who created the expense
  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  -- Expense title
  title text not null,

  -- Expense amount
  amount numeric not null check (amount >= 0),

  -- Expense category
  category text not null,

  -- Date of expense
  expense_date date not null,

  -- Optional description
  description text,

  -- Record creation time
  created_at timestamptz not null default now()

);


-- =====================================================
-- 3. CREATE INDEX
-- Improves fetching expenses by user
-- =====================================================

create index if not exists expenses_user_id_idx
on public.expenses(user_id);


-- =====================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

alter table public.expenses
enable row level security;


-- =====================================================
-- 5. REMOVE OLD POLICIES IF THEY ALREADY EXIST
-- This makes the SQL easier to run again
-- =====================================================

drop policy if exists "Users can view own expenses"
on public.expenses;

drop policy if exists "Users can insert own expenses"
on public.expenses;

drop policy if exists "Users can update own expenses"
on public.expenses;

drop policy if exists "Users can delete own expenses"
on public.expenses;


-- =====================================================
-- 6. SELECT POLICY
-- READ Operation
-- Users can only see their own expenses
-- =====================================================

create policy "Users can view own expenses"

on public.expenses

for select

to authenticated

using (
  auth.uid() = user_id
);


-- =====================================================
-- 7. INSERT POLICY
-- CREATE Operation
-- Users can only create expenses for themselves
-- =====================================================

create policy "Users can insert own expenses"

on public.expenses

for insert

to authenticated

with check (
  auth.uid() = user_id
);


-- =====================================================
-- 8. UPDATE POLICY
-- UPDATE Operation
-- Users can only update their own expenses
-- =====================================================

create policy "Users can update own expenses"

on public.expenses

for update

to authenticated

using (
  auth.uid() = user_id
)

with check (
  auth.uid() = user_id
);


-- =====================================================
-- 9. DELETE POLICY
-- DELETE Operation
-- Users can only delete their own expenses
-- =====================================================

create policy "Users can delete own expenses"

on public.expenses

for delete

to authenticated

using (
  auth.uid() = user_id
);