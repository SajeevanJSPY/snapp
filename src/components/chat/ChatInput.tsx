export default function ChatInput() {
    return (
        <div className="bg-base-100 p-3 rounded-b-sm w-full">
            <div className="relative">
                <input type="text" placeholder="Type a message…"
                    className="w-full text-xs text-gray-600 bg-white px-4 py-2 rounded-full border border-base-300 outline-none" />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-900 text-white rounded-full flex items-center justify-center">
                    <i className="fa fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    );
}