-- ============================================================
-- Floria MVP - Schema principal
-- Run: supabase db push
-- ============================================================

-- Habilitar extensiones
create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- ============================================================
-- ENUM TYPES
-- ============================================================
create type care_level as enum ('easy', 'moderate', 'expert');
create type light_requirement as enum ('full_sun', 'partial_shade', 'shade', 'indirect');
create type water_frequency as enum ('daily', 'twice_week', 'weekly', 'biweekly', 'monthly');
create type growth_speed as enum ('slow', 'moderate', 'fast');
create type garden_style as enum ('mediterranean', 'tropical', 'minimal', 'natural', 'formal', 'cottage');
create type plan_type as enum ('free', 'pro', 'professional');
create type subscription_status as enum ('active', 'canceled', 'past_due', 'trialing');

-- ============================================================
-- PLANTS - Catálogo botánico
-- ============================================================
create table plants (
  id uuid primary key default uuid_generate_v4(),
  
  -- Identidad
  scientific_name text not null unique,
  common_name text not null,
  common_names text[] default '{}',         -- otros nombres populares
  family text,
  origin text[],
  
  -- Descripción
  description text,
  uses text[],                               -- ornamental, medicinal, comestible, etc.
  
  -- Requerimientos de cuidado
  care_level care_level default 'moderate',
  light light_requirement not null,
  water water_frequency not null,
  humidity_min int check (humidity_min between 0 and 100),
  humidity_max int check (humidity_max between 0 and 100),
  temp_min_c numeric(4,1),
  temp_max_c numeric(4,1),
  
  -- Características físicas
  height_min_cm int,
  height_max_cm int,
  growth_speed growth_speed,
  evergreen boolean default true,
  flowering boolean default false,
  flowering_months int[],                    -- 1=Enero, 12=Diciembre
  
  -- Entorno
  indoor boolean default false,
  outdoor boolean default false,
  pot_suitable boolean default true,
  soil_types text[] default '{}',           -- arcilloso, arenoso, etc.
  hardiness_zones text[],                   -- zonas USDA
  
  -- Estilo paisajístico
  garden_styles garden_style[] default '{}',
  
  -- Imágenes
  cover_image text,                          -- URL principal
  images text[] default '{}',
  
  -- Búsqueda semántica (Etapa 3)
  embedding vector(1536),
  
  -- SEO / metadata
  tags text[] default '{}',
  slug text unique,
  
  -- Control
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índice para búsqueda rápida
create index plants_common_name_idx on plants using gin(to_tsvector('spanish', common_name || ' ' || scientific_name));
create index plants_tags_idx on plants using gin(tags);
create index plants_styles_idx on plants using gin(garden_styles);
create index plants_indoor_idx on plants(indoor);
create index plants_outdoor_idx on plants(outdoor);
create index plants_care_level_idx on plants(care_level);

-- ============================================================
-- PLANT COMBINATIONS - Compatibilidades
-- ============================================================
create table plant_combinations (
  id uuid primary key default uuid_generate_v4(),
  plant_a_id uuid references plants(id) on delete cascade,
  plant_b_id uuid references plants(id) on delete cascade,
  compatibility_score numeric(3,2) check (score between 0 and 1),
  aesthetic_score numeric(3,2) check (score between 0 and 1),
  notes text,
  style_tags text[] default '{}',
  created_at timestamptz default now(),
  unique(plant_a_id, plant_b_id)
);

-- ============================================================
-- PROFILES - Extensión de auth.users
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  climate_zone text,
  plan plan_type default 'free',
  
  -- Límites uso (free tier)
  identifications_this_month int default 0,
  identifications_reset_at timestamptz default date_trunc('month', now()) + interval '1 month',
  
  is_professional boolean default false,
  profession text,                           -- "Paisajista", "Botánico", etc.
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- FAVORITES
-- ============================================================
create table favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  plant_id uuid references plants(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, plant_id)
);

-- ============================================================
-- GARDENS - Proyectos de jardín
-- ============================================================
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
  position_x numeric,                        -- para mapa de jardín futuro
  position_y numeric,
  notes text,
  added_at timestamptz default now()
);

-- ============================================================
-- IDENTIFICATIONS - Historial de reconocimiento por foto
-- ============================================================
create table identifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  image_url text not null,
  
  -- Resultado de Plant.id
  api_response jsonb,
  matched_plant_id uuid references plants(id),
  confidence numeric(4,3),                   -- 0.000 a 1.000
  
  -- Alternativas sugeridas
  suggestions jsonb default '[]',
  
  created_at timestamptz default now()
);

-- ============================================================
-- SUBSCRIPTIONS - Stripe
-- ============================================================
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

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table plants enable row level security;
alter table plant_combinations enable row level security;
alter table profiles enable row level security;
alter table favorites enable row level security;
alter table gardens enable row level security;
alter table garden_plants enable row level security;
alter table identifications enable row level security;
alter table subscriptions enable row level security;

-- Plants: todos pueden leer publicadas
create policy "plants_public_read" on plants
  for select using (published = true);

-- Profiles: usuarios ven su propio perfil, o perfiles públicos
create policy "profiles_own_read" on profiles
  for select using (auth.uid() = id);

create policy "profiles_own_update" on profiles
  for update using (auth.uid() = id);

-- Profiles: trigger crea perfil al registrarse
create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

-- Favorites: solo el dueño
create policy "favorites_own" on favorites
  using (auth.uid() = user_id);

-- Gardens: dueño ve todos, anónimos ven públicos
create policy "gardens_own_all" on gardens
  using (auth.uid() = user_id);

create policy "gardens_public_read" on gardens
  for select using (is_public = true);

-- Garden plants
create policy "garden_plants_own" on garden_plants
  using (
    garden_id in (select id from gardens where user_id = auth.uid())
  );

-- Identifications: solo el dueño
create policy "identifications_own" on identifications
  using (auth.uid() = user_id);

-- Subscriptions: solo el dueño
create policy "subscriptions_own" on subscriptions
  for select using (auth.uid() = user_id);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-crear perfil al registrar usuario
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

-- Auto-actualizar updated_at
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
