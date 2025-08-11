'use server';

import { prisma, User } from '@snapp/db';
import ContactList from './ContactList';

export default async function ContactsWrapper() {
    let contacts: User[];

    try {
        contacts = await prisma.users.findMany();
    } catch (error) {
        throw new Error('Internal Error');
    }

    return <ContactList key="contacts-list" contacts={contacts} />;
}
