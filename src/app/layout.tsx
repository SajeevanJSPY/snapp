import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Snapp",
    description: "realtime chat application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="lofi">
            <head>
                <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" />
            </head>

            <body className="min-h-screen max-w-screen">
                {children}
            </body>
        </html>
    );
}
