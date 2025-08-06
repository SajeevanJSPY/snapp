-- migrate:up
CREATE TYPE device_status AS ENUM ('active', 'inactive', 'blocked');
CREATE TABLE IF NOT EXISTS devices (
    device_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id BIGINT REFERENCES users,
    user_agent TEXT,
    ip_address CIDR NOT NULL,
    is_trusted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    status device_status NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_devices_user_id ON devices(user_id);
CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);

-- migrate:down
DROP INDEX IF EXISTS idx_devices_user_id;
DROP INDEX IF EXISTS idx_devices_status;
DROP TABLE IF EXISTS devices;
DROP TYPE IF EXISTS device_status;