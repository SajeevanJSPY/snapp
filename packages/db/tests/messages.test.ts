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
});

suite('messages table', () => {
    test('should insert a valid message', async () => {
        const conversation = await Conversation.createConversation(
            user1.user_id,
            ConversationType.Direct
        );
        const message = await Conversation.createMessage(
            conversation.conversation_id,
            user1.user_id,
            MessageType.Text,
            "Come on. Let's hurry up and go home... to our house"
        );

        assert.equal(message.message_type, MessageType.Text);
        assert.equal(message.sender_id, user1.user_id);
    });
});
