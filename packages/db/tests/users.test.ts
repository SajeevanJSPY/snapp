import { beforeEach, assert, beforeAll, suite, test, expect } from 'vitest';
import { pool, usersTableDDL } from './setup';
import { userFixtures } from './fixtures';
import { addUser } from '../src/users';

const eren = userFixtures.eren.user;

suite('users table', () => {
    beforeAll(async () => {
        await pool.query(usersTableDDL);
    });

    beforeEach(async () => {
        await pool.query('TRUNCATE TABLE public.users RESTART IDENTITY CASCADE');
    });

    test('should insert a valid user', async () => {
        const res = await addUser(
            eren.email,
            eren.username,
            eren.about,
            eren.password,
            eren.avatar
        );

        assert.equal(res.email, eren.email);
        assert.equal(res.username, eren.username);
        assert.equal(res.about, eren.about);
    });

    test('should reject duplicate emails', async () => {
        await addUser(eren.email, eren.username, eren.about, eren.password);
        await expect(
            addUser(eren.email, eren.username, eren.about, eren.password)
        ).rejects.toThrowError(/duplicate key value/);
    });

    test('username length exceeds the length', async () => {
        let eren = userFixtures.eren.user;
        // username exceeds
        eren.username = `erenerenerenerenereneren`;

        await expect(
            addUser(eren.email, eren.username, eren.about, eren.password)
        ).rejects.toThrowError(/value too long/);

        // if the excess characters are space, they shouldn't cause error
        eren.username = `erenerenerenereneren`;
        // excess characters
        eren.username += `  `;
        const res = await addUser(eren.email, eren.username, eren.about, eren.password);

        assert.notEqual(res.username.length, eren.username.length);
    });
});
