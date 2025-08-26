import { query } from "./client";

export async function healthCheck() {
    await query(`SELECT 1`);
}
