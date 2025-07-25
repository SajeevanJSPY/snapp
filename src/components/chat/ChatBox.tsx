import ChatMessage from "./ChatMesssage"

export default function ChatBox() {
    return (
        <main className="relative w-full h-screen bg-base-100 flex flex-col items-center justify-start">
            <div className="flex-1 w-full max-w-screen-sm px-3 py-2 space-y-3 overflow-y-auto flex flex-col text-[0.75rem] sm:text-sm">
                <ChatMessage content="That sounds great. I'd be happy with that." mine={false} />
                <ChatMessage content="Could you send over some pictures of your dog, please?" mine={false} />
                <ChatMessage content="Here are a few pictures. She's a happy girl!" mine={false} />
                <ChatMessage content="Here are a few pictures. She's a happy girl!" mine={true} />
                <ChatMessage content="Can you make it?" mine={true} />
                <ChatMessage content="She looks so happy! The time we discussed works. How long shall I take her out for?" mine={false} />
            </div>
        </main>
    );
}
