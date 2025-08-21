'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { User } from '@snapp/db';

interface ChatPanelContextType {
    isChatBox: boolean;
    setIsChatBox: (chat: boolean) => void;
    selectedUser: User | undefined;
    setSelectedUser: (user: User) => void;
}

export const ChatPanelContext = createContext<ChatPanelContextType | null>(null);

export const ChatPanelProvider = ({ children }: { children: ReactNode }) => {
    const [isChatBox, setIsChatBox] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    return (
        <ChatPanelContext.Provider
            value={{ isChatBox, setIsChatBox, selectedUser, setSelectedUser }}
        >
            {children}
        </ChatPanelContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatPanelContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
