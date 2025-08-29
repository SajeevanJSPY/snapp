import { Cog, MessageCircle } from 'lucide-react';

import { usePanelContext } from '@/context/PanelContext';
import ChatBox from './ChatBox';
import ChatHeader from './Header';
import ChatInput from './Input';

export default function Chat() {
    const { selectedUser, panel } = usePanelContext();

    return (
        <section className="h-full w-full">
            {selectedUser && (panel == 'connections' || panel == 'chatbox') ? (
                <div className="h-screen w-full flex flex-col">
                    <ChatHeader />
                    <ChatBox />
                    <ChatInput />
                </div>
            ) : (
                <div className="h-full flex justify-center items-center">
                    {panel == 'connections' ? (
                        <MessageCircle />
                    ) : panel == 'settings' ? (
                        <Cog />
                    ) : (
                        ''
                    )}
                </div>
            )}
        </section>
    );
}
