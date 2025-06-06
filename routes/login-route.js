import express from "express";
import { validationResult } from "express-validator";
import { loginValidator } from "../controllers/login-form-validator.js";
import passport from "passport";

const router = express.Router();

router.get("/", async (req, res) => {
    const messages = req.session.messages || [];

    res.render("login-form", {
        errors: [],
        oldInput: {},
        failureMessage: messages[0] || null,
    });

    req.session.messages = [];
});

router.post(
    "/",
    loginValidator,
    async (req, res, next) => {
        const errors = validationResult(req);
        const { password, ...safeInput } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render("login-form", {
                errors: errors.mapped(),
                oldInput: safeInput,
            });
        }

        next();
    },
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureMessage: true,
    })
);

export default router;
