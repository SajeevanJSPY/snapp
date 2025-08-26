'use client';

import Image from 'next/image';
import { useChatContext } from '@/context/ChatPanelContext';
import { User } from '@snapp/db';

export default function Contact({ contact }: { contact: User }) {
    const { setIsChatBox, setSelectedUser } = useChatContext();

    return (
        <div className="flex content-around items-center p-2 cursor-pointer hover:bg-base-300 rounded-xl">
            <div className="flex w-full items-center gap-4">
                <Image
                    src="/geto.jpeg"
                    alt={contact.username}
                    width={40}
                    height={40}
                    className="rounded-full border border-base-300"
                />
                <div className="flex-1">
                    <p className="font-semibold">{contact.username.toUpperCase()}</p>
                    <p className="text-sm text-base-content/60">
                        {contact.is_active ? 'active' : 'inactive'}
                    </p>
                </div>
                <button className="text-primary hover:text-primary-focus transition">
                    <i className="fa fa-comment"></i>
                </button>
            </div>
            <div>sent</div>
        </div>
    );
}
