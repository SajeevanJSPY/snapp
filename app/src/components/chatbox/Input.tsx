import { SendHorizontal } from 'lucide-react';

import ResponsiveButton from '@/components/common/Button';

export default function ChatBoxInput() {
    return (
        <div className="rounded-b-sm w-full">
            <form className="w-full px-2 py-2">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type a message…"
                        className="w-full py-3 pl-4 pr-12 rounded-full border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                    <button
                        type="submit"
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-violet-600 hover:text-violet-800"
                        onClick={e => {
                            e.preventDefault();
                        }}
                    >
                        <ResponsiveButton>
                            <SendHorizontal className="w-5 h-5" />
                        </ResponsiveButton>
                    </button>
                </div>
            </form>
        </div>
    );
}
