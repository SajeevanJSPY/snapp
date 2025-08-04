export default function ChatBoxMessage({ content, mine }: { content: string; mine: boolean }) {
    return (
        <>
            {mine ? (
                <div className="bg-white text-gray-600 rounded-xl p-2 max-w-[70%] self-end shadow">
                    {content}
                </div>
            ) : (
                <div className="bg-purple-100 text-purple-600 rounded-xl p-2 max-w-[70%]">
                    {content}
                </div>
            )}
        </>
    );
}
