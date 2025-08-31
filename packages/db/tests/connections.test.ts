import { beforeEach, assert, beforeAll, suite, test, expect } from 'vitest';

import { pool, usersTableDDL, userConnectionsTableDDL } from './setup';
import { fixtures } from './fixtures';
import { User, UserConnection } from '..';

const eren = fixtures.eren.user;
const mikasa = fixtures.mikasa.user;

let user1: User;
let user2: User;

beforeAll(async () => {
    await pool.query(usersTableDDL);
    await pool.query(userConnectionsTableDDL);
    user1 = await User.create(eren.email, eren.username, eren.about, eren.password);
    user2 = await User.create(mikasa.email, mikasa.username, mikasa.about, mikasa.password);
});

beforeEach(async () => {
    await pool.query('TRUNCATE TABLE public.user_connection_requests RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE public.user_connections RESTART IDENTITY CASCADE');
});

suite('user_connection_requests table', () => {
    test('should insert a valid user request', async () => {
        const request = await UserConnection.createRequest(user1.user_id, user2.user_id);
        const requestQuery = await UserConnection.getRequest(user2.user_id, user1.user_id);

        assert.equal(request.request_id, requestQuery.request_id);
        assert.equal(request.request_from_id, requestQuery.request_from_id);
        assert.equal(request.request_to_id, requestQuery.request_to_id);
    });

    test('reject user request', async () => {
        await UserConnection.createRequest(user1.user_id, user2.user_id);

        await UserConnection.deleteRequest(user2.user_id, user1.user_id);
        await expect(UserConnection.getRequest(user2.user_id, user1.user_id)).rejects.toThrowError(
            /unable to find the connection request/
        );
    });
});

suite('user_connections table', () => {
    test('should insert a valid user connection', async () => {
        await UserConnection.createRequest(user1.user_id, user2.user_id);
        await UserConnection.acceptUserRequest(user2.user_id, user1.user_id);

        const connection = await UserConnection.getConnection(user1.user_id, user2.user_id);
        assert.equal(connection.user_id, user1.user_id);
        assert.equal(connection.contact_id, user2.user_id);
        assert.isFalse(connection.is_blocked);
    });

    test('accept a user request', async () => {
        let request = await UserConnection.createRequest(user1.user_id, user2.user_id);
        assert.isFalse(request.is_accepted);

        await UserConnection.acceptUserRequest(user2.user_id, user1.user_id);
        request = await UserConnection.getRequest(user2.user_id, user1.user_id);
        assert.isTrue(request.is_accepted);

        const user1Connections = await UserConnection.getConnections(user1.user_id);
        const user2Connections = await UserConnection.getConnections(user2.user_id);
        assert.equal(user1Connections.length, 1);
        assert.equal(user2Connections.length, 1);
    });

    test('block a user connection', async () => {
        await UserConnection.createRequest(user1.user_id, user2.user_id);
        await UserConnection.acceptUserRequest(user2.user_id, user1.user_id);
        let connection = await UserConnection.getConnection(user1.user_id, user2.user_id);
        assert.isFalse(connection.is_blocked);

        await UserConnection.blockUser(connection.user_id, connection.contact_id);
        connection = await UserConnection.getConnection(user1.user_id, user2.user_id);
        assert.isTrue(connection.is_blocked);
    });
});
