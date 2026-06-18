-- Units — available-units catalog (cooler / freezer / dual-temp). Run after setup.sql.

create table if not exists public.units (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  category       text not null default 'cooler' check (category in ('cooler', 'freezer', 'dual')),
  icon           text not null default 'Snowflake',
  name           text not null,
  tagline        text not null default '',
  intro          text not null default '',
  img            text not null default '',
  specs          jsonb not null default '[]',          -- [{ feature, value: string | string[] }]
  applications   text[] not null default '{}',
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists units_display_order_idx on public.units(display_order);

alter table public.units enable row level security;

drop policy if exists "units_public_select" on public.units;
create policy "units_public_select" on public.units
  for select using (is_published = true);

drop policy if exists "units_admin_select" on public.units;
create policy "units_admin_select" on public.units
  for select using (auth.uid() is not null);

drop policy if exists "units_admin_insert" on public.units;
create policy "units_admin_insert" on public.units
  for insert with check (auth.uid() is not null);

drop policy if exists "units_admin_update" on public.units;
create policy "units_admin_update" on public.units
  for update using (auth.uid() is not null);

drop policy if exists "units_admin_delete" on public.units;
create policy "units_admin_delete" on public.units
  for delete using (auth.uid() is not null);

drop trigger if exists units_touch on public.units;
create trigger units_touch
  before update on public.units
  for each row execute function public.touch_updated_at();
