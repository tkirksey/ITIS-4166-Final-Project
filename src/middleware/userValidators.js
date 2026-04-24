import { body, oneOf, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateId = [

    param('id')
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage("Parameter 'id' must be a positive integer."),

    handleValidationErrors

];

export const validateUserPost = [
    body('email')
    .exists({values:'falsy'})
    .withMessage("Field 'email' is missing")
    .bail()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Field 'email' is not an email")
    .bail()
    .normalizeEmail(),

    body('password')
    .exists({values:'falsy'})
    .withMessage("Field 'password' is missing")
    .bail()
    .isLength({min:8, max:64})
    .withMessage("Field 'password' needs to be between 8-64 characters"),

    body('role')
    .optional()
    .trim()
    .escape()
    .isIn(['USER', 'ADMIN'])
    .withMessage("Field 'role' is not either 'USER' or 'ADMIN'"),

    handleValidationErrors
];

export const validateUserUpdate = [
    oneOf([
        body('email').exists({values:'falsy'}),
        body('password').exists({values:'falsy'}),
        body('role').exists({values:'falsy'})
    ], {
        message: "Field 'email', 'password', or 'role' is required"
    }),

    body('email')
    .optional()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Field 'email' is not an email")
    .bail()
    .normalizeEmail(),

    body('password')
    .optional()
    .isLength({min:8, max:64})
    .withMessage("Field 'password' needs to be between 8-64 characters"),

    body('role')
    .optional()
    .trim()
    .escape()
    .isIn(['USER', 'ADMIN'])
    .withMessage("Field 'role' must be either 'USER' or 'ADMIN'"),

    handleValidationErrors
]