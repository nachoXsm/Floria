-- 006: Traducciones de plantas (EN / PT)
-- Ejecutar en Supabase → SQL Editor

alter table public.plants
  add column if not exists common_name_en text,
  add column if not exists common_name_pt text,
  add column if not exists description_en text,
  add column if not exists description_pt text;
