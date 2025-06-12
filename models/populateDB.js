#!/usr/bin/env node

import { dbQuery } from "./dbQuery.js";
import bcrypt from "bcryptjs";

// Avoid using the default in-memory session store from express-session.
const createTables = `
    CREATE TABLE IF NOT EXISTS session (
        sid varchar NOT NULL PRIMARY KEY,
        sess json NOT NULL,
        expire timestamp(6) NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON session (expire);

    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        profile_photo TEXT DEFAULT 'images/Profile-Picture.webp',
        isMember BOOLEAN DEFAULT FALSE,
        isAdmin BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        users_id INT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
    );
`;

async function insertDummyData() {
    const hashedPassword = await bcrypt.hash("testi", 10);

    const user1 = await dbQuery(
        `
            INSERT INTO users (name, lastname, username, password, isMember, isAdmin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `,
        ["Yo", "Merito", "YoMerito26", hashedPassword, true, true]
    );

    const user2 = await dbQuery(
        `
            INSERT INTO users (name, lastname, username, password, isMember, isAdmin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `,
        ["YoNo", "Meritont", "MeritoYo62", hashedPassword, true, false]
    );

    await dbQuery(
        `
            INSERT INTO messages (users_id, title, content)
            VALUES ($1, $2, $3);
        `,
        [user1[0].id, "Testing", "This is the YoMerito message"]
    );

    await dbQuery(
        `
            INSERT INTO messages (users_id, title, content)
            VALUES ($1, $2, $3);
        `,
        [user2[0].id, "Testing", "This is the YoNoMeritont message"]
    );
}

async function setupDatabase() {
    try {
        console.log("Creating tables...");
        await dbQuery(createTables);

        console.log("Inserting dummy data...");
        await insertDummyData();

        console.log("Database setup complete.");
    } catch (err) {
        console.error("Error setting up database:", err);
    }
}

setupDatabase();
