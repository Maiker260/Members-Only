import express from "express";
import { dbQuery } from "../models/dbQuery.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { loginValidator } from "../controllers/login-form-validator.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("login-page", {
        errors: [],
        oldInput: {},
    });
});

router.post("/", loginValidator, (req, res) => {
    const errors = validationResult(req);
    const { password, ...safeInput } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render("login-page", {
            errors: errors.mapped(),
            oldInput: safeInput,
        });
    }

    console.log(req.body);

    res.redirect("/");
});

export default router;
