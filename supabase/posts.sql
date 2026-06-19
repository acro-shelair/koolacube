-- Posts — blog articles. Run after setup.sql.
-- Body is a jsonb array of ordered sections: [{ "heading": text, "paragraphs": [text, ...] }]

create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text not null default '',
  category      text not null default '',
  cover_image   text not null default '',
  read_time     text not null default '',
  date          text not null default '',          -- display label, e.g. "Jun 2026"
  body          jsonb not null default '[]',        -- [{ heading: text, paragraphs: text[] }]
  related_links jsonb not null default '[]',        -- [{ label: text, href: text }] internal links
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts(created_at desc);
create index if not exists posts_category_idx   on public.posts(category);

alter table public.posts enable row level security;

drop policy if exists "posts_public_select" on public.posts;
create policy "posts_public_select" on public.posts
  for select using (is_published = true);

drop policy if exists "posts_admin_select" on public.posts;
create policy "posts_admin_select" on public.posts
  for select using (auth.uid() is not null);

drop policy if exists "posts_admin_insert" on public.posts;
create policy "posts_admin_insert" on public.posts
  for insert with check (auth.uid() is not null);

drop policy if exists "posts_admin_update" on public.posts;
create policy "posts_admin_update" on public.posts
  for update using (auth.uid() is not null);

drop policy if exists "posts_admin_delete" on public.posts;
create policy "posts_admin_delete" on public.posts
  for delete using (auth.uid() is not null);

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch
  before update on public.posts
  for each row execute function public.touch_updated_at();

-- ── Sample content ──────────────────────────────────────────────────────────
-- Four rich starter articles. Idempotent: skipped if the slug already exists.
-- created_at is staggered so they sort newest-first in a sensible order.

