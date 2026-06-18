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
