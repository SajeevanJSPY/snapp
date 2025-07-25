import ChatBox from "./ChatBox";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

export default function Chat() {
    return (
        <main className="relative bg-base-100 bg-red-500 w-full h-screen flex flex-col">
            <ChatHeader />
            <ChatBox />
            <ChatInput />
        </main>
    );
}
