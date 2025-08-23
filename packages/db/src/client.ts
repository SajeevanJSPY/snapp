import { Pool, QueryResultRow } from 'pg';

let currentPool: Pool | null = null;

export function initPool(pool: Pool) {
    currentPool = pool;
}

export function getPool(): Pool {
    if (!currentPool) throw new Error('DB pool not initialized');
    return currentPool;
}

export async function query<T extends QueryResultRow>(
    text: string,
    params?: any[]
): Promise<{ rows: T[] }> {
    const res = await getPool().query<T>(text, params);
    return res;
}
