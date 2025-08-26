import { beforeEach, assert, beforeAll, suite, test, expect } from 'vitest';

import { pool, usersTableDDL } from './setup';
import { fixtures } from './fixtures';
import { User } from '..';

const eren = fixtures.eren.user;

suite('users table', () => {
    beforeAll(async () => {
        await pool.query(usersTableDDL);
    });

    beforeEach(async () => {
        await pool.query('TRUNCATE TABLE public.users RESTART IDENTITY CASCADE');
    });

    test('should insert a valid user', async () => {
        const user = await User.create(
            eren.email,
            eren.username,
            eren.about,
            eren.password,
            eren.avatar
        );

        assert.equal(user.email, eren.email);
        assert.equal(user.username, eren.username);
        assert.equal(user.about, eren.about);
    });

    test('should reject duplicate emails', async () => {
        await User.create(eren.email, eren.username, eren.about, eren.password);
        await expect(
            User.create(eren.email, eren.username, eren.about, eren.password)
        ).rejects.toThrowError(/duplicate key value/);
    });

    test('username length exceeds the length', async () => {
        let eren = fixtures.eren.user;
        // username exceeds
        eren.username = `erenerenerenerenereneren`;

        await expect(
            User.create(eren.email, eren.username, eren.about, eren.password)
        ).rejects.toThrowError(/value too long/);

        // if the excess characters are space, they shouldn't cause error
        eren.username = `erenerenerenereneren`;
        // excess characters
        eren.username += `  `;
        const res = await User.create(eren.email, eren.username, eren.about, eren.password);

        assert.notEqual(res.username.length, eren.username.length);
    });
});
