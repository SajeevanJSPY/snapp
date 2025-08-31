import { Contact, Handshake, Settings, UserPen } from 'lucide-react';

import SidebarNavItem from './SidebarNavItem';

export default function Sidebar() {
    return (
        <aside className="w-[60px] shrink-0 bg-base-200">
            <div className="flex flex-col justify-between h-full py-6">
                <nav className="flex flex-col gap-6" aria-label="sidebar" role="tablist">
                    <SidebarNavItem panelValue="connections">
                        <Contact aria-hidden="true" />
                    </SidebarNavItem>
                    <SidebarNavItem panelValue="requests">
                        <Handshake aria-hidden="true" />
                    </SidebarNavItem>
                </nav>
                <nav className="flex flex-col gap-6" aria-label="sidebar" role="tablist">
                    <SidebarNavItem panelValue="settings">
                        <Settings aria-hidden="true" />
                    </SidebarNavItem>
                    <SidebarNavItem panelValue="profile">
                        <UserPen aria-hidden="true" />
                    </SidebarNavItem>
                </nav>
            </div>
        </aside>
    );
}
