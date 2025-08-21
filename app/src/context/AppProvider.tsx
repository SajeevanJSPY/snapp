'use client';

import { User } from '@snapp/db';
import { ReactNode } from 'react';
import { ChatPanelProvider } from './ChatPanelContext';
import { ThemeProvider } from './ThemeContext';
import { CurrentUserProvider } from './CurrentUserContext';

export const AppProviders = ({
    children,
    currentUser,
}: {
    children: ReactNode;
    currentUser: User | null;
}) => {
    return (
        <ThemeProvider>
            <ChatPanelProvider>
                <CurrentUserProvider user={currentUser}>{children}</CurrentUserProvider>
            </ChatPanelProvider>
        </ThemeProvider>
    );
};
