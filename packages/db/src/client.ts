import { Pool, QueryResult, QueryResultRow, DatabaseError as PgError } from 'pg';
import { DatabaseError } from '.';
import { err, ok, Result } from './errors';

let currentPool: Pool | null = null;

export function initPool(pool: Pool) {
    currentPool = pool;
}

export async function removePool(pool: Pool) {
    currentPool = null;
    await pool.end();
}

export function getPool(): Pool {
    if (!currentPool) throw new Error('DB pool not initialized');
    return currentPool;
}

export async function query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
): Promise<QueryResult<T>> {
    const pool = getPool();
    try {
        return pool.query<T>(text, params);
    } catch (e) {
        if (e instanceof PgError) {
            throw DatabaseError.fromPgError(e);
        }
        throw DatabaseError.unknownError();
    }
}

export async function safeQuery<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
): Promise<Result<QueryResult<T>, DatabaseError>> {
    const pool = getPool();

    try {
        const result = await pool.query<T>(text, params);
        return ok(result);
    } catch (e) {
        if (e instanceof PgError) {
            return err(DatabaseError.fromPgError(e));
        }
        return err(DatabaseError.unknownError('unknown_error: Non-Postgres error encountered'));
    }
}
