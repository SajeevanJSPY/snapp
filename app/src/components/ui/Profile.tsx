import Image from 'next/image';

import { useCurrentUser } from '@/context/CurrentUserContext';

export default function Profile() {
    const { user } = useCurrentUser();

    return (
        <section
            id="profile-panel"
            role="tabpanel"
            aria-labelledby="profile-tab"
            className="flex-1 max-w-md mx-auto h-full mt-5"
        >
            <div className="mx-1">
                <header className="flex flex-col items-center text-center gap-3">
                    <figure className="w-24 h-24 rounded-full overflow-hidden">
                        <Image
                            width={50}
                            height={50}
                            src="/geto.jpeg"
                            className="w-full h-full object-cover"
                            alt="avatar"
                        />
                    </figure>
                    <h1 className="text-xl font-semibold">{user?.username.toUpperCase()}</h1>
                </header>

                <section aria-labelledby="about-heading" className="mt-4 px-2">
                    <h2 className="sr-only">About</h2>
                    <p className="text-sm text-center leading-relaxed">{user?.about}</p>
                </section>

                <footer className="flex justify-center mt-6">
                    <button
                        type="button"
                        role="button"
                        className="px-4 py-2 rounded-xl text-error bg-neutral-content cursor-pointer font-medium hover:text-error/90 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
                    >
                        Sign out
                    </button>
                </footer>
            </div>
        </section>
    );
}
