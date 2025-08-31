import { QueryResultRow } from 'pg';

import { query } from './client';
import { DatabaseError } from '.';

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
        conversationType: ConversationType,
        title?: string
    ): Promise<Conversation> {
        const result = await query<Conversation>(
            `
                INSERT INTO ${this.conversationsTableS} (title, creator_id, conversation_type)
                VALUES ($1, $2, $3) RETURNING *
            `,
            [title, creatorId, conversationType]
        );
        if (!result.rows[0]) throw DatabaseError.upsertError('unable to insert the conversation');

        return result.rows[0];
    }

    static async createDirectConnection(creatorId: number): Promise<Conversation> {
        const result = await query<Conversation>(
            `
                INSERT INTO ${this.conversationsTableS} (creator_id, conversation_type)
                VALUES ($1, $2) RETURNING *
            `,
            [creatorId, ConversationType.Direct]
        );
        if (!result.rows[0])
            throw DatabaseError.upsertError('unable to create the direct conversation');

        return result.rows[0];
    }

    static async createGroupConnection(creatorId: number, title: string): Promise<Conversation> {
        const result = await query<Conversation>(
            `
                INSERT INTO ${this.conversationsTableS} (title, creator_id, conversation_type)
                VALUES ($1, $2, $3) RETURNING *
            `,
            [title, creatorId, ConversationType.Group]
        );
        if (!result.rows[0])
            throw DatabaseError.upsertError('unable to create the group conversation');

        return result.rows[0];
    }

    static async createParticipant(conversationId: number, userId: number): Promise<Participant> {
        const result = await query<Participant>(
            `
                INSERT INTO ${this.participantsTableS} (conversation_id, user_id)
                VALUES ($1, $2) RETURNING *
            `,
            [conversationId, userId]
        );
        if (!result.rows[0]) throw DatabaseError.upsertError('unable to insert the participant');

        return result.rows[0];
    }

    static async createMessage(
        conversationId: number,
        senderId: number,
        messageType: MessageType,
        content: string
    ): Promise<Message> {
        const result = await query<Message>(
            `
                INSERT INTO ${this.messagesTableS} (conversation_id, sender_id, message_type, content)
                VALUES ($1, $2, $3, $4) RETURNING *
            `,
            [conversationId, senderId, messageType, content]
        );
        if (!result.rows[0]) throw DatabaseError.upsertError('unable to insert the message');

        return result.rows[0];
    }
}
