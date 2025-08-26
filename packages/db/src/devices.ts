import { QueryResultRow } from 'pg';

import { query } from './client';

export interface Device extends QueryResultRow {
    id: number;
    user_id: number;
    device_id: string;
    user_agent?: string;
    refresh_token?: string;
    last_login_at: Date;
    last_updated_at: Date;
}

export class Device {
    private static readonly schema = 'public';
    private static readonly deviceTable = 'devices';
    private static readonly deviceTableS = this.schema + '.' + this.deviceTable;

    static async create(
        userId: number,
        userAgent?: string,
        refreshToken?: string
    ): Promise<Device> {
        const device = await query<Device>(
            `INSERT INTO ${this.deviceTableS} (user_id, user_agent, refresh_token) VALUES ($1, $2, $3) RETURNING *`,
            [userId, userAgent, refreshToken]
        );
        return device.rows[0];
    }

    static async getAll(userId: number): Promise<Device[]> {
        const devices = await query<Device>(
            `SELECT * FROM ${this.deviceTableS} WHERE user_id = $1`,
            [userId]
        );

        if (devices.rowCount == 0) throw new Error('no device were found');
        return devices.rows;
    }
}
