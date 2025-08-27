'use client';

import { User } from '@snapp/db';
import { ReactNode } from 'react';
import { PanelProvider } from './PanelContext';
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
            <PanelProvider>
                <CurrentUserProvider user={currentUser}>{children}</CurrentUserProvider>
            </PanelProvider>
        </ThemeProvider>
    );
};
