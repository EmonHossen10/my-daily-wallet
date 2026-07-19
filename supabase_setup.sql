-- Personal Expense Manager - Supabase Setup

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  amount numeric not null,
  category text not null,
  expense_date date not null,
  description text,
  created_at timestamptz default now()
);

alter table public.expenses enable row level security;

create policy "Users can view own expenses"
  on public.expenses for select
  using (auth.uid() = user_id);

create policy "Users can insert own expenses"
  on public.expenses for insert
  with check (auth.uid() = user_id);

create policy "Users can update own expenses"
  on public.expenses for update
  using (auth.uid() = user_id);

create policy "Users can delete own expenses"
  on public.expenses for delete
  using (auth.uid() = user_id);
*** Add File: README.md
# Personal Expense Manager

Simple React + Vite + Supabase expense tracker.

## Setup

1. `bun install` (or `npm install`)
2. Copy `.env.example` to `.env` and add your Supabase URL and anon key.
3. Run the SQL in `supabase_setup.sql` on your Supabase project.
4. `bun run dev`

## Stack

React, React Router DOM, Tailwind CSS, DaisyUI, Supabase.