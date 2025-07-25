export default function ChatMessage({ content, mine }: { content: string, mine: boolean }) {
    if (mine) {
        return (
            <div className="bg-white text-gray-600 rounded-xl p-2 max-w-[70%] self-end shadow">
                {content}
            </div>
        );
    } else {
        return (
            <div className="bg-purple-100 text-purple-600 rounded-xl p-2 max-w-[70%]">
                {content}
            </div>
        );
    };

}