-- Site settings — single-row store of global NAP + shared copy. Run after setup.sql.
-- One row, id = 1, holding a jsonb blob that mirrors SITE in src/lib/site.ts.

create table if not exists public.site_settings (
  id          integer primary key default 1,
  data        jsonb not null default '{}',
  updated_at  timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into public.site_settings (id, data)
values (1, '{}')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

-- Public can read settings (footer, header, JSON-LD render server-side).
drop policy if exists "settings_public_select" on public.site_settings;
create policy "settings_public_select" on public.site_settings
  for select using (true);

drop policy if exists "settings_admin_write" on public.site_settings;
create policy "settings_admin_write" on public.site_settings
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch
  before update on public.site_settings
  for each row execute function public.touch_updated_at();
