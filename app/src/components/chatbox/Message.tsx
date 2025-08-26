export default function ChatBoxMessage({ content, mine }: { content: string; mine: boolean }) {
    return (
        <>
            {mine ? (
                <li className="self-end max-w-[70%] bg-primary text-primary-content p-2 rounded-xl shadow">
                    {content}
                </li>
            ) : (
                <li className="bg-secondary max-w-[70%] text-secondary-content rounded-xl p-2">
                    {content}
                </li>
            )}
        </>
    );
}
