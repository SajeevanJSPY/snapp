import { useChatContext } from "@/context/ChatContext";

export default function ChatHeader() {
    const { setIsChatBox } = useChatContext();

    return (
        <div className="bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-t-sm pt-2">
            <div className="flex items-center justify-between px-4 pb-3">
                <div className="flex items-center gap-2">
                    <i className="fa fa-angle-left text-lg" onClick={e => {
                        e.preventDefault();
                        setIsChatBox(false);
                    }}></i>
                    <img src="images/avatar.jpg" alt="avatar" className="w-7 h-7 rounded-full border border-white" />
                    <div className="text-xs leading-tight">
                        <p className="font-medium">Samuel Green</p>
                        <p className="text-white/70 text-[0.6rem]">Available to Walk</p>
                    </div>
                </div>
                <i className="fa fa-ellipsis-v"></i>
            </div>
        </div>

    );
}