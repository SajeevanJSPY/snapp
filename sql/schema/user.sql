CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL CONSTRAINT email_empty_check CHECK (email <> ''),
    username VARCHAR(20) NOT NULL CONSTRAINT username_empty_check CHECK (username <> ''),
    about VARCHAR(100),
    password TEXT NOT NULL,
    last_login TIMESTAMP NOT NULL DEFAULT now(),
    is_active BOOLEAN DEFAULT TRUE
);

-- status of the device the user has been using
CREATE TYPE device_status AS ENUM ('active', 'inactive', 'blocked');

-- the user is only limited use 2 device max
CREATE TABLE devices (
    device_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id BIGINT REFERENCES users,
    user_agent TEXT,
    ip_address CIDR NOT NULL,
    is_trusted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    status device_status NOT NULL
);

CREATE TABLE sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id BIGINT REFERENCES users,
    device_id UUID REFERENCES devices,
    created_at TIMESTAMP DEFAULT now(),
    expired_at TIMESTAMP GENERATED ALWAYS AS (created_at + INTERVAL '5 days') STORED
);

CREATE TABLE user_contacts (
    user_contacts_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users,
    contact_id BIGINT REFERENCES users (user_id),
    is_blocked BOOLEAN,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    UNIQUE (user_id, contact_id),
    CONSTRAINT owner_cannot_be_contact CHECK (user_id <> contact_id)
);

-- index
CREATE INDEX idx_user_email ON users(email);

CREATE INDEX idx_session_user_id ON sessions(user_id);

CREATE INDEX idx_devices_user_id ON devices(user_id);

CREATE INDEX idx_devices_status ON devices(status);