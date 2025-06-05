import { body } from "express-validator";

export const loginValidator = [
    body("username").notEmpty().withMessage("Enter your Username."),

    body("password").notEmpty().withMessage("Enter your Password"),
];
