-- 007: Rellenar perfiles faltantes y reforzar el trigger de creación
-- Motivo: usuarios registrados antes del trigger on_auth_user_created (o si el
-- trigger no corrió) quedaron sin fila en profiles → "Perfil no encontrado" al identificar.
-- Ejecutar en Supabase → SQL Editor.

-- 1) Crear perfil para cualquier usuario de auth que no tenga uno
insert into public.profiles (id, full_name, avatar_url)
select
  u.id,
  u.raw_user_meta_data ->> 'full_name',
  u.raw_user_meta_data ->> 'avatar_url'
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- 2) Reasegurar la función y el trigger (idempotente)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
