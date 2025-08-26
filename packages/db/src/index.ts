import { PrismaClient } from './generated/prisma';

export const prisma = new PrismaClient();
export * from './generated/prisma';
export * from './prisma';

// export the types as PascalNames
export type {
    usercontacts as UserContacts,
    users as User1,
    devices as Devices,
    sessions as Session1,
    device_status as DeviceStatus,
} from './generated/prisma';

export { User } from './users';
export { Device } from './devices';
export { Session } from './sessions';
export { UserConnection } from './connections';
