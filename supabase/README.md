# Supabase setup — Koolacube CMS

## 1. Connect the app

Add the three keys to `koolacubenext/.env.local` (copy `.env.local.example`).
Find them in the Supabase dashboard → **Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role secret key>
```

Restart `npm run dev` after editing env files.

## 2. Create the tables

In the Supabase **SQL Editor**, run the files in this order (each is safe to re-run):

1. `setup.sql` — `user_profiles` + `activity_logs` + shared helpers (run first)
2. `site_settings.sql`
3. `faqs.sql`
4. `units.sql`
5. `industries.sql`
6. `messages.sql`
7. `page_content.sql`

You can paste them one at a time, or concatenate 2–7 into a single query after `setup.sql`.

## 3. Create the first admin user

1. Dashboard → **Authentication → Users → Add user → Create new user**.
2. Enter email + password, tick **Auto Confirm User**.
3. Copy the new user's **UUID**.
4. Run in the SQL editor (replace the UUID):

   ```sql
   insert into public.user_profiles (user_id, role, permissions)
   values ('PASTE-USER-UUID-HERE', 'admin', '{}')
   on conflict (user_id) do update set role = 'admin';
   ```

   Admins bypass the `permissions` check, so an empty array is fine.

5. Visit `/admin/login`, sign in. You should land on `/admin/home` with the full sidebar.

## Adding employees later

Employees get a trimmed sidebar based on their `permissions` array. Valid keys
(from `src/lib/rbac.ts`):

`home` · `pages` · `units` · `industries` · `faqs` · `messages` · `settings` · `logs`

Example — a content editor:

```sql
insert into public.user_profiles (user_id, role, permissions)
values ('UUID', 'employee', '{home,pages,units,industries,faqs}');
```

Or manage roles/permissions from the **Users** section in the admin once you're
signed in as an admin.
