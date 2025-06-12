import { body } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

export const membershipValidation = [
    body("membership")
        .trim()
        .notEmpty()
        .withMessage("Input is required.")
        .customSanitizer((value) => {
            if (value == process.env.ADMINPWD) {
                return value;
            }
            return value;
        })
        .custom((value) => {
            console.log(value);
            if (
                value !== "I want it that way" &&
                value !== process.env.ADMINPWD
            ) {
                throw new Error("Input does not match");
            }
            return true;
        }),
];
