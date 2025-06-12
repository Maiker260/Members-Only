import express from "express";
import { dbQuery } from "../models/dbQuery.js";

const router = express.Router();

router.post("/:id", async (req, res) => {
    const messageId = req.params.id;

    if (!req.user || !req.user.isadmin) {
        return res.status(403).send("Unauthorized");
    }

    try {
        await dbQuery("DELETE FROM messages WHERE id = $1", [messageId]);
        res.redirect("/");
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).send("Server error");
    }
});

export default router;
