import { QueryResultRow, QueryResult } from 'pg';
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
export type UserResult = QueryResult<User>;

export async function addUser(
    email: string,
    username: string,
    about: string,
    password: string,
    avatar?: string
): Promise<User> {
    const results = await query<User>(
        `INSERT INTO public.users (email, username, about, password, avatar)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [email, username, about, password, avatar]
    );

    return results.rows[0];
}

export async function findUserByEmail(email: string) {
    const { rows } = await query<UserResult>(`SELECT * FROM users WHERE email = $1`, [email]);
    return rows[0] ?? null;
}
