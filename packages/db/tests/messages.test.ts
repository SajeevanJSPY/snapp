import { beforeEach, assert, beforeAll, suite, test, expect } from 'vitest';
import { pool, usersTableDDL, messagesTableDDL } from './setup';
import { fixtures } from './fixtures';
import { User, Conversation, ConversationType, MessageType } from '..';

let user1: User;
let user2: User;
let user3: User;

beforeAll(async () => {
    const eren = fixtures.eren.user;
    const mikasa = fixtures.mikasa.user;
    const armin = fixtures.armin.user;

    await pool.query(usersTableDDL);
    await pool.query(messagesTableDDL);
    user1 = await User.create(eren.email, eren.username, eren.about, eren.password);
    user2 = await User.create(mikasa.email, mikasa.username, mikasa.about, mikasa.password);
    user3 = await User.create(armin.email, armin.username, armin.about, armin.password);
});

beforeEach(async () => {
    await pool.query('TRUNCATE TABLE public.conversations RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE public.participants RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE public.messages RESTART IDENTITY CASCADE');
});

suite('conversation table', () => {
    test('should insert a valid conversation', async () => {
        const conversation = await Conversation.createConversation(
            user1.user_id,
            ConversationType.Direct
        );

        assert.equal(conversation.conversation_type, ConversationType.Direct);
        assert.equal(conversation.creator_id, user1.user_id);
        assert.isNull(conversation.deleted_at);
    });

    test('direct conversation cannot have a title', async () => {
        await expect(
            Conversation.createConversation(user1.user_id, ConversationType.Direct, 'group')
        ).rejects.toThrowError(/direct conversations must not have a title/);
    });

    test('group conversation with empty title should fail or length must greater than characters 3', async () => {
        await expect(
            Conversation.createConversation(user1.user_id, ConversationType.Group)
        ).rejects.toThrowError(/group conversations must have a title/);
    });

    test('group conversation with title shorter than 2 characters should fail', async () => {
        await expect(
            Conversation.createConversation(user1.user_id, ConversationType.Group, 'gr')
        ).rejects.toThrowError(/violates check constraint/);
    });
});

suite('participants table', () => {
    test('should insert a valid participant', async () => {
        const conversation = await Conversation.createConversation(
            user1.user_id,
            ConversationType.Direct
        );

        // adding the creator as a participant
        const participant = await Conversation.createParticipant(
            conversation.conversation_id,
            conversation.creator_id
        );
        assert.equal(conversation.creator_id, participant.user_id);
        assert.equal(conversation.conversation_id, participant.conversation_id);
    });

    test('direct conversation only allow two participants', async () => {
        const conversation = await Conversation.createConversation(
            user1.user_id,
            ConversationType.Direct
        );
        await Conversation.createParticipant(conversation.conversation_id, user1.user_id);
        await Conversation.createParticipant(conversation.conversation_id, user2.user_id);

        await expect(
            Conversation.createParticipant(conversation.conversation_id, user3.user_id)
        ).rejects.toThrowError(/Direct conversations can have only 2 participants/);
    });
});

suite('messages table', () => {
    test('should insert a valid message', async () => {
        const conversation = await Conversation.createConversation(
            user1.user_id,
            ConversationType.Direct
        );

        await Conversation.createParticipant(conversation.conversation_id, user1.user_id);
        await Conversation.createParticipant(conversation.conversation_id, user2.user_id);

        const message1 = await Conversation.createMessage(
            conversation.conversation_id,
            user1.user_id,
            MessageType.Text,
            "Come on. Let's hurry up and go home... to our house"
        );
        const message2 = await Conversation.createMessage(
            conversation.conversation_id,
            user2.user_id,
            MessageType.Text,
            "Okay. Let's go home"
        );
        assert.notDeepEqual(message1.message_id, message2.message_id);
        assert.equal(message1.sender_id, user1.user_id);
        assert.equal(message2.sender_id, user2.user_id);
        assert.equal(message1.conversation_id, message2.conversation_id);
    });

    test('sender must be in the participants list to send message', async () => {
        const conversation = await Conversation.createConversation(
            user1.user_id,
            ConversationType.Direct
        );

        await expect(
            Conversation.createMessage(
                conversation.conversation_id,
                user2.user_id,
                MessageType.Text,
                "Come on. Let's hurry up and go home... to our house"
            )
        ).rejects.toThrowError(/sender must be in the conversation participant list/);
    });

    test('cannot send message with less than two participants', async () => {
        const conversation = await Conversation.createConversation(
            user1.user_id,
            ConversationType.Direct
        );
        await Conversation.createParticipant(conversation.conversation_id, user1.user_id);
        await expect(
            Conversation.createMessage(
                conversation.conversation_id,
                user1.user_id,
                MessageType.Text,
                "Come on. Let's hurry up and go home... to our house"
            )
        ).rejects.toThrowError(/participants should be at least two people/);
    });
});
