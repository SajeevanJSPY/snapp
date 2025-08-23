-- migrate:up
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL CONSTRAINT email_length_check CHECK (char_length(trim(email)) > 5),
    username VARCHAR(20) NOT NULL CONSTRAINT username_length_check CHECK (char_length(trim(username)) > 3),
    about VARCHAR(100),
    password TEXT NOT NULL,
    avatar BYTEA,
    last_login TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);

-- migrate:down
DROP INDEX IF EXISTS idx_user_email;
DROP TABLE IF EXISTS users;