import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const contacts = await prisma.users.findMany();

    const serializedContacts = contacts.map(user => ({
        ...user,
        user_id: user.user_id.toString()
    }));

    res.status(200).json(serializedContacts);
}
