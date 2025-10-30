-- mybavul core schema (UTC times, minor units)
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- Tenancy
create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);
create table if not exists tenant_members (
  tenant_id uuid not null references tenants(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('guest','partner_admin','partner_editor','ops_admin','support')),
  primary key (tenant_id, user_id)
);
create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  key_hash text not null,
  scopes text[] not null default '{}',
  created_at timestamptz default now(),
  disabled boolean default false
);

-- Supply (properties)
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  title text not null,
  timezone text not null default 'UTC',
  created_at timestamptz default now()
);
create index if not exists idx_properties_tenant on properties(tenant_id);

-- Rooms & rates (minimal seed)
create table if not exists room_types (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  name text not null
);
create table if not exists rate_plans (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  refundable boolean not null default false
);
create table if not exists room_rateplan_map (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  room_type_id uuid not null references room_types(id) on delete cascade,
  rate_plan_id uuid not null references rate_plans(id) on delete cascade,
  unique (room_type_id, rate_plan_id)
);

-- Inventory & prices (simplified)
create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  room_type_id uuid not null references room_types(id) on delete cascade,
  date date not null,
  allotment int not null default 0,
  stop_sell boolean not null default false,
  min_stay int default 1,
  max_stay int default 30,
  cta boolean default true,
  ctd boolean default true,
  unique (room_type_id, date)
);
create table if not exists prices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  room_type_id uuid not null references room_types(id) on delete cascade,
  rate_plan_id uuid not null references rate_plans(id) on delete cascade,
  date date not null,
  los int not null default 1,
  occupancy int not null default 2,
  currency text not null default 'USD',
  amount_minor bigint not null,
  unique (room_type_id, rate_plan_id, date, los, occupancy)
);

-- Bookings
create type booking_status as enum ('pending','confirmed','cancelled','refunded');
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  room_type_id uuid not null references room_types(id) on delete cascade,
  rate_plan_id uuid not null references rate_plans(id) on delete cascade,
  guest_id uuid,
  checkin date not null,
  checkout date not null,
  currency text not null default 'USD',
  total_minor bigint not null,
  status booking_status not null default 'pending',
  created_at timestamptz default now(),
  constraint chk_dates check (checkout > checkin)
);
create table if not exists booking_payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  provider text not null default 'stripe',
  provider_payment_id text,
  amount_minor bigint not null,
  currency text not null default 'USD',
  captured boolean default false,
  refunded_minor bigint default 0,
  created_at timestamptz default now()
);
create table if not exists refunds (
  id uuid primary key default gen_random_uuid(),
  booking_payment_id uuid not null references booking_payments(id) on delete cascade,
  amount_minor bigint not null,
  reason text,
  created_at timestamptz default now()
);

-- Ledger & payouts
create type ledger_type as enum ('debit','credit');
create table if not exists wallet_ledger (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  amount_minor bigint not null,
  currency text not null default 'USD',
  entry_type ledger_type not null,
  fee_minor bigint default 0,
  created_at timestamptz default now()
);
create table if not exists payout_batches (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  status text not null default 'pending',
  remittance_file text,
  created_at timestamptz default now()
);

-- Channels & sync (minimal)
create table if not exists channels (
  code text primary key,
  name text not null
);
create table if not exists connections (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  channel_code text not null references channels(code) on delete cascade,
  credentials jsonb not null,
  created_at timestamptz default now()
);
create table if not exists sync_jobs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  channel_code text not null,
  job_type text not null,
  payload jsonb,
  status text not null default 'queued',
  attempts int not null default 0,
  last_error text,
  scheduled_at timestamptz default now(),
  processed_at timestamptz
);
create table if not exists sync_logs (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references sync_jobs(id) on delete set null,
  level text not null,
  message text,
  data jsonb,
  created_at timestamptz default now()
);

-- Security/ops
create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid,
  actor_user_id uuid,
  action text not null,
  target_type text,
  target_id text,
  before_data jsonb,
  after_data jsonb,
  ip inet,
  ua text,
  created_at timestamptz default now()
);
create table if not exists idempo (
  id text primary key,
  created_at timestamptz default now()
);
create table if not exists api_rate (
  key_hash text,
  bucket timestamptz,
  count int,
  primary key (key_hash, bucket)
);
