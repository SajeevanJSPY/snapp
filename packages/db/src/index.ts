import { PrismaClient } from './generated/prisma';

export const prisma = new PrismaClient();
export * from './generated/prisma';

// export the types as PascalNames
export type {
    usercontacts as UserContacts,
    users as User,
    devices as Devices,
    sessions as Session,
    device_status as DeviceStatus,
} from './generated/prisma';
