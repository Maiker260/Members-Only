import express from "express";
import { validationResult } from "express-validator";
import { validationForm } from "../controllers/sign-up-form-validator.js";
import { dbQuery } from "../models/dbQuery.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", (req, res) => {
    res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    res.render("sign-up-form", {
        errors: [],
        oldInput: {},
    });
});

router.post("/", validationForm, async (req, res) => {
    const errors = validationResult(req);
    const { password, passwordConfirmation, ...safeInput } = req.body;
    const { name, lastname, username } = safeInput;
    const formatedUsername = username.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up-form", {
            errors: errors.mapped(),
            oldInput: safeInput,
        });
    }

    try {
        await dbQuery(
            `INSERT INTO users (name, lastname, username, password) VALUES ($1, $2, $3, $4)`,
            [name, lastname, formatedUsername, hashedPassword]
        );

        res.redirect("/");
    } catch (err) {
        console.error(err);
    }
});

export default router;
