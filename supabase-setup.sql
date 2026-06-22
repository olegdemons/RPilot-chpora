create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  static_id text unique not null check (static_id ~ '^[0-9]{3}-[0-9]{3}$'),
  first_name text not null,
  last_name text not null,
  rank text not null,
  callsign text not null default '',
  role text not null default 'user' check (role in ('creator', 'donater', 'user')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_rpilot_creator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and static_id = '946-447'
      and role = 'creator'
  );
$$;

create or replace function public.handle_rpilot_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_static text := new.raw_user_meta_data ->> 'static_id';
begin
  insert into public.profiles (
    id, static_id, first_name, last_name, rank, callsign, role
  )
  values (
    new.id,
    requested_static,
    case when requested_static = '946-447' then 'Дмитрий'
         else coalesce(nullif(new.raw_user_meta_data ->> 'first_name', ''), 'Пользователь') end,
    case when requested_static = '946-447' then 'Смирнов'
         else coalesce(nullif(new.raw_user_meta_data ->> 'last_name', ''), 'RPilot') end,
    coalesce(nullif(new.raw_user_meta_data ->> 'rank', ''), 'Рядовой'),
    coalesce(new.raw_user_meta_data ->> 'callsign', ''),
    case when requested_static = '946-447' then 'creator' else 'user' end
  );
  return new;
end;
$$;

drop trigger if exists on_rpilot_user_created on auth.users;
create trigger on_rpilot_user_created
  after insert on auth.users
  for each row execute function public.handle_rpilot_user();

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "Creator reads all profiles" on public.profiles;
create policy "Creator reads all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_rpilot_creator());

create or replace function public.set_rpilot_role(target_static text, requested_role text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_profile public.profiles;
begin
  if not public.is_rpilot_creator() then
    raise exception 'Only the RPilot creator can change roles';
  end if;
  if target_static = '946-447' then
    raise exception 'The creator role is protected';
  end if;
  if requested_role not in ('user', 'donater') then
    raise exception 'Invalid role';
  end if;

  update public.profiles
  set role = requested_role
  where static_id = target_static
  returning * into updated_profile;

  if updated_profile.id is null then
    raise exception 'Account not found';
  end if;
  return updated_profile;
end;
$$;

revoke all on public.profiles from anon;
grant select on public.profiles to authenticated;
revoke all on function public.is_rpilot_creator() from public, anon;
revoke all on function public.set_rpilot_role(text, text) from public, anon;
grant execute on function public.is_rpilot_creator() to authenticated;
grant execute on function public.set_rpilot_role(text, text) to authenticated;
