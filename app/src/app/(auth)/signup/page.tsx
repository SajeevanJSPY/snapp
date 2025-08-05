'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/actions/auth';

export default function SignupPage() {
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
                <form action={action} className="space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    {state?.errors?.name && <p>{state.errors.name}</p>}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    {state?.errors?.email && <p>{state.errors.email}</p>}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                        />
                    </div>
                    {state?.errors?.password && (
                        <div>
                            <p>Password must:</p>
                            <ul>
                                {state.errors.password.map(error => (
                                    <li key={error}>- {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
