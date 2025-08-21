import { prisma, User } from '..';

export async function getCurrentUserInfo(email: string): Promise<User | null> {
    let data = await prisma.users.findUnique({ where: { email } })!;
    return data;
}
