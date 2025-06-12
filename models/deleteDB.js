#!/usr/bin/env node

import { dbQuery } from "./dbQuery.js";

const DROP_SQL = `
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS session;
`;

async function deleteDatabase() {
    try {
        console.log("Dropping tables...");
        await dbQuery(DROP_SQL);
        console.log("Database deletion complete.");
    } catch (err) {
        console.error("Error deleting database:", err);
    }
}

deleteDatabase();
