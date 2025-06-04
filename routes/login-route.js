import express from "express";
import { dbQuery } from "../models/dbQuery.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await dbQuery("SELECT * FROM messages;");
    console.log(data);
    res.render("login-page");
});

export default router;
