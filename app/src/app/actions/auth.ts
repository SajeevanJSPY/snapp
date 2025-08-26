'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignupFormSchema, FormState, SignInSchema, SignInState } from '@/lib/definitions';
import { createSession, decrypt } from '@/lib/sessions';
import { User } from '@snapp/db';

export async function signin(state: SignInState, formData: FormData) {
    const validatedFields = SignInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // TODO: validate the password
    const { email, password } = validatedFields.data;

    const user = await User.findByEmail(email);
    if (!user) {
        console.log('users are not in the database');
        return;
    }

    console.log('create session for the user: ', user.email);
    await createSession(user.email);

    redirect('/');
}

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    console.log('the user has try to signup: ', email);

    // TODO:
    // check the user has already been signed in
    // insert the user into the database
    // create a session
    // redirect to `/`
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
