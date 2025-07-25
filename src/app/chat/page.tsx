'use client';

import Chat from "@/components/chat/Chat";
import { ChatContactList } from "@/components/chat/ChatContactsList";
import { useChatContext } from "@/context/ChatContext";

import { motion } from "motion/react";

export default function ChatApp() {
    const { isChatBox } = useChatContext();

    if (!isChatBox) {
        return (
            <motion.div
                key="contacts"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute w-full h-full"
            >
                <ChatContactList />
            </motion.div>


        )
    } else {
        return (
            <motion.div
                key="chat"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute w-full h-full"
            >
                <Chat />
            </motion.div>
        )
    }
}
