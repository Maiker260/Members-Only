import { body } from "express-validator";

export const membershipValidation = [
    body("membership")
        .trim()
        .notEmpty()
        .withMessage("Input is required.")
        .customSanitizer((value) => {
            if (value == "SUDO") {
                return "SUDO";
            }
        })
        .custom((value) => {
            if (value !== "I want it that way") {
                throw new Error("Input does not match");
            }
            return true;
        }),
];
