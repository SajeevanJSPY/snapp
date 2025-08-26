'use server';

import { User } from '@snapp/db';
import ContactList from './ContactList';

export default async function ContactsWrapper() {
    let contacts: User[] = [];

    try {
        contacts.push(await User.findByEmail("eren@begins.rmb"));
    } catch (error) {
        throw new Error('Internal Error');
    }

    return <ContactList key="contacts-list" contacts={contacts} />;
}
