-- migrate:up
create extension if not exists pgcrypto;

-- register user
create or replace function register_user(
    p_email varchar,
    p_username varchar,
    p_about varchar,
    p_password text,
    p_id_address cidr,
    p_user_agent text,
    p_device_status device_status default 'active'
) returns table (r_user_id bigint, r_device_id uuid) AS $$
declare
    new_user_id bigint;
    new_device_id uuid;
begin
    insert into
        users (email, username, about, password)
    values
        (
            p_email,
            p_username,
            p_about,
            crypt(p_password, gen_salt('bf', 12))
        ) returning user_id into new_user_id;

    insert into
        devices (
            user_agent,
            is_trusted,
            ip_address,
            status,
            user_id
        )
    values
        (
            p_user_agent,
            TRUE,
            p_id_address,
            p_device_status,
            new_user_id
        ) returning device_id into new_device_id;

    return query
    select
        new_user_id,
        new_device_id;
end;
$$ language plpgsql;


-- add contacts
create or replace function contact(p_username text, p_contact_name text) returns boolean as $$
declare
    user_id_a bigint;
    user_id_b bigint;
begin
    select
        user_id into user_id_a
    from
        users
    where
        username = p_username;

    select
        user_id INTO user_id_b
    from
        users
    where
        username = p_contact_name;

    if user_id_a is null
    or user_id_b is null then return false;

    end if;

    insert into
        UserContacts (user_id, contact_id, is_blocked)
    values
        (user_id_a, user_id_b, FALSE);
    return true;
end;
$$ language plpgsql;

-- migrate:down
drop function if exists register_user;
drop function if exists contact;
drop extension if exists pgcrypto;