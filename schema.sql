-- MaintenIQ MVP SaaS Database Schema
-- Run this in Supabase SQL Editor.

create extension if not exists "uuid-ossp";

create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  status text default 'active',
  created_at timestamptz default now()
);

create table if not exists roles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  scope text,
  created_at timestamptz default now()
);

create table if not exists users_profile (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  phone text,
  role_name text not null,
  status text default 'active',
  is_platform_owner boolean default false,
  created_at timestamptz default now()
);

create table if not exists departments (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists assets (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  asset_code text not null,
  asset_name text not null,
  category text,
  serial_number text,
  model text,
  manufacturer text,
  status text default 'active',
  qr_code text,
  created_at timestamptz default now()
);

create table if not exists asset_responsibility (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  asset_id uuid references assets(id) on delete cascade,
  owner_type text,
  owner_name text,
  operating_department text,
  current_operator text,
  responsible_person text,
  contact_number text,
  cost_center text,
  start_date date default current_date,
  end_date date,
  status text default 'active'
);

create table if not exists work_orders (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  wo_number text not null,
  asset_id uuid references assets(id),
  requested_by text,
  assigned_to text,
  supervisor text,
  type text default 'CM',
  priority text default 'Medium',
  status text default 'New Request',
  problem_description text,
  diagnosis text,
  closing_notes text,
  downtime_minutes integer default 0,
  labor_minutes integer default 0,
  created_at timestamptz default now(),
  closed_at timestamptz
);

create table if not exists work_order_status_history (
  id uuid primary key default uuid_generate_v4(),
  work_order_id uuid references work_orders(id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists spare_parts (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  part_number text,
  part_name text not null,
  quantity integer default 0,
  min_quantity integer default 0,
  unit_cost numeric default 0,
  supplier_name text,
  created_at timestamptz default now()
);

create table if not exists spare_part_requests (
  id uuid primary key default uuid_generate_v4(),
  work_order_id uuid references work_orders(id) on delete cascade,
  requested_by text,
  store_response text,
  status text default 'requested',
  eta text,
  created_at timestamptz default now()
);

create table if not exists spare_part_request_items (
  id uuid primary key default uuid_generate_v4(),
  request_id uuid references spare_part_requests(id) on delete cascade,
  part_name text not null,
  quantity numeric not null,
  availability_status text default 'pending'
);

create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  user_email text,
  action text not null,
  entity_type text,
  entity_id text,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz default now()
);

-- Initial owner seed. Replace email before production.
insert into companies (name) values ('MaintenIQ Platform Owner') on conflict do nothing;

insert into users_profile (full_name, email, role_name, is_platform_owner)
values ('System Owner', 'owner@mainteniq.com', 'System Admin', true)
on conflict (email) do nothing;
