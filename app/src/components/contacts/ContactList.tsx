'use client';

import Contact from './Contact';
import { User } from '@snapp/db';

export default function ContactList({ contacts }: { contacts: User[] }) {
    return (
        <>
            <ul className="space-y-1 p-2 mx-1 rounded-2xl overflow-y-auto max-h-[calc(100vh-70px)] bg-secondary-content">
                {contacts &&
                    contacts.map(contact => <Contact key={contact.email} contact={contact} />)}
            </ul>
        </>
    );
}
