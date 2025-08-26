import type { Metadata } from 'next';
import './globals.css';

import { AppProviders } from '@/context/AppProvider';
import { getUser } from '@/lib/auth';

export const metadata: Metadata = {
    title: 'Snapp',
    description: 'realtime chat application',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getUser();

    return (
        <html lang="en" data-theme="light">
            <body className="h-screen max-w-screen bg-base-100 text-base-content">
                <AppProviders currentUser={currentUser}>{children}</AppProviders>
            </body>
        </html>
    );
}
