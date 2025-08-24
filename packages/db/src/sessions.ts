import { QueryResultRow } from 'pg';
import { query } from './client';
import { findUserByEmail } from './users';

export interface Session extends QueryResultRow {
    session_id: string;
    user_id: number;
    current_device_id: string;
    last_updated: Date;
    created_at: Date;
}

export async function createSession(userId: number, deviceId?: string): Promise<Session> {
    const session = await query<Session>(
        `INSERT INTO public.sessions(user_id, current_device_id) VALUES ($1, $2) RETURNING *`,
        [userId, deviceId]
    );

    return session.rows[0];
}

export async function currentSession(userEmail: string): Promise<Session> {
    const user = await findUserByEmail(userEmail);
    const result = await query<Session>(`SELECT * FROM sessions WHERE user_id = $1`, [
        user.user_id,
    ]);
    if (!result.rows[0]) throw new Error('Session not found');

    return result.rows[0];
}

export async function switchCurrentSession(userId: number, deviceId: string) {
    await query(`SELECT switch_active_device($1, $2)`, [userId, deviceId]);
}
