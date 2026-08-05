-- 005: Bitácora de jardín — tareas y registros del usuario
-- Ejecutar en Supabase → SQL Editor

create table if not exists public.garden_journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  category text not null default 'jardin',
  month int,                       -- 1..12, mes al que aplica la tarea (opcional)
  done boolean not null default false,
  notes text,                      -- resultado / cómo funcionó / plan a futuro
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.garden_journal enable row level security;

-- Solo el dueño ve y administra sus registros
create policy "garden_journal_own" on public.garden_journal
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists garden_journal_user_idx on public.garden_journal(user_id);
create index if not exists garden_journal_month_idx on public.garden_journal(month);
