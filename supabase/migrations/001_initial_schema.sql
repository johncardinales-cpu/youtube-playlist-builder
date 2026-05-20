create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists playlist_topics (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete cascade,
  title text not null,
  slug text unique not null,
  description text,
  keywords text[] default '{}',
  auto_discovery_enabled boolean default true,
  auto_publish_enabled boolean default false,
  auto_publish_score_threshold int default 90,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists playlists (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete cascade,
  topic_id uuid references playlist_topics(id) on delete set null,
  title text not null,
  slug text unique not null,
  description text,
  mood text,
  difficulty text,
  estimated_watch_time text,
  seo_title text,
  meta_description text,
  thumbnail_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  youtube_video_id text unique not null,
  title text not null,
  channel_title text,
  source_url text not null,
  thumbnail_url text,
  duration text,
  license_type text not null,
  license_verified_at timestamptz,
  embeddable boolean default false,
  attribution_text text,
  safety_score int default 0,
  summary text,
  learning_notes text,
  discovered_at timestamptz default now(),
  approved_at timestamptz,
  rejected_at timestamptz,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists playlist_items (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid references playlists(id) on delete cascade,
  video_id uuid references videos(id) on delete cascade,
  sort_order int default 0,
  custom_note text,
  created_at timestamptz default now()
);

create table if not exists video_discovery_runs (
  id uuid primary key default gen_random_uuid(),
  status text not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  category_id uuid references categories(id) on delete set null,
  topic_id uuid references playlist_topics(id) on delete set null,
  keywords text[],
  total_found int default 0,
  total_verified int default 0,
  total_rejected int default 0,
  total_queued int default 0,
  error_message text
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists affiliate_links (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid references playlists(id) on delete cascade,
  title text not null,
  url text not null,
  description text,
  is_active boolean default true
);
