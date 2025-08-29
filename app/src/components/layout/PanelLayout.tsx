import { ReactNode } from 'react';

import { usePanelContext } from '@/context/PanelContext';
import Chat from '../chatbox/Chat';
import Sidebar from '../ui/Sidebar';
import Settings from '../ui/Settings';

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
            ) : (
                ''
            )}
        </div>
    );
}
