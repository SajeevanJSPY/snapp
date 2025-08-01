CREATE TYPE message_type AS ENUM ('text', 'audio', 'video', 'image');

CREATE TYPE conversation_type AS ENUM ('direct', 'group');

CREATE TABLE conversations (
    conversation_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL CONSTRAINT title_empty_check CHECK (title <> ''),
    creator BIGINT REFERENCES users (user_id),
    type conversation_type NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    deleted_at TIMESTAMP NULL
);

CREATE TABLE participants (
    id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT REFERENCES conversations,
    user_id BIGINT REFERENCES users,
    joined_at TIMESTAMP DEFAULT now(),
    UNIQUE (conversation_id, user_id)
);

CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT REFERENCES conversations,
    sender_id BIGINT REFERENCES users (id),
    type message_type NOT NULL,
    content TEXT NOT NULL CONSTRAINT content_empty_check CHECK (content <> ''),
    sent_at TIMESTAMP DEFAULT now()
);