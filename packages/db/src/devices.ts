import { QueryResultRow } from 'pg';
import { query } from './client';
import { findUserByEmail } from './users';

export interface Device extends QueryResultRow {
    id: number;
    user_id: number;
    device_id: string;
    user_agent?: string;
    refresh_token?: string;
    last_login_at: Date;
    last_updated_at: Date;
}

export async function addDeviceToUser(
    userEmail: string,
    userAgent?: string,
    refreshToken?: string
): Promise<Device> {
    let user = await findUserByEmail(userEmail);
    let device = await query<Device>(
        `INSERT INTO public.devices(user_id, user_agent, refresh_token) VALUES ($1, $2, $3) RETURNING *`,
        [user.user_id, userAgent, refreshToken]
    );

    return device.rows[0];
}

export async function retrieveAllDevicesFromUser(userEmail: string): Promise<Device[]> {
    let user = await findUserByEmail(userEmail);
    let devices = await query<Device>(`SELECT * FROM devices WHERE user_id = $1`, [user.user_id]);

    if (devices.rowCount == 0) throw new Error('no device are found');
    return devices.rows;
}
