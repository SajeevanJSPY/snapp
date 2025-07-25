'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

const ChatUIContext = createContext<ChatUIContextType | null>(null);

export const ChatUIProvider = ({ children }: { children: ReactNode }) => {
    const [isChatBox, setIsChatBox] = useState(false);

    return (
        <ChatUIContext.Provider value={{ isChatBox, setIsChatBox }}>
            {children}
        </ChatUIContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatUIContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};