import { ReactNode } from 'react';

import { usePanelContext } from '@/context/PanelContext';
import Chat from '../chatbox/Chat';
import { Sidebar, Settings, Profile, ConnectionRequests } from '../ui';

export default function PanelLayout({ children }: { children: ReactNode }) {
    const { panel } = usePanelContext();

    return (
        <div className="min-h-screen text-[0.75rem] flex">
            <Sidebar />
            {panel == 'chatbox' ? (
                <Chat />
            ) : panel == 'settings' ? (
                <Settings />
            ) : panel == 'connections' ? (
                <>{children}</>
            ) : panel == 'profile' ? (
                <Profile />
            ) : panel == 'requests' ? (
                <ConnectionRequests />
            ) : (
                ''
            )}
        </div>
    );
}
