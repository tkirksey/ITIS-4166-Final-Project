import { body, oneOf, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateId = [

    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage("Parameter 'id' must be a postive integer"),

    handleValidationErrors

];

export const validateCreateData = [

    body('name')
        .exists({ values: 'falsy' })
        .withMessage("Field 'name' is missing")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Field 'name' should be at least 3 characters"),

    body('location')
        .exists({ values: 'falsy' })
        .withMessage("Field 'location' is missing")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Field 'location' should be at least 3 characters"),

    body('yearOpened')
        .exists({ values: 'falsy' })
        .withMessage("Field 'yearOpened' is missing")
        .bail()
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage("Field 'yearOpened' must be a positive integer"),

    body('ownerId')
        .optional()
        .trim()
        .escape()
        .isInt({min:1})
        .withMessage("Field 'ownerId' must be a positive integer"),

    handleValidationErrors

];

export const validateUpdateData = [

    oneOf(
        [
            body('name').exists({ values: 'falsy' }),
            body('location').exists({ values: 'falsy' }),
            body('yearOpened').exists({ values: 'falsy' }),
            body('ownerId').exists({ values: 'falsy' })
        ],
        {
            message: "Field 'name', 'location', 'yearOpened', or 'ownerId' needs to be present to update."
        }
    ),

    body('name')
        .optional()
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Field 'name' should be at least 3 characters"),

    body('location')
        .optional()
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Field 'location' should be at least 3 characters"),

    body('yearOpened')
        .optional()
        .bail()
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage("Field 'yearOpened' must be a positive integer"),

    body('ownerId')
        .optional()
        .bail()
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage("Field 'ownerId' must be a positive integer"),

    handleValidationErrors

];