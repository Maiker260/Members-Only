import express from "express";
import { dbQuery } from "../models/dbQuery.js";
import timeAgo from "../controllers/format-date.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const rawData = await dbQuery(`
        SELECT 
            messages.id AS id,
            messages.users_id,
            messages.title,
            messages.content,
            messages.created_at,
            users.username,
            users.profile_photo
        FROM messages
        JOIN users ON messages.users_id = users.id
        ORDER BY messages.created_at DESC;
    `);

    const messages = rawData.map((msg) => ({
        ...msg,
        timeAgo: timeAgo(msg.created_at),
    }));

    res.render("index", {
        user: req.user || "",
        messages: messages,
    });
});

export default router;
