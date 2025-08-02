-- migrate:up
create table UserContacts (
    user_contacts_id bigserial primary key,
    user_id bigint references users,
    contact_id bigint references users,
    is_blocked boolean,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    unique (user_id, contact_id),
    constraint owner_cannot_be_contact check (user_id <> contact_id)
);

-- migrate:down
drop table UserContacts;