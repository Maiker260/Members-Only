#!/usr/bin/env node

import { Pool } from "pg";

const createTables = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        lastName TEXT NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isMember BOOLEAN NOT NULL,
        isAdmin BOOLEAN NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        users_id INT NOT NULL,
        content VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
    );
`;

function populateDB() {}
