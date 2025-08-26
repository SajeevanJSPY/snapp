'use client';

import { useChatContext } from '@/context/ChatPanelContext';
import Chat from '@/components/chatbox/Chat';
import { ReactNode } from 'react';

export default function ChatLayout({ children }: { children: ReactNode }) {
    const { isChatBox } = useChatContext();

    return (
        <main className="h-screen overflow-hidden block md:grid md:grid-cols-14">
            <aside className="md:col-span-6 h-full bg-neutral">{children}</aside>
            <section className="md:col-span-8 h-full overflow-y-auto">
                <Chat />
            </section>
        </main>
    );
}
