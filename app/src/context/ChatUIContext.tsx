'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { User } from '@snapp/db';

export const ChatUIContext = createContext<ChatUIContextType | null>(null);

export const ChatUIProvider = ({ children }: { children: ReactNode }) => {
    const [isChatBox, setIsChatBox] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    return (
        <ChatUIContext.Provider value={{ isChatBox, setIsChatBox, selectedUser, setSelectedUser }}>
            {children}
        </ChatUIContext.Provider>
    );
};
