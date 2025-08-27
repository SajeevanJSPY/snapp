import { ReactNode } from 'react';

import { usePanelContext } from '@/context/PanelContext';
import Chat from '../chatbox/Chat';
import Sidebar from '../ui/Sidebar';

export default function PanelLayout({ children }: { children: ReactNode }) {
    const { panel } = usePanelContext();

    return (
        <aside className="md:col-span-6 h-full bg-neutral">
            <div className="min-h-screen text-[0.75rem] flex">
                <Sidebar />
                {panel == 'chatbox' ? (
                    <section className="md:col-span-6 h-full bg-neutral">
                        <Chat />
                    </section>
                ) : panel == 'settings' ? (
                    <aside>Settings</aside>
                ) : panel == 'connections' ? (
                    <>{children}</>
                ) : (
                    ''
                )}
            </div>
        </aside>
    );
}
