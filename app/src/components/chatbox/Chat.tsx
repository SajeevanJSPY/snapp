import { useChatContext } from '@/hooks/ChatUI';
import ChatBox from './ChatBox';
import ChatHeader from './Header';
import ChatInput from './Input';
import { MessageCircle } from 'lucide-react';

export default function Chat() {
    const { selectedUser } = useChatContext();

    return (
        <>
            {selectedUser ? (
                <div className="h-full flex flex-col bg-gradient-to-r from-[var(--color-info)] to-[var(--color-success)]">
                    <ChatHeader />
                    <ChatBox />
                    <ChatInput />
                </div>
            ) : (
                <div className="h-full flex justify-center items-center bg-gradient-to-r from-[var(--color-info)] to-[var(--color-success)]">
                    <MessageCircle />
                </div>
            )}
        </>
    );
}
