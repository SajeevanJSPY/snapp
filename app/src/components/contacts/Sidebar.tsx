import { User } from '@snapp/db';
import { MessageCircle, Settings, UserPen } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar({ currentUser }: { currentUser: User | null }) {
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        setUserInfo(currentUser);
    }, []);

    return (
        <>
            <div className="md:col-span-1 md:flex md:flex-col hidden gap-6 py-6 bg-blue-600">
                <div
                    className="cursor-pointer flex items-center justify-center"
                    onClick={() => setOpen(true)}
                >
                    <UserPen />
                </div>
                <div className="cursor-pointer flex items-center justify-center">
                    <Settings />
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Details</h2>
                        {userInfo != null ? (
                            <p className="text-gray-700">
                                Username: {userInfo?.username}
                                Email: {userInfo?.email}
                                About: {userInfo?.about}
                            </p>
                        ) : (
                            ''
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
