import { QueryResultRow } from 'pg';
import { query } from './client';
import { User } from '.';

export interface Session extends QueryResultRow {
    session_id: string;
    user_id: number;
    current_device_id: string;
    last_updated: Date;
    created_at: Date;
}

export class Session {
    private static readonly schema = 'public';
    private static readonly sessionTable = 'sessions';
    private static readonly sessionTableS = this.schema + '.' + this.sessionTable;

    static async create(userId: number, deviceId?: string): Promise<Session> {
        const session = await query<Session>(
            `INSERT INTO ${this.sessionTableS} (user_id, current_device_id) VALUES ($1, $2) RETURNING *`,
            [userId, deviceId]
        );
        return session.rows[0];
    }

    static async getCurrent(userEmail: string): Promise<Session> {
        const user = await User.findByEmail(userEmail);
        const result = await query<Session>(
            `SELECT * FROM ${this.sessionTableS} WHERE user_id = $1`,
            [user.user_id]
        );

        if (!result.rows[0]) throw new Error('Session not found');
        return result.rows[0];
    }

    static async switch(userId: number, deviceId: string) {
        await query(`SELECT switch_active_device($1, $2)`, [userId, deviceId]);
    }
}
