import { ChatUIContext } from '@/context/ChatUIContext';
import { useContext } from 'react';

export const useChatContext = () => {
    const context = useContext(ChatUIContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
