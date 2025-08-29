import { MessageCircle } from 'lucide-react';

import { usePanelContext } from '@/context/PanelContext';
import ChatBox from './ChatBox';
import ChatHeader from './Header';
import ChatInput from './Input';

export default function Chat() {
    const { selectedUser } = usePanelContext();

    return (
        <section className="h-full w-full">
            {selectedUser ? (
                <div className="h-screen w-full flex flex-col">
                    <ChatHeader />
                    <ChatBox />
                    <ChatInput />
                </div>
            ) : (
                <div className="h-full flex justify-center items-center">
                    <MessageCircle />
                </div>
            )}
        </section>
    );
}
