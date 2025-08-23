import { beforeEach, assert, beforeAll, suite, test, expect } from 'vitest';
import { pool, usersTableDDL } from './setup';
import { userFixtures } from './fixtures';
import { UserResult } from '../src/types';

const eren = userFixtures.eren.user;

suite('users table', () => {
    beforeAll(async () => {
        await pool.query(usersTableDDL);
    });

    beforeEach(async () => {
        await pool.query('TRUNCATE TABLE public.users RESTART IDENTITY CASCADE');
    });

    test('should insert a valid user', async () => {
        const res = await pool.query(
            `INSERT INTO public.users (email, username, about, password, avatar)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
            [eren.email, eren.username, eren.about, eren.password, eren.avatar]
        );

        assert.equal(res.rowCount, 1);
        assert.equal(res.rows[0].email, eren.email);
        assert.equal(res.rows[0].username, eren.username);
        assert.equal(res.rows[0].about, eren.about);
    });

    test('should reject duplicate emails', async () => {
        await pool.query(
            `INSERT INTO public.users(email, username, about, password) VALUES ($1, $2, $3, $4)`,
            [eren.email, eren.username, eren.about, eren.password]
        );

        await expect(
            pool.query(
                `INSERT INTO public.users(email, username, about, password) VALUES ($1, $2, $3, $4)`,
                [eren.email, eren.username, eren.about, eren.password]
            )
        ).rejects.toThrowError(/duplicate key value/);
    });

    test('username length exceeds the length', async () => {
        let eren = userFixtures.eren.user;
        // username exceeds
        eren.username = `erenerenerenerenereneren`;

        await expect(
            pool.query(
                `INSERT INTO public.users (email, username, about, password)
                VALUES ($1, $2, $3, $4) RETURNING *
            `,
                [eren.email, eren.username, eren.about, eren.password]
            )
        ).rejects.toThrowError(/value too long/);

        // if the excess characters are space, they shouldn't cause error
        eren.username = `erenerenerenereneren`;
        // excess characters
        eren.username += `  `;
        const res: UserResult = await pool.query(
            `INSERT INTO public.users (email, username, about, password)
            VALUES ($1, $2, $3, $4) RETURNING *
            `,
            [eren.email, eren.username, eren.about, eren.password]
        );

        assert.notEqual(res.rows[0].username.length, eren.username.length);
    });
});
