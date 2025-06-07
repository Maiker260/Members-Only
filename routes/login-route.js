import express from "express";
import { validationResult } from "express-validator";
import { loginValidator } from "../controllers/login-form-validator.js";
import passport from "passport";

const router = express.Router();

router.post(
    "/",
    loginValidator,
    async (req, res, next) => {
        const errors = validationResult(req);
        const { password, ...safeInput } = req.body;

        if (!errors.isEmpty()) {
            req.session.formErrors = errors.mapped();
            req.session.oldInput = safeInput;

            return res.redirect("/auth?mode=login");
        }

        next();
    },
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth?mode=login",
        failureMessage: true,
    })
);

export default router;
