import type { Metadata } from 'next';
import './globals.css';

import { ChatUIProvider } from '@/hooks/ChatUI';

export const metadata: Metadata = {
    title: 'Snapp',
    description: 'realtime chat application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                <ChatUIProvider>{children}</ChatUIProvider>
            </body>
        </html>
    );
}
