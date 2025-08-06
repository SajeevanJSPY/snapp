-- migrate:up
CREATE TABLE IF NOT EXISTS user_contacts (
    user_contacts_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users,
    contact_id BIGINT REFERENCES users,
    is_blocked BOOLEAN,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    UNIQUE (user_id, contact_id),
    CONSTRAINT owner_cannot_be_contact CHECK (user_id <> contact_id)
);

-- migrate:down
DROP TABLE IF EXISTS user_contacts;