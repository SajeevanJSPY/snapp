import ContactsLayout from '@/components/contacts/ContactsLayout';
import ContactsWrapper from '@/components/contacts/ContactsWrapper';
import ChatLayout from '@/components/layout/ChatLayout';

export default function Page() {
    return (
        <ChatLayout>
            <ContactsLayout>
                <ContactsWrapper />
            </ContactsLayout>
        </ChatLayout>
    );
}
