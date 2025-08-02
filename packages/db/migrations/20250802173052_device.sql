-- migrate:up
create type device_status as enum ('active', 'inactive', 'blocked');
create table if not exists Devices (
    device_id uuid primary key default gen_random_uuid(),
    user_id bigint references users,
    user_agent text,
    ip_address cidr not null,
    is_trusted boolean default false,
    created_at timestamp default now(),
    status device_status not null
);
create index idx_devices_user_id on Devices(user_id);
create index idx_devices_status on Devices(status);

-- migrate:down
drop index if exists idx_devices_user_id;
drop index if exists idx_devices_status;
drop table Devices;
drop type if exists device_status;