import { Settings, UserPen } from 'lucide-react';
import { usePanelContext } from '@/context/PanelContext';

export default function Sidebar() {
    const { panel, setPanel } = usePanelContext();

    return (
        <aside className="w-[60px] shrink-0 py-6 bg-base-200">
            <nav className="flex flex-col gap-6" aria-label="sidebar" role="tablist">
                <button
                    id="connections-tab"
                    type="button"
                    className="cursor-pointer flex items-center justify-center"
                    role="tab"
                    aria-selected={panel === 'connections'}
                    aria-controls="connections"
                    onClick={() => {
                        setPanel('connections');
                    }}
                >
                    <UserPen aria-hidden="true" />
                    <span className="sr-only">connections</span>
                </button>
                <button
                    id="settings-tab"
                    type="button"
                    className="cursor-pointer flex items-center justify-center"
                    role="tab"
                    aria-selected={panel === 'settings'}
                    aria-controls="settings-panel"
                    onClick={() => {
                        setPanel('settings');
                    }}
                >
                    <Settings aria-hidden="true" />
                    <span className="sr-only">settings</span>
                </button>
            </nav>
        </aside>
    );
}
