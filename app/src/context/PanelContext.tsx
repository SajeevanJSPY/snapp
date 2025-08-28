'use client';

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { User } from '@snapp/db';
import { useIsMobile } from '@snapp/ui';

export type Panel = 'connections' | 'settings' | 'chatbox';

interface PanelContextType {
    panel: Panel;
    setPanel: (panel: Panel) => void;
    selectedUser: User | null;
    setSelectedUser: (user: User) => void;
}

export const PanelContext = createContext<PanelContextType | null>(null);

export const PanelProvider = ({ children }: { children: ReactNode }) => {
    const [panel, _setPanel] = useState<Panel>('connections');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!isMobile && panel == 'chatbox') {
            setPanel('connections');
        }
    }, [isMobile]);

    const setPanel = (panel: Panel) => {
        if (panel == 'chatbox' && !isMobile) {
            return;
        }
        _setPanel(panel);
    };

    return (
        <PanelContext.Provider value={{ panel, setPanel, selectedUser, setSelectedUser }}>
            {children}
        </PanelContext.Provider>
    );
};

export const usePanelContext = () => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error('usePanelContext must be used within a PanelProvider');
    }
    return context;
};
