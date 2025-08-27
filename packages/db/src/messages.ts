import { QueryResultRow } from 'pg';
import { query } from './client';

export enum ConversationType {
    Direct = 'direct',
    Group = 'group',
}

export enum MessageType {
    Text = 'text',
    Image = 'image',
    Audio = 'audio',
    Video = 'video',
}

export interface Conversation extends QueryResultRow {
    conversation_id: number;
    title: string | null;
    creator_id: number;
    conversation_type: ConversationType;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export interface Participant extends QueryResultRow {
    participant_id: number;
    conversation_id: number;
    user_id: number;
    joined_at: Date;
}

export interface Message extends QueryResultRow {
    message_id: number;
    conversation_id: number;
    sender_id: number;
    message_type: MessageType;
    content: string;
    sent_at: Date;
    updated_at: Date;
}

export class Conversation {
    private static readonly schema = 'public';
    private static readonly conversationsTable = 'conversations';
    private static readonly conversationsTableS = this.schema + '.' + this.conversationsTable;
    private static readonly participantsTable = 'participants';
    private static readonly participantsTableS = this.schema + '.' + this.participantsTable;
    private static readonly messagesTable = 'messages';
    private static readonly messagesTableS = this.schema + '.' + this.messagesTable;

    static async createConversation(
        creatorId: number,
        conversationType: ConversationType
    ): Promise<Conversation> {
        const conversation = await query<Conversation>(
            `
                INSERT INTO ${this.conversationsTableS} (creator_id, conversation_type)
                VALUES ($1, $2) RETURNING *
            `,
            [creatorId, conversationType]
        );

        return conversation.rows[0];
    }

    static async createParticipant(conversationId: number, userId: number): Promise<Participant> {
        const participant = await query<Participant>(
            `
                INSERT INTO ${this.participantsTableS} (conversation_id, user_id)
                VALUES ($1, $2) RETURNING *
            `,
            [conversationId, userId]
        );

        return participant.rows[0];
    }

    static async createMessage(
        conversationId: number,
        senderId: number,
        messageType: MessageType,
        content: string
    ): Promise<Message> {
        const message = await query<Message>(
            `
                INSERT INTO ${this.messagesTableS} (conversation_id, sender_id, message_type, content)
                VALUES ($1, $2, $3, $4) RETURNING *
            `,
            [conversationId, senderId, messageType, content]
        );

        return message.rows[0];
    }
}
