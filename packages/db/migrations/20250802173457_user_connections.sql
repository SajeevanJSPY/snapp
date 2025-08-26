-- migrate:up
CREATE TABLE IF NOT EXISTS public.user_connections (
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    contact_id INTEGER NOT NULL REFERENCES users(user_id),
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (user_id, contact_id),
    CONSTRAINT user_cannot_be_contact CHECK (user_id <> contact_id)
);
CREATE TABLE IF NOT EXISTS public.user_connection_requests (
    request_id SERIAL PRIMARY KEY,
    request_from_id INTEGER NOT NULL REFERENCES users(user_id),
    request_to_id INTEGER NOT NULL REFERENCES users(user_id),
    is_accepted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (request_from_id, request_to_id),
    CONSTRAINT user_cannot_be_contact CHECK (request_from_id <> request_to_id)
);

-- migrate:down
DROP TABLE IF EXISTS user_connection_requests;
DROP TABLE IF EXISTS user_contacts;