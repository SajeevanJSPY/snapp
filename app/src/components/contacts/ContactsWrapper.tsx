'use server';

import { User, UserConnection } from '@snapp/db';
import ContactList from './ContactList';
import { getUser } from '@/lib/auth';

export default async function ContactsWrapper() {
    const currentUser = await getUser()!;
    const currentUserId = currentUser?.user_id!;
    let contacts: User[] = [];

    try {
        contacts = await UserConnection.getConnections(currentUserId);
    } catch (error) {
        throw new Error('Internal Error');
    }

    return <ContactList key="contacts-list" contacts={contacts} />;
}
