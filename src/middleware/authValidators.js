import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const signupValidator = [
    body('email')
    .exists({values:'falsy'})
    .withMessage("Field 'email' is missing")
    .bail()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Field 'email' is not an email address")
    .normalizeEmail(),

    body('password')
    .exists({values:'falsy'})
    .withMessage("Field 'password' is missing")
    .bail()
    .isLength({min: 8, max: 64})
    .withMessage("Field 'password' needs to be between 8-64 characters"),

    handleValidationErrors
];

export const loginValidator = [
    body('email')
    .exists({values:'falsy'})
    .withMessage("Field 'email' is missing")
    .bail()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Field 'email' is not an email address"),

    body('password')
    .exists({values:'falsy'})
    .withMessage("Field 'password' is missing")
    .bail(),

    handleValidationErrors
];