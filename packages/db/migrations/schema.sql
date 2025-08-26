SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: device_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.device_status AS ENUM (
    'active',
    'inactive',
    'blocked'
);


--
-- Name: add_contact(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.add_contact(p_username text, p_contact_name text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
    user_id_a BIGINT;
    user_id_b BIGINT;
BEGIN
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

    IF user_id_a iS NULL
    OR user_id_b IS NULL THEN RETURN FALSE;
    END IF;

    INSERT INTO
        user_contacts (user_id, contact_id, is_blocked)
    VALUES
        (user_id_a, user_id_b, FALSE);
    RETURN TRUE;
END;
$$;


--
-- Name: contact(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.contact(p_username text, p_contact_name text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
    user_id_a BIGINT;
    user_id_b BIGINT;
BEGIN
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
$$;


--
-- Name: enforce_device_limit(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.enforce_device_limit() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF (SELECT count(*) FROM devices WHERE user_id = NEW.user_id) >= 2 THEN
        RAISE EXCEPTION 'Device limit has been reached';
    END IF;
    RETURN NEW;
END;
$$;


--
-- Name: register_user(character varying, character varying, character varying, text, cidr, text, public.device_status); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.register_user(p_email character varying, p_username character varying, p_about character varying, p_password text, p_id_address cidr, p_user_agent text, p_device_status public.device_status DEFAULT 'active'::public.device_status) RETURNS TABLE(r_user_id bigint, r_device_id uuid)
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_user_id BIGINT;
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

    RETURN query
    SELECT
        new_user_id,
        new_device_id;
END;
$$;


--
-- Name: switch_active_device(integer, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.switch_active_device(p_user_id integer, p_device_id uuid) RETURNS void
    LANGUAGE plpgsql
    AS $$
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
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: devices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.devices (
    id integer NOT NULL,
    user_id integer NOT NULL,
    device_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_agent character varying(30),
    refresh_token text,
    last_login_at timestamp without time zone DEFAULT now(),
    last_updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: devices_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.devices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: devices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.devices_id_seq OWNED BY public.devices.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    session_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id integer NOT NULL,
    current_device_id uuid,
    last_updated timestamp without time zone DEFAULT now() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: user_connection_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_connection_requests (
    request_id integer NOT NULL,
    request_from_id integer NOT NULL,
    request_to_id integer NOT NULL,
    is_accepted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_cannot_be_contact CHECK ((request_from_id <> request_to_id))
);


--
-- Name: user_connection_requests_request_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_connection_requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_connection_requests_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_connection_requests_request_id_seq OWNED BY public.user_connection_requests.request_id;


--
-- Name: user_connections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_connections (
    user_id integer NOT NULL,
    contact_id integer NOT NULL,
    is_blocked boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_cannot_be_contact CHECK ((user_id <> contact_id))
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(30) NOT NULL,
    username character varying(20) NOT NULL,
    about character varying(100),
    password text NOT NULL,
    avatar bytea,
    last_login timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT email_length_check CHECK ((char_length(TRIM(BOTH FROM email)) > 5)),
    CONSTRAINT username_length_check CHECK ((char_length(TRIM(BOTH FROM username)) > 3))
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: devices id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.devices ALTER COLUMN id SET DEFAULT nextval('public.devices_id_seq'::regclass);


--
-- Name: user_connection_requests request_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connection_requests ALTER COLUMN request_id SET DEFAULT nextval('public.user_connection_requests_request_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: devices devices_device_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_device_id_key UNIQUE (device_id);


--
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- Name: devices devices_user_id_device_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_user_id_device_id_key UNIQUE (user_id, device_id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- Name: user_connection_requests user_connection_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connection_requests
    ADD CONSTRAINT user_connection_requests_pkey PRIMARY KEY (request_id);


--
-- Name: user_connection_requests user_connection_requests_request_from_id_request_to_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connection_requests
    ADD CONSTRAINT user_connection_requests_request_from_id_request_to_id_key UNIQUE (request_from_id, request_to_id);


--
-- Name: user_connections user_connections_user_id_contact_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connections
    ADD CONSTRAINT user_connections_user_id_contact_id_key UNIQUE (user_id, contact_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: idx_devices_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_devices_user_id ON public.devices USING btree (user_id);


--
-- Name: idx_session_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_user_id ON public.sessions USING btree (user_id);


--
-- Name: idx_sessions_current_device; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sessions_current_device ON public.sessions USING btree (current_device_id);


--
-- Name: idx_user_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_email ON public.users USING btree (email);


--
-- Name: devices device_limit_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER device_limit_trigger BEFORE INSERT ON public.devices FOR EACH ROW EXECUTE FUNCTION public.enforce_device_limit();


--
-- Name: devices devices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: sessions sessions_current_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_current_device_id_fkey FOREIGN KEY (current_device_id) REFERENCES public.devices(device_id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: user_connection_requests user_connection_requests_request_from_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connection_requests
    ADD CONSTRAINT user_connection_requests_request_from_id_fkey FOREIGN KEY (request_from_id) REFERENCES public.users(user_id);


--
-- Name: user_connection_requests user_connection_requests_request_to_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connection_requests
    ADD CONSTRAINT user_connection_requests_request_to_id_fkey FOREIGN KEY (request_to_id) REFERENCES public.users(user_id);


--
-- Name: user_connections user_connections_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connections
    ADD CONSTRAINT user_connections_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.users(user_id);


--
-- Name: user_connections user_connections_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_connections
    ADD CONSTRAINT user_connections_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20250802171002'),
    ('20250802173052'),
    ('20250802173457'),
    ('20250802173630'),
    ('20250802174205'),
    ('20250823153503');
