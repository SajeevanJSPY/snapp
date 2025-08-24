import { QueryResultRow } from 'pg';
import { query } from './client';

export interface User extends QueryResultRow {
    user_id: number;
    email: string;
    username: string;
    about: string | null;
    password: string;
    avatar: Buffer | null;
    last_login: Date;
}

export async function addUser(
    email: string,
    username: string,
    about: string,
    password: string,
    avatar?: string
): Promise<User> {
    const result = await query<User>(
        `INSERT INTO public.users (email, username, about, password, avatar)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [email, username, about, password, avatar]
    );

    if (!result.rows[0]) throw new Error('failed to insert user');
    return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<User> {
    const result = await query<User>(`SELECT * FROM users WHERE email = $1`, [email]);
    if (!result.rows[0]) throw new Error('User not found');
    return result.rows[0];
}
