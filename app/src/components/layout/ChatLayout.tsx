'use client';

import { ReactNode } from 'react';

import Chat from '@/components/chatbox/Chat';
import { useIsMobile } from '@snapp/ui';
import PanelLayout from './PanelLayout';

export default function ChatLayout({ children }: { children: ReactNode }) {
    const isMobile = useIsMobile();

    return (
        <main className="h-screen overflow-hidden block md:grid md:grid-cols-14">
            <aside className="md:col-span-6 h-full w-full bg-neutral">
                <PanelLayout children={children} />
            </aside>
            {!isMobile ? (
                <section className="md:col-span-8 h-full">
                    <Chat />
                </section>
            ) : (
                ''
            )}
        </main>
    );
}
