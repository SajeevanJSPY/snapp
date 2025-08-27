-- migrate:up
CREATE TYPE conversation_type AS ENUM ('direct', 'group');
CREATE TABLE IF NOT EXISTS conversations (
    conversation_id SERIAL PRIMARY KEY,
    title VARCHAR(40) CONSTRAINT chk_conversations_title_min_length CHECK (char_length(trim(title)) > 2),
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
    content TEXT NOT NULL CONSTRAINT chk_messages_content_min_length CHECK (char_length(trim(content)) > 0),
    sent_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION enforce_conversation_type_title_rules()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.conversation_type = 'direct' AND NEW.title <> '' THEN
        RAISE EXCEPTION 'invalid_conversation: direct conversations must not have a title';
    END IF;
    IF NEW.conversation_type = 'group' AND NEW.title IS NULL THEN
        RAISE EXCEPTION 'invalid_conversation: group conversations must have a title';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_conversation_type_title_rules_before_insert
BEFORE INSERT ON conversations
FOR EACH ROW EXECUTE FUNCTION enforce_conversation_type_title_rules();

CREATE OR REPLACE FUNCTION enforce_direct_participants()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT conversation_type FROM conversations WHERE conversation_id = NEW.conversation_id) = 'direct'
    AND (SELECT count(*) FROM participants WHERE conversation_id = NEW.conversation_id) >= 2 THEN
        RAISE EXCEPTION 'Direct conversations can have only 2 participants';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_direct_participants
BEFORE INSERT ON participants
FOR EACH ROW EXECUTE FUNCTION enforce_direct_participants();

CREATE OR REPLACE FUNCTION validate_message_sender_and_participants()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM participants
        WHERE conversation_id = NEW.conversation_id
            AND user_id = NEW.sender_id
    ) THEN
        RAISE EXCEPTION 'sender must be in the conversation participant list';
    END IF;

    IF (SELECT count(*) FROM participants WHERE conversation_id = NEW.conversation_id) < 2 THEN
        RAISE EXCEPTION 'participants should be at least two people';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_message_validate_participants
BEFORE INSERT ON messages
FOR EACH ROW EXECUTE FUNCTION validate_message_sender_and_participants();

-- migrate:down
DROP TABLE IF EXISTS messages;
DROP TYPE IF EXISTS message_type;
DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS conversations;
DROP TYPE IF EXISTS conversation_type;
