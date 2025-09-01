'use client';

import { ReactNode } from 'react';

import Chat from '@/components/chatbox/Chat';
import { useIsMobile } from '@/hooks/useIsMobile';
import PanelLayout from './PanelLayout';

export default function ChatLayout({ children }: { children: ReactNode }) {
    const isMobile = useIsMobile();

    return (
        <main className="h-screen overflow-hidden block md:grid md:grid-cols-14">
            <div className="md:col-span-6 h-full w-full bg-neutral">
                <PanelLayout children={children} />
            </div>
            {!isMobile ? (
                <div className="md:col-span-8">
                    <Chat />
                </div>
            ) : (
                ''
            )}
        </main>
    );
}
