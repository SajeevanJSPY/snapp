import { client } from './client';

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
