import { Settings, UserPen } from 'lucide-react';
import { usePanelContext } from '@/context/PanelContext';

export default function Sidebar() {
    const { setPanel } = usePanelContext();

    return (
        <div className="w-[60px] shrink-0 flex flex-col gap-6 py-6 bg-base-200">
            <div
                className="cursor-pointer flex items-center justify-center"
                onClick={() => {
                    setPanel('connections');
                }}
            >
                <UserPen />
            </div>
            <div
                className="cursor-pointer flex items-center justify-center"
                onClick={() => {
                    setPanel('settings');
                }}
            >
                <Settings />
            </div>
        </div>
    );
}
