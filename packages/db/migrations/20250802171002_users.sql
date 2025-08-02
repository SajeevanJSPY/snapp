-- migrate:up
create table if not exists Users (
    user_id bigserial primary key,
    email varchar(30) unique not null constraint email_empty_check check (email <> ''),
    username varchar(20) not null constraint username_empty_check check (username <> ''),
    about varchar(100),
    password text not null,
    avatar bytea,
    last_login timestamp not null default now(),
    is_active boolean default true
);
create index idx_user_email on Users(email);

-- migrate:down
drop index if exists idx_user_email;
drop table Users;