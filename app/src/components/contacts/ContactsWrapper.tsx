'use server';

import { prisma } from '@/lib/prisma';
import ContactList from './ContactList';

export default async function ContactsWrapper() {
    const contacts = await prisma.users.findMany();

    return <ContactList key="contacts-list" contacts={contacts} />;
}
