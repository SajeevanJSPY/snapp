-- migrate:up
create table Sessions (
    session_id uuid primary key default gen_random_uuid(),
    user_id bigint references users,
    device_id uuid references devices,
    created_at timestamp default now(),
    expired_at timestamp generated always as (created_at + interval '5 days') stored
);
create index idx_session_user_id on Sessions(user_id);

-- migrate:down
drop index if exists idx_session_user_id;
drop table Sessions;