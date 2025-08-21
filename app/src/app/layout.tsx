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
        <html lang="en" data-theme="lofi">
            <head>
                <link
                    href="https://cdn.jsdelivr.net/npm/daisyui@5"
                    rel="stylesheet"
                    type="text/css"
                />
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <link
                    href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </head>

            <body className="h-screen max-w-screen">
                <AppProviders currentUser={currentUser}>{children}</AppProviders>
            </body>
        </html>
    );
}
