'use client';

import Contact from './Contact';
import { User } from '@snapp/db';

export default function ContactList({ contacts }: { contacts: User[] }) {
    return (
        <>
            <ul className="space-y-3">
                {contacts &&
                    contacts.map(contact => <Contact key={contact.email} contact={contact} />)}
            </ul>
        </>
    );
}
