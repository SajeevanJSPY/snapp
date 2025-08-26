import { beforeEach, assert, beforeAll, suite, test } from 'vitest';

import { devicesTableDDL, pool, sessionsTableDDL, usersTableDDL } from './setup';
import { fixtures } from './fixtures';
import { User, Device, Session } from '..';

const eren = fixtures.eren.user;
const devices = fixtures.eren.devices;

suite('sessions table', async () => {
    let user: User;
    let device1: Device;
    let device2: Device;

    beforeAll(async () => {
        await pool.query(usersTableDDL);
        await pool.query(devicesTableDDL);
        await pool.query(sessionsTableDDL);
        user = await User.create(eren.email, eren.username, eren.about, eren.password);
        device1 = await Device.create(user.user_id, devices[0].userAgent, devices[0].refreshToken);
        device2 = await Device.create(user.user_id, devices[1].userAgent, devices[1].refreshToken);
    });

    beforeEach(async () => {
        await pool.query('TRUNCATE TABLE public.sessions RESTART IDENTITY CASCADE');
    });

    test('user with no active session', async () => {
        const session = await Session.create(user.user_id);
        assert.equal(session.user_id, user.user_id);
        assert.isNull(session.current_device_id);
    });

    test('switch active device', async () => {
        // assiging the current session
        let session = await Session.create(user.user_id, device1.device_id);
        assert.equal(session.user_id, user.user_id);
        assert.isNotNull(session.current_device_id);
        assert.equal(session.current_device_id, device1.device_id);

        // switch device
        Session.switch(user.user_id, device2.device_id);
        session = await Session.getCurrent(user.email);
        assert.equal(session.current_device_id, device2.device_id);
    });
});
