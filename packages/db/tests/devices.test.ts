import { beforeEach, assert, beforeAll, suite, test, expect } from 'vitest';

import { pool, usersTableDDL, devicesTableDDL, deviceLimitTriggerFunction } from './setup';
import { userFixtures } from './fixtures';
import { Device, User } from '..';

const eren = userFixtures.eren.user;
const device1 = userFixtures.eren.devices[0];
const device2 = userFixtures.eren.devices[1];

suite('devices table', () => {
    let user: User;

    beforeAll(async () => {
        await pool.query(usersTableDDL);
        await pool.query(devicesTableDDL);
        await pool.query(deviceLimitTriggerFunction);
        user = await User.create(eren.email, eren.username, eren.about, eren.password);
    });

    beforeEach(async () => {
        await pool.query('TRUNCATE TABLE public.devices RESTART IDENTITY CASCADE');
    });

    test('should insert a valid device', async () => {
        let device = await Device.create(user.email, device1.userAgent, device1.refreshToken);
        assert.isDefined(device);
        await Device.create(user.email, device1.userAgent, device1.refreshToken);
    });

    test('retrieve device informations from the user', async () => {
        await Device.create(user.email, device1.userAgent, device1.refreshToken);
        await Device.create(user.email, device2.userAgent, device2.refreshToken);

        let result = await Device.getAll(user.email);
        assert.equal(result.length, 2, 'failed to retrieve all device informations from the user');
        assert.equal(result[0].user_agent, device1.userAgent);
        assert.equal(result[0].refresh_token, device1.refreshToken);
        assert.equal(result[1].user_agent, device2.userAgent);
        assert.equal(result[1].refresh_token, device2.refreshToken);
    });

    test('device limit trigger', async () => {
        await Device.create(user.email, device1.userAgent, device1.refreshToken);
        await Device.create(user.email, device2.userAgent, device2.refreshToken);

        await expect(
            Device.create(user.email, device2.userAgent, device2.refreshToken)
        ).rejects.toThrowError(/Device limit has been reached/);
    });
});
