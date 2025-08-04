'use client';

export default function ContactSkeleton() {
    return (
        <ul className="space-y-3 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="h-6 bg-gray-300 rounded w-3/4"></li>
            ))}
        </ul>
    );
}
