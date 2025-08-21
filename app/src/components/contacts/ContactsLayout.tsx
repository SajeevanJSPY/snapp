'use client';

import { useChatContext } from '@/hooks/useChatContext';
import { MessageCircle, Users2 } from 'lucide-react';
import { ReactNode, Suspense } from 'react';
import Search from './Search';
import ContactSkeleton from './Skeleton';
import Sidebar from './Sidebar';

export default function ContactsLayout({ children }: { children: ReactNode }) {
    const { isChatBox, setIsChatBox } = useChatContext();

    return (
        <>
            <div className="text-base-content min-h-screen p-1 text-[0.75rem] md:grid md:grid-cols-6 gap-1">
                <Sidebar currentUser={null} />
                <div className="md:col-span-5">
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
            </div>
        </>
    );
}
