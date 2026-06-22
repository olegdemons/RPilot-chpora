-- Восстанавливает профили для пользователей, которые уже появились в Authentication,
-- но не были добавлены в public.profiles из-за ошибки триггера.

insert into public.profiles (
  id, static_id, first_name, last_name, rank, callsign, role
)
select
  users.id,
  users.raw_user_meta_data ->> 'static_id',
  case
    when users.raw_user_meta_data ->> 'static_id' = '946-447' then 'Дмитрий'
    else coalesce(nullif(users.raw_user_meta_data ->> 'first_name', ''), 'Пользователь')
  end,
  case
    when users.raw_user_meta_data ->> 'static_id' = '946-447' then 'Смирнов'
    else coalesce(nullif(users.raw_user_meta_data ->> 'last_name', ''), 'RPilot')
  end,
  coalesce(nullif(users.raw_user_meta_data ->> 'rank', ''), 'Рядовой'),
  coalesce(users.raw_user_meta_data ->> 'callsign', ''),
  case
    when users.raw_user_meta_data ->> 'static_id' = '946-447' then 'creator'
    else 'user'
  end
from auth.users as users
where users.raw_user_meta_data ->> 'static_id' ~ '^[0-9]{3}-[0-9]{3}$'
on conflict (static_id) do update
set
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  rank = excluded.rank,
  callsign = excluded.callsign,
  role = case
    when excluded.static_id = '946-447' then 'creator'
    when public.profiles.role = 'creator' then 'user'
    else public.profiles.role
  end;

update public.profiles
set first_name = 'Дмитрий',
    last_name = 'Смирнов',
    role = 'creator'
where static_id = '946-447';

update public.profiles
set role = 'user'
where role = 'creator'
  and static_id <> '946-447';
