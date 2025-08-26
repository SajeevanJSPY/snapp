import { COOKIE_JWT_KEY, decrypt } from '@/lib/sessions';
import { User } from '@snapp/db';

import { cookies } from 'next/headers';

export async function getUser(): Promise<User | null> {
    const cookie = (await cookies()).get(COOKIE_JWT_KEY)?.value;
    const session = await decrypt(cookie)!;

    const email = String(session?.userId!);
    const userInfo = await User.findByEmail(email);

    return userInfo;
}
