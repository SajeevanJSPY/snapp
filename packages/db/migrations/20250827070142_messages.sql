-- migrate:up
CREATE TYPE conversation_type AS ENUM ('direct', 'group');
CREATE TABLE IF NOT EXISTS conversations (
    conversation_id SERIAL PRIMARY KEY,
    title VARCHAR(40),
    creator_id INTEGER NOT NULL REFERENCES users(user_id),
    conversation_type conversation_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS participants (
    participant_id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(conversation_id),
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    joined_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (conversation_id, user_id)
);
CREATE TYPE message_type AS ENUM ('text', 'image', 'audio', 'video');
CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(conversation_id),
    sender_id INTEGER NOT NULL REFERENCES users(user_id),
    message_type message_type NOT NULL,
    content TEXT NOT NULL CONSTRAINT content_not_empty CHECK (char_length(trim(content)) > 0),
    sent_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- migrate:down
DROP TABLE IF EXISTS messages;
DROP TYPE IF EXISTS message_type;
DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS conversations;
DROP TYPE IF EXISTS conversation_type;
