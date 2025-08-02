import ChatMessage from './ChatMesssage';

export default function ChatBox() {
    return (
        <div className="w-full h-full flex-1 overflow-y-auto">
            <div className="h-full p-2 flex flex-col space-y-1 text-[0.75rem] overflow-y-auto">
                <ChatMessage content="That sounds great. I'd be happy with that." mine={false} />
                <ChatMessage
                    content="Could you send over some pictures of your dog, please?"
                    mine={false}
                />
                <ChatMessage content="Here are a few pictures. She's a happy girl!" mine={false} />
                <ChatMessage content="Here are a few pictures. She's a happy girl!" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage
                    content="She looks so happy! The time we discussed works. How long shall I take her out for?"
                    mine={false}
                />
            </div>
        </div>
    );
}
