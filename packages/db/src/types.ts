// PostgreSQL data model definitions
import type { QueryResultRow, QueryResult } from 'pg';

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
