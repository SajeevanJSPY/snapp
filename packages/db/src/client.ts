import { Pool, QueryResult, QueryResultRow, DatabaseError as PgError } from 'pg';
import {
    DatabaseErrorFactory,
    err,
    GenericDatabaseError,
    ok,
    Result,
    UnknownDatabaseError,
} from './errors';

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
    return pool.query<T>(text, params);
}

export async function safeQuery<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
): Promise<Result<QueryResult<T>, GenericDatabaseError>> {
    const pool = getPool();

    try {
        const result = await pool.query<T>(text, params);
        return ok(result);
    } catch (e) {
        if (e instanceof PgError) {
            return err(DatabaseErrorFactory.fromPgError(e));
        }
        return err(
            new UnknownDatabaseError('this error not coming from the pg Driver DatabaseError')
        );
    }
}
