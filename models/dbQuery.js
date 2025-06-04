import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function dbQuery(query, params = []) {
    const client = await pool.connect();

    try {
        const results = await client.query(query, params);

        return results.rows;
    } catch (err) {
        console.error("Query Error:", err.message);
        throw err;
    } finally {
        client.release();
    }
}
