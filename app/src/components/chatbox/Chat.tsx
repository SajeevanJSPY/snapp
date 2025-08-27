import { usePanelContext } from '@/context/PanelContext';
import ChatBox from './ChatBox';
import ChatHeader from './Header';
import ChatInput from './Input';
import { MessageCircle } from 'lucide-react';

export default function Chat() {
    const { selectedUser } = usePanelContext();

    return (
        <>
            {selectedUser ? (
                <div className="h-full flex flex-col">
                    <ChatHeader />
                    <ChatBox />
                    <ChatInput />
                </div>
            ) : (
                <div className="h-full flex justify-center items-center">
                    <MessageCircle />
                </div>
            )}
        </>
    );
}
