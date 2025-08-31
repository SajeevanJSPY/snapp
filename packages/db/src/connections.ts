import { QueryResultRow } from 'pg';

import { query } from './client';
import { User } from './users';
import { DatabaseError } from '.';

export interface UserConnection extends QueryResultRow {
    user_id: number;
    contact_id: number;
    is_blocked: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface UserConnectionRequest extends QueryResultRow {
    request_id: number;
    request_from_id: number;
    request_to_id: number;
    is_accepted: boolean;
    created_at: Date;
}

export class UserConnection {
    private static readonly schema = 'public';
    private static readonly requestTable = 'user_connection_requests';
    private static readonly connectionTable = 'user_connections';
    private static readonly requestTableS = this.schema + '.' + this.requestTable;
    private static readonly connectionTableS = this.schema + '.' + this.connectionTable;

    static async createRequest(
        userId: number,
        connectionId: number
    ): Promise<UserConnectionRequest> {
        const result = await query<UserConnectionRequest>(
            `INSERT INTO ${this.requestTableS} (request_from_id, request_to_id) VALUES ($1, $2) RETURNING *`,
            [userId, connectionId]
        );
        if (!result.rows[0])
            throw DatabaseError.upsertError('unable to create the connection request');

        return result.rows[0];
    }

    static async getRequest(userId: number, connectionId: number): Promise<UserConnectionRequest> {
        const result = await query<UserConnectionRequest>(
            `SELECT * FROM ${this.requestTableS} WHERE request_from_id = $1 AND request_to_id = $2`,
            [connectionId, userId]
        );
        if (result.rowCount == 0)
            throw DatabaseError.dataNotFoundError('unable to find the connection request');

        return result.rows[0];
    }

    static async getRequests(userId: number): Promise<UserConnectionRequest[]> {
        const result = await query<UserConnectionRequest>(
            `SELECT * FROM ${this.requestTableS} WHERE request_to_id = $1`,
            [userId]
        );
        if (result.rowCount == 0)
            throw DatabaseError.dataNotFoundError('no connection requests were found');

        return result.rows;
    }

    static async deleteRequest(userId: number, connectionId: number) {
        const request = await this.getRequest(userId, connectionId);
        await query(`DELETE FROM ${this.requestTableS} WHERE request_id = $1`, [
            request.request_id,
        ]);
    }

    private static async updateAcceptRequest(requestToId: number, requestFromId: number) {
        await query(
            `UPDATE ${this.requestTableS} SET is_accepted = true WHERE request_to_id = $1 AND request_from_id = $2`,
            [requestToId, requestFromId]
        );
    }

    private static async createConnection(
        userId: number,
        connectionId: number
    ): Promise<UserConnection> {
        const result = await query<UserConnection>(
            `INSERT INTO ${this.connectionTableS} (user_id, contact_id) VALUES ($1, $2) RETURNING *`,
            [userId, connectionId]
        );
        if (result.rowCount == 0)
            throw DatabaseError.upsertError('unable to insert the connection');

        return result.rows[0];
    }

    static async getConnection(userId: number, connectionId: number): Promise<UserConnection> {
        const result = await query<UserConnection>(
            `SELECT * FROM ${this.connectionTableS} WHERE user_id = $1 AND contact_id = $2`,
            [userId, connectionId]
        );
        if (result.rowCount == 0)
            throw DatabaseError.dataNotFoundError('unable to find the connection');

        return result.rows[0];
    }

    static async getConnections(userId: number): Promise<User[]> {
        const result = await query<User>(
            `
                SELECT u.*
                FROM user_connections c
                LEFT JOIN users u ON u.user_id = c.contact_id
                WHERE c.user_id = $1;
            `,
            [userId]
        );
        if (result.rowCount == 0)
            throw DatabaseError.dataNotFoundError('no connections were found');

        return result.rows;
    }

    static async blockUser(userId: number, connectionId: number) {
        const connection = await this.getConnection(userId, connectionId);
        await query(
            `UPDATE ${this.connectionTableS} SET is_blocked = true WHERE user_id = $1 AND contact_id = $2`,
            [connection.user_id, connection.contact_id]
        );
    }

    static async acceptUserRequest(userId: number, connectionId: number) {
        const request = await this.getRequest(userId, connectionId);

        try {
            await query('BEGIN');
            await this.updateAcceptRequest(request.request_to_id, request.request_from_id);
            await this.createConnection(request.request_to_id, request.request_from_id);
            await this.createConnection(request.request_from_id, request.request_to_id);
            await query('COMMIT');
        } catch (e) {
            await query('ROLLBACK');
            throw e;
        }
    }
}
