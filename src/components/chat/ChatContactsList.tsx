import { useChatContext } from "@/context/ChatContext";

export function ChatContactList() {
    const { setIsChatBox } = useChatContext();

    const contacts = [
        { id: 1, name: 'Goku', status: 'Online', avatar: '/images/goku.jpg' },
        { id: 2, name: 'Vegeta', status: 'Away', avatar: '/images/vegeta.jpg' },
        { id: 3, name: 'Piccolo', status: 'Offline', avatar: '/images/piccolo.jpg' },
    ];

    return (
        <>
            <main className="bg-base-100 text-base-content min-h-screen p-4">
                <div className="max-w-md mx-auto">
                    <header className="mb-4 flex space-x-5">
                        <h1 className="text-xl font-bold">Contacts</h1>
                        <h1 className="text-xl font-bold cursor-pointer" onClick={e => {
                            e.preventDefault();
                            setIsChatBox(true);
                        }}>Messages</h1>
                    </header>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search contacts"
                            className="w-full px-4 py-2 text-sm border border-base-300 rounded-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <ul className="space-y-3">
                        {contacts.map((contact) => (
                            <li
                                key={contact.id}
                                className="flex items-center gap-4 p-3 rounded-xl bg-base-200 hover:bg-base-300 transition"
                            >
                                <img
                                    src={contact.avatar}
                                    alt={contact.name}
                                    className="w-10 h-10 rounded-full border border-base-300"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{contact.name}</p>
                                    <p className="text-sm text-base-content/60">{contact.status}</p>
                                </div>
                                <button className="text-primary hover:text-primary-focus transition">
                                    <i className="fa fa-comment"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>


            <div hidden className="min-h-screen max-w-full bg-amber-700 pt-20 px-5">
                <div className="text-2xl font-bold py-2">Contacts</div>
                <div className="list-view">
                    <ul>
                        <li>
                            <span className="inline-block align-middle w-10 h-10 bg-white border-r-[50px]]"></span>
                            <span className="name">Wilfrid Wolfgang</span>
                        </li>
                        <li>
                            <span className="avatar"></span>
                            <span className="name">Mathias Bristol</span>
                        </li>
                        <li>
                            <span className="avatar"></span>
                            <span className="name">Tristin Bentley</span>
                        </li>
                        <li>
                            <span className="avatar"></span>
                            <span className="name">Edgar Roger</span>
                        </li>
                        <li>
                            <span className="avatar"></span>
                            <span className="name">Alois Ilya</span>
                        </li>
                        <li>
                            <span className="avatar"></span>
                            <span className="name">Gunter Darden</span>
                        </li>
                        <li>
                            <span className="avatar"></span>
                            <span className="name">Dwayne Thorben</span>
                        </li>
                        <li>
                            <span className="avatar"></span>
                            <span className="name">Waylon Thierry</span>
                        </li>
                    </ul>
                </div>
                <div className="details-view">
                    <div className="back"></div>
                    <div className="background"></div>
                    <ul>
                        <li><i className="fa fa-video-camera"></i>Chat</li>
                        <li><i className="fa fa-envelope"></i>blah@gmail.com</li>
                        <li><i className="fa fa-mobile"></i>(593)273-2847</li>
                        <li><i className="fa fa-home"></i>(328)723-1794</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
