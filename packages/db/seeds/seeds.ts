import { Pool } from 'pg';

import { initPool, removePool } from '../src/client';
import { Device, User, UserConnection } from '../src';
import { fixtures } from '../tests/fixtures';

const pool = new Pool({
    connectionString: 'postgresql://snappadmin:snappadmin@localhost:5432/chatdb?sslmode=disable',
});

initPool(pool);

async function seed() {
    let users: Record<string, number> = {};

    for (const key in fixtures) {
        const fixture = fixtures[key];
        const user = await User.create(
            fixture.user.email,
            fixture.user.username,
            fixture.user.about,
            fixture.user.password,
            fixture.user.avatar
        );
        users[user.username] = user.user_id;
        for (let i = 0; i < fixture.devices.length; ++i) {
            await Device.create(
                user.user_id,
                fixture.devices[i].userAgent,
                fixture.devices[i].refreshToken
            );
        }
    }

    await connection(users.eren, users.mikasa);
    await connection(users.eren, users.armin);
    await connection(users.eren, users.levi);
    await connection(users.mikasa, users.armin);
    await connection(users.mikasa, users.levi);
}

async function connection(userId: number, connectioId: number) {
    await UserConnection.createRequest(userId, connectioId);
    await UserConnection.acceptUserRequest(connectioId, userId);
}

seed()
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        pool.end();
        removePool(pool);
    });
