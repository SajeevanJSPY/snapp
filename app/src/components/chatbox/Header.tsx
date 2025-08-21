'use client';

import { useChatContext } from '@/context/ChatPanelContext';
import ResponsiveButton from '../common/Button';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@snapp/ui';

export default function ChatBoxHeader() {
    const { setIsChatBox, selectedUser } = useChatContext();
    const isMobile = useIsMobile();

    return (
        <div className="rounded-t-sm pt-2 min-w-2xs border-b">
            <div className="flex items-center justify-between px-4 pb-3">
                <div className="flex items-center gap-2">
                    {isMobile ? (
                        <ResponsiveButton>
                            <ChevronLeft
                                onClick={e => {
                                    e.preventDefault();
                                    setIsChatBox(false);
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
                        className="w-7 h-7 rounded-full border border-white"
                    />
                    <div className="text-xs leading-tight">
                        <p className="font-medium">{selectedUser?.username}</p>
                        <p className="text-white/70 text-[0.6rem]">{selectedUser?.about}</p>
                    </div>
                </div>
                <ResponsiveButton>
                    <i className="fa fa-ellipsis-v"></i>
                </ResponsiveButton>
            </div>
        </div>
    );
}
