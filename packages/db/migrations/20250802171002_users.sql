-- migrate:up
CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL CONSTRAINT email_empty_check CHECK (email <> ''),
    username VARCHAR(20) NOT NULL CONSTRAINT username_empty_check CHECK (username <> ''),
    about VARCHAR(100),
    password TEXT NOT NULL,
    avatar BYTEA,
    last_login TIMESTAMP NOT NULL DEFAULT now(),
    is_active BOOLEAN DEFAULT TRUE
);
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);

-- migrate:down
DROP INDEX IF EXISTS idx_user_email;
DROP TABLE IF EXISTS users;