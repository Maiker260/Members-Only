import express from "express";
import { dbQuery } from "../models/dbQuery.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { messageTitle, messageContent } = req.body;
    const { id } = req.user;

    await dbQuery(
        `
        INSERT INTO messages (users_id, title, content)
        VALUES ($1, $2, $3);
    `,
        [id, messageTitle, messageContent]
    );

    res.redirect("/");
});

export default router;
