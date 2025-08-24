-- migrate:up
CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    device_id UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    user_agent VARCHAR(30),
    refresh_token TEXT,
    last_login_at TIMESTAMP DEFAULT now(),
    last_updated_at TIMESTAMP DEFAULT now(),
    UNIQUE (user_id, device_id)
);
CREATE INDEX IF NOT EXISTS idx_devices_user_id ON devices(user_id);

-- migrate:down
DROP INDEX IF EXISTS idx_devices_user_id;
DROP TABLE IF EXISTS devices;