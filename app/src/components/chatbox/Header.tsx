'use client';

import { usePanelContext } from '@/context/PanelContext';
import ResponsiveButton from '../common/Button';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@snapp/ui';

export default function ChatBoxHeader() {
    const { setPanel, selectedUser } = usePanelContext();
    const isMobile = useIsMobile();

    return (
        <header className="flex items-center gap-2 h-[44px] pl-4 bg-neutral border-l-2 border-primary">
            {isMobile ? (
                <ResponsiveButton>
                    <ChevronLeft
                        onClick={e => {
                            e.preventDefault();
                            setPanel('connections');
                        }}
                    />
                </ResponsiveButton>
            ) : (
                <></>
            )}

            <Image
                width={20}
                height={20}
                src="/geto.jpeg"
                alt="logo"
                className="w-7 h-7 rounded-full border-2 border-primary"
            />
            <div className="text-xs leading-tight">
                <p className="font-medium">{selectedUser?.username.toUpperCase()}</p>
                <p className="text-accent/70 text-[0.6rem]">online</p>
            </div>
        </header>
    );
}
