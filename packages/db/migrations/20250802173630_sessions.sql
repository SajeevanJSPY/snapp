-- migrate:up
CREATE TABLE IF NOT EXISTS sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id BIGINT REFERENCES users,
    device_id UUID REFERENCES devices,
    created_at TIMESTAMP DEFAULT now(),
    expired_at TIMESTAMP GENERATED ALWAYS AS (created_at + interval '5 days') STORED
);
create index idx_session_user_id on sessions(user_id);

-- migrate:down
DROP INDEX IF EXISTS idx_session_user_id;
DROP TABLE IF EXISTS sessions;