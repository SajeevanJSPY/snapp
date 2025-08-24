import { Pool, QueryResult, QueryResultRow } from 'pg';

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
