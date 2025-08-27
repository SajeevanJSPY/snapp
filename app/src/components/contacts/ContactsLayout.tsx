'use client';

import { ReactNode, Suspense } from 'react';
import Search from './Search';
import ContactSkeleton from './Skeleton';

export default function ContactsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-md mx-auto h-full flex-1">
            <Search />
            <Suspense fallback={<ContactSkeleton />}>{children}</Suspense>
        </div>
    );
}
