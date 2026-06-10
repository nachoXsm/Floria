-- 004: Columnas para ubicación, color de floración y compatibilidad de diseño
-- Ejecutar en Supabase → SQL Editor antes de llamar a /api/admin/import-plants

alter table public.plants
  add column if not exists ubicacion text,
  add column if not exists plant_type text,
  add column if not exists flower_colors text[] default '{}',
  add column if not exists design_compatibility text[] default '{}',
  add column if not exists sowing_season text,
  add column if not exists region text,
  add column if not exists is_native boolean default false,
  add column if not exists companion_plants text;

create index if not exists plants_flower_colors_idx on public.plants using gin(flower_colors);
create index if not exists plants_design_compat_idx on public.plants using gin(design_compatibility);
create index if not exists plants_is_native_idx on public.plants(is_native);
