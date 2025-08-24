import { Pool } from 'pg';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { beforeAll, afterAll } from 'vitest';
import { initPool, removePool } from '../../src/client';

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
    initPool(pool);
});

afterAll(async () => {
    await removePool(pool);
    await container.stop();
});
