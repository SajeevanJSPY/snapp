-- migrate:up
CREATE TABLE IF NOT EXISTS public.sessions(
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    current_device_id UUID REFERENCES devices(device_id),
    last_updated TIMESTAMP NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_session_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_current_device ON sessions(current_device_id);

CREATE OR REPLACE FUNCTION switch_active_device(p_user_id INTEGER, p_device_id UUID)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM devices WHERE device_id = p_device_id AND user_id = p_user_id
    ) THEN
        RAISE EXCEPTION 'Device % does not exist for user %', p_device_id, p_user_id;
    END IF;

    -- clear current device
    UPDATE public.sessions
    SET current_device_id = NULL
    WHERE user_id = p_user_id;

    -- set new device
    UPDATE public.sessions
    SET current_device_id = p_device_id
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- migrate:down
DROP INDEX IF EXISTS idx_session_user_id;
DROP TABLE IF EXISTS sessions;