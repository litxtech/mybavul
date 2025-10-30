-- Enable RLS and basic policies (simplified)
alter table tenants enable row level security;
alter table tenant_members enable row level security;
alter table api_keys enable row level security;
alter table properties enable row level security;
alter table room_types enable row level security;
alter table rate_plans enable row level security;
alter table room_rateplan_map enable row level security;
alter table inventory enable row level security;
alter table prices enable row level security;
alter table bookings enable row level security;
alter table wallet_ledger enable row level security;
alter table payout_batches enable row level security;
alter table connections enable row level security;
alter table sync_jobs enable row level security;
alter table sync_logs enable row level security;
alter table audit_log enable row level security;

-- Helper: current tenant via API key/session is app-level. For now allow all until service layer enforces tenant.
create policy "read_own_tenant" on properties for select using (true);
