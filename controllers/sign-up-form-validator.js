import { body } from "express-validator";
import { dbQuery } from "../models/dbQuery.js";

export const validationForm = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isAlpha()
        .withMessage("Name should contain only letters."),

    body("lastname")
        .trim()
        .notEmpty()
        .withMessage("Last name is required.")
        .isAlpha()
        .withMessage("Last name should contain only letters."),

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage(
            "Username can only contain letters, numbers, underscores, dots, or dashes."
        )
        .isLength({ min: 4 })
        .withMessage("Username must be at least 4 characters long.")
        .custom((value) => {
            const hasLetter = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);

            if (!hasLetter || !hasNumber) {
                throw new Error(
                    "Username must contain both letters and numbers."
                );
            }

            return true;
        })
        .custom(async (value) => {
            const isUserDuplicated = await dbQuery(
                `SELECT username FROM users WHERE username = $1`,
                [value]
            );

            if (isUserDuplicated[0]) {
                throw new Error("Username already exist.");
            }

            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),

    body("passwordConfirmation")
        .notEmpty()
        .withMessage("Password confirmation is required.")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match."),
];
