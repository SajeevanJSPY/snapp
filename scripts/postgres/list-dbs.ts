import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DATABASE_URL);

const DB_NAME: string = "postgres";

const client = new Client({
    user: process.env.POSTGRES_NAME,
    host: process.env.IP_ADDR,
    database: DB_NAME,
    password: process.env.POSTGRES_NAME,
    port: Number(process.env.POSTGRES_PORT),
});

async function listDatabases(): Promise<void> {
    try {
        await client.connect();
        const res = await client.query("SELECT datname FROM pg_database WHERE datistemplate = false;");
        console.log("Databases:");
        res.rows.forEach((row: { datname: string }) => console.log("-", row.datname));
    } catch (error) {
        console.error("Error listing databases:", error);
    }
}

(async () => {
    try {
        await listDatabases();
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
})();
