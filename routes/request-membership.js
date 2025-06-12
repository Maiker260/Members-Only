import express from "express";
import { membershipValidation } from "../controllers/membership-validator.js";
import { validationResult } from "express-validator";
import { dbQuery } from "../models/dbQuery.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", membershipValidation, async (req, res) => {
    const errors = validationResult(req);
    const { username } = req.user;

    if (!errors.isEmpty()) {
        req.session.membershipErrors = errors.mapped();

        return res.redirect("/");
    }

    if (req.body.membership === process.env.ADMINPWD) {
        await dbQuery(
            `
                UPDATE users
                SET isMember = true, isAdmin = true
                WHERE username = $1;
            `,
            [username]
        );
    }

    await dbQuery(
        `
        UPDATE users
        SET isMember = true
        WHERE username = $1;
        `,
        [username]
    );

    res.redirect("/");
});

export default router;
