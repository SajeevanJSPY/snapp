-- migrate:up
CREATE OR REPLACE FUNCTION enforce_device_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT count(*) FROM devices WHERE user_id = NEW.user_id) >= 2 THEN
        RAISE EXCEPTION 'Device limit has been reached';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER device_limit_trigger
BEFORE INSERT ON devices
FOR EACH ROW
EXECUTE FUNCTION enforce_device_limit();

-- migrate:down
DROP TRIGGER IF EXISTS device_limit_trigger ON devices;
DROP FUNCTION IF EXISTS enforce_device_limit;