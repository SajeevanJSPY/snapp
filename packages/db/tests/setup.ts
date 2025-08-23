import { readFileSync } from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { beforeAll, afterAll } from 'vitest';

const postgresqlDockerImage = 'postgres:17.5';
const migrationFolderName = 'migrations';

let container: StartedPostgreSqlContainer;
export let pool: Pool;

beforeAll(async () => {
    container = await new PostgreSqlContainer(postgresqlDockerImage)
        .withDatabase('testdb')
        .withUsername('admin')
        .withPassword('admin')
        .start();

    pool = new Pool({
        connectionString: container.getConnectionUri(),
    });
});

afterAll(async () => {
    await pool.end();
    await container.stop();
});

export function getMigration(filename: string): string {
    const filepath = migrationFolderName + path.sep + filename;
    const sql = readFileSync(filepath, 'utf-8');
    const match = sql.match(/--\s*migrate:up\s*([\s\S]*?)(--\s*migrate:down|$)/i);
    if (!match) {
        throw new Error(`No migrate:up section found in ${filename}`);
    }
    return match[1].trim();
}
