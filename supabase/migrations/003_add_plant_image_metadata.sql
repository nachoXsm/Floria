alter table public.plants
  add column if not exists image_source text,
  add column if not exists image_attribution text,
  add column if not exists image_fetched_at timestamptz;

create index if not exists plants_missing_cover_image_idx
  on public.plants (id)
  where cover_image is null;
