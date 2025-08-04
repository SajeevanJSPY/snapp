'use client';

import { useChatContext } from '@/hooks/ChatUI';
import { MessageCircle, Users2 } from 'lucide-react';
import { ReactNode } from 'react';
import Search from './Search';
import { Suspense } from 'react';
import ContactSkeleton from './Skeleton';

export default function ContactsLayout({ children }: { children: ReactNode }) {
    const { isChatBox, setIsChatBox } = useChatContext();

    return (
        <>
            <div className="bg-gradient-to-r from-[var(--color-info)] to-[var(--color-success)] text-base-content min-h-screen p-4 text-[0.75rem]">
                <div className="max-w-md mx-auto">
                    <div className="md:hidden flex justify-around shadow-sm py-3 mb-2">
                        <button
                            className={`text-sm flex items-center gap-2 px-4 py-2 rounded cursor-pointer ${!isChatBox ? 'bg-violet-100 text-violet-700' : ''}`}
                            onClick={() => setIsChatBox(false)}
                        >
                            <Users2 className="w-4 h-4" />
                            Contacts
                        </button>
                        <button
                            className={`text-sm flex items-center gap-2 px-4 py-2 rounded cursor-pointer ${
                                isChatBox ? 'bg-violet-100 text-violet-700' : ''
                            }`}
                            onClick={() => setIsChatBox(true)}
                        >
                            <MessageCircle className="w-4 h-4" />
                            Messages
                        </button>
                    </div>

                    <Search />
                    <Suspense fallback={<ContactSkeleton />}>{children}</Suspense>
                </div>
            </div>
        </>
    );
}
