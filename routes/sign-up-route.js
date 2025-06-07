import express from "express";
import { validationResult } from "express-validator";
import { validationForm } from "../controllers/sign-up-form-validator.js";
import { dbQuery } from "../models/dbQuery.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", validationForm, async (req, res) => {
    const errors = validationResult(req);
    const { password, passwordConfirmation, ...safeInput } = req.body;
    const { name, lastname, username } = safeInput;
    const formatedUsername = username.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!errors.isEmpty()) {
        req.session.formErrors = errors.mapped();
        req.session.oldInput = safeInput;

        return res.redirect("/auth?mode=sign-up");
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
