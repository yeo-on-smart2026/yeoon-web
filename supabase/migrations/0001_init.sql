-- 餘溫 (YEO·ON) — 초기 스키마
-- Supabase SQL Editor에서 직접 실행할 것 (마이그레이션 CLI 미사용)

create table if not exists profiles (
  id text primary key,                 -- 예: 'stone01' (NFC UID → 화이트리스트 매핑값)
  name text not null,
  birth_date text not null,
  death_date text not null,
  quote text not null default '',
  main_image text,
  created_at timestamptz not null default now()
);

create table if not exists memorial_messages (
  id uuid primary key default gen_random_uuid(),
  profile_id text not null references profiles(id) on delete cascade,
  date text not null,
  relation text not null,
  title text not null,
  body text[] not null default '{}',
  photo text,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists memories (
  id uuid primary key default gen_random_uuid(),
  profile_id text not null references profiles(id) on delete cascade,
  date text not null,
  title text not null,
  desc text[] not null default '{}',
  src text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

-- 싱글톤 테이블: 현재 키오스크에 안착된 사용자 (NFC 상태)
-- id는 항상 'kiosk-01' 한 행만 사용 (다중 키오스크 확장 시 행 추가)
create table if not exists active_session (
  id text primary key default 'kiosk-01',
  profile_id text references profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

insert into active_session (id, profile_id)
values ('kiosk-01', null)
on conflict (id) do nothing;

-- ============================================================
-- RLS: 콘텐츠는 anon 읽기 전용, active_session은 anon 읽기만 허용
-- (쓰기는 Pi의 service role key로만 — 공개 인터넷에서 세션 조작 방지)
-- ============================================================

alter table profiles enable row level security;
alter table memorial_messages enable row level security;
alter table memories enable row level security;
alter table active_session enable row level security;

create policy "profiles anon read" on profiles
  for select using (true);

create policy "memorial_messages anon read" on memorial_messages
  for select using (true);

create policy "memories anon read" on memories
  for select using (true);

create policy "active_session anon read" on active_session
  for select using (true);

-- ============================================================
-- Realtime: active_session 변경을 yeoon-web이 구독
-- ============================================================

alter publication supabase_realtime add table active_session;
