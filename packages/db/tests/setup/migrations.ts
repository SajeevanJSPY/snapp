import { readFileSync } from 'fs';
import path from 'path';

const migrationFolderName = 'migrations';

function getMigration(filename: string): string {
    const filepath = migrationFolderName + path.sep + filename;
    const sql = readFileSync(filepath, 'utf-8');
    const match = sql.match(/--\s*migrate:up\s*([\s\S]*?)(--\s*migrate:down|$)/i);
    if (!match) {
        throw new Error(`No migrate:up section found in ${filename}`);
    }
    return match[1].trim();
}

const usersFilename = '20250802171002_users.sql';
export const usersTableDDL = getMigration(usersFilename);