insert into public.posts (slug, title, excerpt, category, cover_image, read_time, date, is_published, created_at, body)
values
(
  'how-to-choose-the-right-cold-room-size',
  'How to Choose the Right Cold Room Size for Your Business',
  'Hiring or buying a cold room that is too small kills your workflow, while one that is too big wastes money on power. Here is how to get the size exactly right the first time.',
  'Cold Room Hire',
  '',
  '6 min read',
  'Jun 2026',
  true,
  now() - interval '0 day',
  '[
    {"heading":"Why getting the size right matters","paragraphs":[
      "A cold room is one of the few pieces of equipment where both too small and too big are expensive mistakes. Undersize it and your team is constantly shuffling stock, propping the door open, and watching temperatures climb every time someone reaches for a box at the back. Oversize it and you are paying to chill empty air month after month.",
      "The good news is that sizing a cold room is not guesswork. With a quick look at what you store, how you store it, and how your business moves through a typical week, you can land on a unit that fits your operation now and leaves a little room to grow."
    ]},
    {"heading":"Start with what you actually store","paragraphs":[
      "Before you think about square metres, make a list of everything that needs refrigeration: fresh produce, proteins, dairy, prepped meals, beverages, and any bulk ingredients. Group them by how they are packaged, because a pallet of canned drinks behaves very differently to loose trays of fresh herbs.",
      "Pay attention to your delivery cycle too. A venue that takes one big delivery a week needs more buffer space than one restocked daily. Your cold room has to comfortably hold your fullest day, not your average day."
    ]},
    {"heading":"Match the unit to your volume","paragraphs":[
      "As a rough rule of thumb, a 3m unit suits a small cafe or food truck, a 4.5m to 6m unit covers most restaurants and mid-size kitchens, and 9m or multiple units serve high-volume catering, food manufacturers, and supermarkets.",
      "Think in terms of usable shelving, not just floor area. Good shelving turns a modest footprint into a surprising amount of storage, so a well-fitted smaller room can outperform a poorly organised larger one."
    ]},
    {"heading":"Leave room for airflow and access","paragraphs":[
      "Cold air needs to circulate. Packing product tight against the walls, the ceiling, or the evaporator forces the unit to work harder and creates warm spots that put food safety at risk. Plan to leave clear gaps around the airflow path and never stack right up to the fans.",
      "Access matters just as much. Staff should be able to walk in, reach the items they need, and walk out quickly without holding the door open. If your busiest items live at the back behind everything else, even a large room will feel cramped and inefficient."
    ]},
    {"heading":"Plan for growth and peak season","paragraphs":[
      "The room that fits you perfectly today can feel tight in twelve months. If you are scaling, adding menu lines, or heading into a busy season, size up slightly or choose hire terms that let you swap to a larger unit when you need it.",
      "This is exactly where hiring shines over buying. You can scale capacity up for the Christmas rush or a big catering contract, then scale back down afterwards, without being locked into a single fixed size."
    ]},
    {"heading":"Not sure? Talk to us","paragraphs":[
      "If you would rather not guess, send us your storage list and your busiest delivery day and we will recommend a unit that fits. We deliver portable cold rooms and freezer rooms across South East Queensland and can have one on site quickly."
    ]}
  ]'::jsonb
),
(
  'cold-room-vs-freezer-room-which-do-you-need',
  'Cold Room vs Freezer Room: Which Does Your Business Need?',
  'They look similar from the outside, but a cold room and a freezer room solve very different problems. This guide breaks down the difference so you hire or buy the right one.',
  'Buying Guide',
  '',
  '7 min read',
  'Jun 2026',
  true,
  now() - interval '7 day',
  '[
    {"heading":"The core difference","paragraphs":[
      "A cold room (also called a cool room or chiller) holds product above freezing, typically between 2 and 8 degrees Celsius. It is built to keep fresh food fresh: produce, dairy, drinks, meat for short-term storage, and prepped meals.",
      "A freezer room runs well below zero, usually around minus 18 degrees Celsius, to keep product frozen solid for long-term storage. The insulation, door seals, and refrigeration system are all heavier-duty to hold that lower temperature reliably."
    ]},
    {"heading":"When a cold room is the right call","paragraphs":[
      "Choose a cold room when your stock turns over quickly and needs to stay chilled rather than frozen. Restaurants, cafes, greengrocers, florists, and bars almost always lead with a cold room because most of what they handle is fresh and short-lived.",
      "Cold rooms are also the workhorse for daily prep. Keeping ingredients at a steady chilled temperature protects quality and food safety without the texture changes that freezing can cause."
    ]},
    {"heading":"When you genuinely need a freezer room","paragraphs":[
      "A freezer room earns its place when you buy in bulk, store proteins long-term, or run a menu built around frozen goods. Butchers, food manufacturers, ice cream and dessert businesses, and large caterers all rely on dependable sub-zero storage.",
      "Freezing extends shelf life dramatically and lets you take advantage of bulk pricing. The trade-off is higher power draw and the need to manage stock rotation so nothing sits frozen indefinitely."
    ]},
    {"heading":"The dual-temp option","paragraphs":[
      "If you need both chilled and frozen storage but do not have the space or budget for two separate rooms, a dual-temp room splits a single unit into a chiller section and a freezer section.",
      "This is a popular choice for growing venues that want flexibility. You get the best of both worlds in one footprint, and with hire you can adjust the arrangement as your needs change."
    ]},
    {"heading":"Running costs and power","paragraphs":[
      "Freezer rooms cost more to run than cold rooms because holding minus 18 degrees takes more energy than holding 4 degrees. Factor this into your decision, especially if the unit will run continuously for months.",
      "Site power matters too. Make sure you have suitable, stable power at the install location. Our team checks power requirements before delivery so there are no surprises on the day."
    ]},
    {"heading":"Our recommendation","paragraphs":[
      "If most of your stock is fresh and fast-moving, start with a cold room. If you store in bulk or rely on frozen product, you need a freezer room. If you are torn, a dual-temp unit or a short hire term lets you find out what works without committing to the wrong thing."
    ]}
  ]'::jsonb
),
(
  '5-signs-its-time-to-hire-a-temporary-cold-room',
  '5 Signs It Is Time to Hire a Temporary Cold Room',
  'Permanent refrigeration is not always the answer. Sometimes the smartest, cheapest fix is a portable cold room on hire. Here are five situations where hiring beats buying.',
  'Cold Room Hire',
  '',
  '5 min read',
  'Jun 2026',
  true,
  now() - interval '14 day',
  '[
    {"heading":"Hiring is not a compromise","paragraphs":[
      "There is a common assumption that hiring cold storage is only for emergencies. In reality, a portable cold room on hire is often the most practical and cost-effective option for businesses that need flexibility. Here are five clear signs it is the right move for you."
    ]},
    {"heading":"1. Your existing refrigeration has failed","paragraphs":[
      "When a built-in cool room or commercial fridge goes down, every hour counts. Spoiled stock and forced closures cost far more than a hire unit. A portable cold room can be delivered fast and running the same day, protecting your product while repairs or a replacement are sorted.",
      "Because it is mobile and self-contained, you can keep trading instead of throwing out stock and turning customers away."
    ]},
    {"heading":"2. You are renovating or relocating","paragraphs":[
      "Kitchen refurbishments, fit-outs, and moves all create a gap where your usual cold storage is offline. A hired cold room bridges that gap so your operation never stops, then leaves when the work is finished. No capital outlay for a temporary need."
    ]},
    {"heading":"3. Seasonal or event demand","paragraphs":[
      "Festivals, weddings, sporting events, and the holiday rush create short bursts of huge refrigeration demand. Buying permanent capacity for a few peak weeks makes no sense. Hire scales your cold storage up exactly when you need it and back down when the season ends."
    ]},
    {"heading":"4. A sudden surge in stock","paragraphs":[
      "Landed a big catering contract or a bulk-buy opportunity? You may need temporary space to hold extra product without cramming your existing room past safe limits. A hire unit gives you breathing space for as long as the surge lasts."
    ]},
    {"heading":"5. You are testing an expansion","paragraphs":[
      "Trialling a new site, a new menu line, or a second kitchen carries risk. Hiring lets you prove the demand is real before committing to permanent infrastructure. If the expansion works, great; if not, you simply end the hire."
    ]},
    {"heading":"How fast can we deliver?","paragraphs":[
      "We keep portable cold rooms and freezer rooms ready to go across South East Queensland, with rapid delivery for breakdowns and emergencies. Call us, tell us your situation, and we will get a unit to you quickly."
    ]}
  ]'::jsonb
),
(
  'food-safe-refrigeration-and-haccp-a-practical-guide',
  'A Practical Guide to Food-Safe Refrigeration and HACCP',
  'Temperature control is the backbone of food safety. This guide explains the danger zone, the temperatures that keep you compliant, and how portable cold rooms support your HACCP plan.',
  'Compliance',
  '',
  '8 min read',
  'May 2026',
  true,
  now() - interval '21 day',
  '[
    {"heading":"Why temperature is everything","paragraphs":[
      "In any food business, refrigeration is not just about keeping things cold; it is the single most important defence against foodborne illness. Get it right and you protect your customers, your reputation, and your licence. Get it wrong and the consequences can be severe.",
      "This guide covers the fundamentals every operator should know, and how reliable cold storage fits into a working HACCP plan."
    ]},
    {"heading":"Understanding the temperature danger zone","paragraphs":[
      "Bacteria multiply fastest between 5 and 60 degrees Celsius, a range known as the temperature danger zone. Food left in this zone for too long becomes unsafe, even if it looks and smells fine.",
      "The goal of good refrigeration is simple: keep cold food cold so it spends as little time as possible in that danger zone. Every minute a cool room sits warm because of a failing unit or a propped-open door is a minute working against you."
    ]},
    {"heading":"Cold room temperatures that keep you compliant","paragraphs":[
      "As a general standard, chilled food should be held at or below 5 degrees Celsius and frozen food at or below minus 18 degrees Celsius. Your local food authority may specify exact targets, so always check the requirements for your region and food type.",
      "A quality cold room with accurate digital thermostats makes hitting these targets straightforward. Consistency is what matters: a unit that holds a steady temperature is far safer than one that swings up and down."
    ]},
    {"heading":"Why portable cold rooms support HACCP","paragraphs":[
      "HACCP is built around identifying critical control points and keeping them under control. Refrigeration temperature is one of the most important of those points, and it must be maintained without interruption.",
      "Portable cold rooms with food-grade interiors, reliable refrigeration, and precise temperature control slot neatly into a HACCP plan. They are easy to clean, easy to monitor, and quick to deploy as backup if your primary storage ever fails, which protects continuity of control."
    ]},
    {"heading":"Monitoring and record keeping","paragraphs":[
      "Compliance is not just hitting the right temperature; it is proving you did. Check and log your cold room temperatures regularly, keep those records, and act immediately if readings drift outside the safe range.",
      "Make temperature checks part of opening and closing routines so they never get missed. Clear records protect you during an audit and help you catch a struggling unit before it becomes a spoilage event."
    ]},
    {"heading":"During breakdowns and audits","paragraphs":[
      "If your main refrigeration fails, having a backup plan is the difference between a minor hiccup and a major loss. A hired cold room delivered quickly keeps product safe and your HACCP controls intact while repairs happen.",
      "Heading into an audit or inspection? Make sure your units hold temperature reliably, your seals are sound, and your logs are up to date. Dependable, well-maintained equipment makes compliance far easier to demonstrate."
    ]},
    {"heading":"Koolacube and compliance","paragraphs":[
      "Every Koolacube cold room and freezer room is built with food-grade interiors and accurate temperature control to help you meet food-safety standards. If you need compliant cold storage, for the long term or as emergency backup, talk to our team."
    ]}
  ]'::jsonb
)
on conflict (slug) do nothing;

