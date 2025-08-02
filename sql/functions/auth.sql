-- verify the password
CREATE
OR REPLACE FUNCTION verify_user_password(p_email TEXT, p_password TEXT) RETURNS BOOLEAN AS $ $ DECLARE stored_hash TEXT;

BEGIN
SELECT
    password INTO stored_hash
FROM
    users
WHERE
    email = p_email;

IF stored_hash IS NULL THEN RETURN FALSE;

END IF;

RETURN stored_hash = crypt(p_password, stored_hash);

END;

$ $ LANGUAGE plpgsql;