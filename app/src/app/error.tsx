'use client';

export default function GlobalError({ error }: { error: Error }) {
    return (
        <html>
            <body>
                <h1>Internal Error</h1>
                <p>Something went wrong. Please try again later.</p>
                {error.message}
            </body>
        </html>
    );
}
