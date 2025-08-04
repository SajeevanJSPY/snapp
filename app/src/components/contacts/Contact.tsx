'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useChatContext } from '@/hooks/ChatUI';
import { users as User } from '@/generated/prisma';

export default function Contact({ contact }: { contact: User }) {
    const { setIsChatBox, setSelectedUser } = useChatContext();

    return (
        <motion.li
            whileHover={{ scale: 1.05 }}
            onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                e.preventDefault();
                setSelectedUser(contact);
                setIsChatBox(true);
            }}
            key={contact.user_id}
            className="flex items-center gap-4 p-2 rounded-xl border hover:bg-base-300 transition cursor-pointer"
        >
            <Image
                src="/geto.jpeg"
                alt={contact.username}
                width={30}
                height={30}
                className="rounded-full border border-base-300"
            />
            <div className="flex-1">
                <p className="font-semibold">{contact.username}</p>
                <p className="text-sm text-base-content/60">
                    {contact.is_active ? 'active' : 'inactive'}
                </p>
            </div>
            <button className="text-primary hover:text-primary-focus transition">
                <i className="fa fa-comment"></i>
            </button>
        </motion.li>
    );
}
