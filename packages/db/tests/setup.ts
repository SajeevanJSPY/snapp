import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';
import { beforeAll, afterAll } from 'vitest';

const postgresqlDockerImage = 'postgres:17.5';

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
