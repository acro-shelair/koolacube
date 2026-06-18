-- Koolacube CMS — full schema. Paste this whole file into the Supabase SQL editor and Run.

-- ============================================================
-- setup.sql
-- ============================================================
-- Koolacube CMS — foundation schema
-- Run this FIRST in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.

-- ============================================================
-- user_profiles: role + per-section permissions for admin users
-- ============================================================
create table if not exists public.user_profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('admin', 'employee')),
  permissions text[] not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists user_profiles_role_idx on public.user_profiles(role);

-- Shared helper to keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_profiles_touch on public.user_profiles;
create trigger user_profiles_touch
before update on public.user_profiles
for each row execute function public.touch_updated_at();

-- Helper to check admin role without triggering RLS recursion
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.user_profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

alter table public.user_profiles enable row level security;

drop policy if exists "profiles_self_read" on public.user_profiles;
create policy "profiles_self_read" on public.user_profiles
  for select using (auth.uid() = user_id);

drop policy if exists "profiles_admin_read" on public.user_profiles;
create policy "profiles_admin_read" on public.user_profiles
  for select using (public.is_admin());

drop policy if exists "profiles_admin_write" on public.user_profiles;
create policy "profiles_admin_write" on public.user_profiles
  for all using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- activity_logs: append-only audit trail for admin actions
-- ============================================================
create table if not exists public.activity_logs (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  user_email text,
  action     text not null check (action in ('create', 'update', 'delete', 'login', 'logout')),
  table_name text not null,
  record_id  text,
  details    text,
  created_at timestamptz not null default now()
);

create index if not exists activity_logs_created_at_idx on public.activity_logs(created_at desc);
create index if not exists activity_logs_user_id_idx    on public.activity_logs(user_id);
create index if not exists activity_logs_table_name_idx on public.activity_logs(table_name);

alter table public.activity_logs enable row level security;

-- Only admins may read logs. Writes happen via service role, so no insert policy needed.
drop policy if exists "logs_admin_read" on public.activity_logs;
create policy "logs_admin_read" on public.activity_logs
  for select using (
    exists (
      select 1 from public.user_profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );


-- ============================================================
-- site_settings.sql
-- ============================================================
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


-- ============================================================
-- faqs.sql
-- ============================================================
-- FAQs — home page accordion. Run after setup.sql.

create table if not exists public.faqs (
  id             uuid primary key default gen_random_uuid(),
  question       text not null,
  answer         text not null,
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists faqs_display_order_idx on public.faqs(display_order);

alter table public.faqs enable row level security;

drop policy if exists "faqs_public_select" on public.faqs;
create policy "faqs_public_select" on public.faqs
  for select using (is_published = true);

drop policy if exists "faqs_admin_select" on public.faqs;
create policy "faqs_admin_select" on public.faqs
  for select using (auth.uid() is not null);

drop policy if exists "faqs_admin_insert" on public.faqs;
create policy "faqs_admin_insert" on public.faqs
  for insert with check (auth.uid() is not null);

drop policy if exists "faqs_admin_update" on public.faqs;
create policy "faqs_admin_update" on public.faqs
  for update using (auth.uid() is not null);

drop policy if exists "faqs_admin_delete" on public.faqs;
create policy "faqs_admin_delete" on public.faqs
  for delete using (auth.uid() is not null);

drop trigger if exists faqs_touch on public.faqs;
create trigger faqs_touch
  before update on public.faqs
  for each row execute function public.touch_updated_at();


-- ============================================================
-- units.sql
-- ============================================================
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


-- ============================================================
-- industries.sql
-- ============================================================
-- Industries — industries page. Run after setup.sql.

create table if not exists public.industries (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  icon           text not null default 'ChefHat',
  name           text not null,
  tagline        text not null default '',
  intro          text not null default '',
  challenges     text[] not null default '{}',
  helps          text[] not null default '{}',
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists industries_display_order_idx on public.industries(display_order);

alter table public.industries enable row level security;

drop policy if exists "industries_public_select" on public.industries;
create policy "industries_public_select" on public.industries
  for select using (is_published = true);

drop policy if exists "industries_admin_select" on public.industries;
create policy "industries_admin_select" on public.industries
  for select using (auth.uid() is not null);

drop policy if exists "industries_admin_insert" on public.industries;
create policy "industries_admin_insert" on public.industries
  for insert with check (auth.uid() is not null);

drop policy if exists "industries_admin_update" on public.industries;
create policy "industries_admin_update" on public.industries
  for update using (auth.uid() is not null);

drop policy if exists "industries_admin_delete" on public.industries;
create policy "industries_admin_delete" on public.industries
  for delete using (auth.uid() is not null);

drop trigger if exists industries_touch on public.industries;
create trigger industries_touch
  before update on public.industries
  for each row execute function public.touch_updated_at();


-- ============================================================
-- messages.sql
-- ============================================================
-- Messages — contact-form enquiries inbox. Run after setup.sql.
-- Inserts happen via the service-role client in the submitEnquiry server action,
-- so no public insert policy is needed (RLS is bypassed by the service role).

create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  business    text,
  phone       text not null,
  email       text not null,
  suburb      text not null,
  need        text,
  mode        text,
  start_date  text,
  duration    text,
  product     text,
  volume      text,
  power       text,
  access      text[] not null default '{}',
  message     text,
  status      text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at  timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages(created_at desc);
create index if not exists messages_status_idx     on public.messages(status);

alter table public.messages enable row level security;

-- Only authenticated admin users may read / update / delete. No insert policy:
-- enquiries are written by the service role.
drop policy if exists "messages_admin_select" on public.messages;
create policy "messages_admin_select" on public.messages
  for select using (auth.uid() is not null);

drop policy if exists "messages_admin_update" on public.messages;
create policy "messages_admin_update" on public.messages
  for update using (auth.uid() is not null);

drop policy if exists "messages_admin_delete" on public.messages;
create policy "messages_admin_delete" on public.messages
  for delete using (auth.uid() is not null);


-- ============================================================
-- page_content.sql
-- ============================================================
-- Page content — per-route structured copy overrides (Phase 2). Run after setup.sql.
-- Each row holds the structured data object for one route (keyed by path), which
-- is merged over the in-code defaults by getPageContent(). Empty table = the site
-- renders entirely from code defaults.

create table if not exists public.page_content (
  path        text primary key,
  data        jsonb not null default '{}',
  updated_at  timestamptz not null default now()
);

alter table public.page_content enable row level security;

-- Public can read page content (pages render server-side).
drop policy if exists "page_content_public_select" on public.page_content;
create policy "page_content_public_select" on public.page_content
  for select using (true);

drop policy if exists "page_content_admin_write" on public.page_content;
create policy "page_content_admin_write" on public.page_content
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop trigger if exists page_content_touch on public.page_content;
create trigger page_content_touch
  before update on public.page_content
  for each row execute function public.touch_updated_at();


