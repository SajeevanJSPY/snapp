import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User } from '@snapp/db';

interface CurrentUserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const CurrentUserProvider = ({
    user,
    children,
}: {
    user: User | null;
    children: ReactNode;
}) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        setUserInfo(user);
    }, [user]);

    return (
        <CurrentUserContext.Provider value={{ user: userInfo, setUser: setUserInfo }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => {
    const ctx = useContext(CurrentUserContext);
    if (!ctx) {
        throw new Error('useCurrentUser must be used inside ChatUIProvider');
    }
    return ctx;
};
