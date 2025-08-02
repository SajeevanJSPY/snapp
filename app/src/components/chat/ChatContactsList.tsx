'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

import { useChatContext } from '@/hooks/ChatUI';
import { users as User } from '@/generated/prisma';
import { MessageCircle, Users2 } from 'lucide-react';

export function ChatContactList() {
    const { isChatBox, setIsChatBox, setSelectedUser } = useChatContext();
    const [contactsList, setContactsList] = useState<User[]>([]);

    useEffect(() => {
        // TODO: change back this logic, it is temporary
        const wholeList: User[] = [];
        fetch('api/contacts')
            .then(res => res.json())
            .then(r => {
                r.map((v: User) => {
                    wholeList.push(v);
                });
            })
            .catch(err => console.error(err))
            .finally(() => {
                setTimeout(() => {
                    setContactsList(wholeList);
                }, 1000);
            });
    }, []);

    return (
        <div className="bg-gradient-to-r from-[var(--color-info)] to-[var(--color-success)] text-base-content min-h-screen p-4 text-[0.75rem]">
            <div className="max-w-md mx-auto">
                <div className="md:hidden flex justify-around shadow-sm py-1">
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

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search contacts"
                        className="w-full px-4 py-2 text-sm border border-base-300 rounded-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <ul className="space-y-3">
                    {contactsList.map(contact => (
                        <motion.li
                            whileHover={{ scale: 1.05 }}
                            onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                                e.preventDefault();
                                setSelectedUser(contact);
                                setIsChatBox(true);
                            }}
                            key={contact.user_id}
                            className="flex items-center gap-4 p-3 rounded-xl border hover:bg-base-300 transition cursor-pointer"
                        >
                            <Image
                                src="/geto.jpeg"
                                alt={contact.username}
                                width={20}
                                height={20}
                                className="w-10 h-10 rounded-full border border-base-300"
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
                    ))}
                </ul>
            </div>
        </div>
    );
}
