import express from "express";
import { dbQuery } from "../models/dbQuery.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("login-page");
});

export default router;
