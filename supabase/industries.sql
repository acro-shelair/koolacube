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
