'use client';

export default function ContactsSearchBar() {
    return (
        <header className="m-4">
            <h2 className="sr-only">Contacts</h2>
            <form role="search">
                <input
                    type="text"
                    placeholder="Search contacts"
                    className="w-full px-4 py-2 text-sm border border-base-300 rounded-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </form>
        </header>
    );
}
