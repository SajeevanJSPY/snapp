import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_JWT_KEY, decrypt } from '@/lib/sessions';
import { cookies } from 'next/headers';

const protectedRoutes = ['/'];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get(COOKIE_JWT_KEY)?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        console.log('this page is protected: redirects to login page');
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
