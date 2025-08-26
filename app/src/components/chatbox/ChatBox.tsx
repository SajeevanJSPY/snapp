import ChatMessage from './Message';

export default function ChatBox() {
    return (
        <div className="flex-1 overflow-y-auto">
            <ul className="flex flex-col space-y-1 h-full p-3 text-[0.75rem] overflow-y-auto">
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
            </ul>
        </div>
    );
}
