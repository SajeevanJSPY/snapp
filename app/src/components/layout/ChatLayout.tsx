'use client';

import { usePanelContext } from '@/context/PanelContext';
import Chat from '@/components/chatbox/Chat';
import { ReactNode } from 'react';
import { useIsMobile } from '@snapp/ui';

export default function ChatLayout({ children }: { children: ReactNode }) {
    const { panel } = usePanelContext();
    const isMobile = useIsMobile();

    return (
        <main className="h-screen overflow-hidden block md:grid md:grid-cols-14">
            {panel == 'chatbox' ? (
                <section className="md:col-span-6 h-full bg-neutral">
                    <Chat />
                </section>
            ) : panel == 'settings' ? (
                <aside className="md:col-span-6 h-full bg-neutral">Settings</aside>
            ) : panel == 'connections' ? (
                <aside className="md:col-span-6 h-full bg-neutral">{children}</aside>
            ) : (
                ''
            )}

            {!isMobile ? (
                <section className="md:col-span-8 h-full overflow-y-auto">
                    <Chat />
                </section>
            ) : (
                ''
            )}
        </main>
    );
}
