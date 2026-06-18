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