-- Internal links for each starter post. Seeded only where still empty, so
-- admin edits to related_links are never overwritten on a re-run.
alter table public.posts add column if not exists related_links jsonb not null default '[]';

update public.posts set related_links = '[
  {"label":"Cold Room Hire","href":"/hire/cold-room"},
  {"label":"Available Units","href":"/available-units"},
  {"label":"Industries We Serve","href":"/industries"}
]'::jsonb
where slug = 'how-to-choose-the-right-cold-room-size' and related_links = '[]'::jsonb;

update public.posts set related_links = '[
  {"label":"Cold Room Hire","href":"/hire/cold-room"},
  {"label":"Freezer Room Hire","href":"/hire/freezer-room"},
  {"label":"Dual Temp Room Hire","href":"/hire/dual-temp"},
  {"label":"Buy New Cold Rooms","href":"/buy/new"}
]'::jsonb
where slug = 'cold-room-vs-freezer-room-which-do-you-need' and related_links = '[]'::jsonb;

update public.posts set related_links = '[
  {"label":"Cold Room Hire","href":"/hire/cold-room"},
  {"label":"Long-Term Hire","href":"/hire/long-term"},
  {"label":"Available Units","href":"/available-units"},
  {"label":"Contact Us","href":"/contact"}
]'::jsonb
where slug = '5-signs-its-time-to-hire-a-temporary-cold-room' and related_links = '[]'::jsonb;

update public.posts set related_links = '[
  {"label":"Industries We Serve","href":"/industries"},
  {"label":"Cold Room Hire","href":"/hire/cold-room"},
  {"label":"Freezer Room Hire","href":"/hire/freezer-room"},
  {"label":"About Koolacube","href":"/about"}
]'::jsonb
where slug = 'food-safe-refrigeration-and-haccp-a-practical-guide' and related_links = '[]'::jsonb;
