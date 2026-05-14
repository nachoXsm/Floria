-- ============================================================
-- Floria MVP - Schema principal (corregido)
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- ENUM TYPES
create type care_level as enum ('easy', 'moderate', 'expert');
create type light_requirement as enum ('full_sun', 'partial_shade', 'shade', 'indirect');
create type water_frequency as enum ('daily', 'twice_week', 'weekly', 'biweekly', 'monthly');
create type growth_speed as enum ('slow', 'moderate', 'fast');
create type garden_style as enum ('mediterranean', 'tropical', 'minimal', 'natural', 'formal', 'cottage');
create type plan_type as enum ('free', 'pro', 'professional');
create type subscription_status as enum ('active', 'canceled', 'past_due', 'trialing');

-- PLANTS
create table plants (
  id uuid primary key default uuid_generate_v4(),
  scientific_name text not null unique,
  common_name text not null,
  common_names text[] default '{}',
  family text,
  origin text[],
  description text,
  uses text[],
  care_level care_level default 'moderate',
  light light_requirement not null,
  water water_frequency not null,
  humidity_min int,
  humidity_max int,
  temp_min_c numeric(4,1),
  temp_max_c numeric(4,1),
  height_min_cm int,
  height_max_cm int,
  growth_speed growth_speed,
  evergreen boolean default true,
  flowering boolean default false,
  flowering_months int[],
  indoor boolean default false,
  outdoor boolean default false,
  pot_suitable boolean default true,
  soil_types text[] default '{}',
  hardiness_zones text[],
  garden_styles garden_style[] default '{}',
  cover_image text,
  images text[] default '{}',
  tags text[] default '{}',
  slug text unique,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index plants_common_name_idx on plants using gin(to_tsvector('spanish', common_name || ' ' || scientific_name));
create index plants_tags_idx on plants using gin(tags);
create index plants_indoor_idx on plants(indoor);
create index plants_outdoor_idx on plants(outdoor);
create index plants_care_level_idx on plants(care_level);

-- PLANT COMBINATIONS
create table plant_combinations (
  id uuid primary key default uuid_generate_v4(),
  plant_a_id uuid references plants(id) on delete cascade,
  plant_b_id uuid references plants(id) on delete cascade,
  compatibility_score numeric(3,2),
  aesthetic_score numeric(3,2),
  notes text,
  style_tags text[] default '{}',
  created_at timestamptz default now(),
  unique(plant_a_id, plant_b_id)
);

-- PROFILES
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  climate_zone text,
  plan plan_type default 'free',
  identifications_this_month int default 0,
  identifications_reset_at timestamptz default date_trunc('month', now()) + interval '1 month',
  is_professional boolean default false,
  profession text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- FAVORITES
create table favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  plant_id uuid references plants(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, plant_id)
);

-- GARDENS
create table gardens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  description text,
  style garden_style,
  area_sqm numeric(8,2),
  location text,
  climate_zone text,
  is_public boolean default false,
  cover_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table garden_plants (
  id uuid primary key default uuid_generate_v4(),
  garden_id uuid references gardens(id) on delete cascade,
  plant_id uuid references plants(id) on delete cascade,
  quantity int default 1,
  position_x numeric,
  position_y numeric,
  notes text,
  added_at timestamptz default now()
);

-- IDENTIFICATIONS
create table identifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  image_url text not null,
  api_response jsonb,
  matched_plant_id uuid references plants(id),
  confidence numeric(4,3),
  suggestions jsonb default '[]',
  created_at timestamptz default now()
);

-- SUBSCRIPTIONS
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade unique,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan plan_type not null,
  status subscription_status not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table plants enable row level security;
alter table plant_combinations enable row level security;
alter table profiles enable row level security;
alter table favorites enable row level security;
alter table gardens enable row level security;
alter table garden_plants enable row level security;
alter table identifications enable row level security;
alter table subscriptions enable row level security;

create policy "plants_public_read" on plants
  for select using (published = true);

create policy "profiles_own_read" on profiles
  for select using (auth.uid() = id);

create policy "profiles_own_update" on profiles
  for update using (auth.uid() = id);

create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

create policy "favorites_own" on favorites
  using (auth.uid() = user_id);

create policy "gardens_own_all" on gardens
  using (auth.uid() = user_id);

create policy "gardens_public_read" on gardens
  for select using (is_public = true);

create policy "garden_plants_own" on garden_plants
  using (
    garden_id in (select id from gardens where user_id = auth.uid())
  );

create policy "identifications_own" on identifications
  using (auth.uid() = user_id);

create policy "subscriptions_own" on subscriptions
  for select using (auth.uid() = user_id);

-- TRIGGERS
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger plants_updated_at before update on plants
  for each row execute procedure update_updated_at();

create trigger profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at();

create trigger gardens_updated_at before update on gardens
  for each row execute procedure update_updated_at();
