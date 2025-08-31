import { QueryResultRow } from 'pg';

import { query } from './client';
import { DatabaseError } from '.';

export interface User extends QueryResultRow {
    user_id: number;
    email: string;
    username: string;
    about: string | null;
    password: string;
    avatar: string | null;
    last_login: Date;
}

export class User {
    private static readonly schema = 'public';
    private static readonly userTable = 'users';
    private static readonly userTableS = this.schema + '.' + this.userTable;

    static async create(
        email: string,
        username: string,
        about: string,
        password: string,
        avatar?: string
    ): Promise<User> {
        const result = await query<User>(
            `INSERT INTO ${this.userTableS} (email, username, about, password, avatar)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [email, username, about, password, avatar]
        );
        if (!result.rows[0]) throw DatabaseError.upsertError('unable to insert the user');

        let user = result.rows[0];
        if (user.avatar) {
            user.avatar = Buffer.from(user.avatar).toString('base64');
        }
        return user;
    }

    static async findByEmail(email: string): Promise<User> {
        const result = await query<User>(`SELECT * FROM ${this.userTableS} WHERE email = $1`, [
            email,
        ]);
        if (!result.rows[0]) throw DatabaseError.dataNotFoundError('unable to find the user');

        let user = result.rows[0];
        if (user.avatar) {
            user.avatar = Buffer.from(user.avatar).toString();
        }
        return user;
    }
}
