CREATE
OR REPLACE FUNCTION register_user(
	p_email VARCHAR,
	p_username VARCHAR,
	p_about VARCHAR,
	p_password TEXT,
	p_id_address CIDR,
	p_user_agent TEXT,
	p_device_status device_status DEFAULT 'active'
) RETURNS TABLE (r_user_id BIGINT, r_device_id UUID) AS $ $ DECLARE new_user_id BIGINT;

new_device_id UUID;

BEGIN
INSERT INTO
	users (email, username, about, password)
VALUES
	(
		p_email,
		p_username,
		p_about,
		crypt(p_password, gen_salt('bf', 12))
	) RETURNING user_id INTO new_user_id;

INSERT INTO
	devices (
		user_agent,
		is_trusted,
		ip_address,
		status,
		user_id
	)
VALUES
	(
		p_user_agent,
		TRUE,
		p_id_address,
		p_device_status,
		new_user_id
	) RETURNING device_id INTO new_device_id;

RETURN QUERY
SELECT
	new_user_id,
	new_device_id;

END;

$ $ LANGUAGE plpgsql;

-- add contacts
CREATE
OR REPLACE FUNCTION contact(p_username TEXT, p_contact_name TEXT) RETURNS BOOLEAN AS $ $ DECLARE user_id_a BIGINT;

user_id_b BIGINT;

BEGIN -- get user ids
SELECT
	user_id INTO user_id_a
FROM
	users
WHERE
	username = p_username;

SELECT
	user_id INTO user_id_b
FROM
	users
WHERE
	username = p_contact_name;

IF user_id_a IS NULL
OR user_id_b IS NULL THEN RETURN FALSE;

END IF;

INSERT INTO
	user_contacts (user_id, contact_id, is_blocked)
VALUES
	(user_id_a, user_id_b, FALSE);

RETURN TRUE;

END;

$ $ LANGUAGE plpgsql;