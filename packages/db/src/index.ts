import { Pool } from 'pg';
import { initPool } from './client';

export { User } from './users';
export { Device } from './devices';
export { Session } from './sessions';
export { UserConnection } from './connections';
export { Conversation, ConversationType, MessageType } from './messages';
export { healthCheck } from './helpers';

const pool = new Pool({
    connectionString: 'postgresql://snappadmin:snappadmin@localhost:5432/chatdb?sslmode=disable',
});

initPool(pool);
