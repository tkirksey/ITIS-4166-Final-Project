import { body, param, oneOf } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateId = [

    param('id')
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage("Parameter 'id' must be a positive integer"),

    handleValidationErrors

];

export const validateCreateData = [

    body('nickname')
    .exists({values:'falsy'})
    .withMessage("Field 'nickname' is missing")
    .bail()
    .trim()
    .escape()
    .isLength({min:3})
    .withMessage("Field 'nickname' must be at least 3 characters"),

    body('species')
    .exists({values:'falsy'})
    .withMessage("Field 'species' is missing")
    .bail()
    .trim()
    .escape()
    .isLength({min:3})
    .withMessage("Field 'species' must be at least 3 characters"),

    body('zooId')
    .exists({values:'falsy'})
    .withMessage("Field 'zooId' is missing")
    .bail()
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage("Field 'zooId' must be a positive integer"),

    handleValidationErrors

];

export const validateUpdateData = [

    oneOf(
        [
            body('nickname').exists({values:'falsy'}),
            body('species').exists({values:'falsy'}),
            body('zooId').exists({values:'falsy'})
        ],
        {
            message: "Field 'nickname', 'species', or 'zooId' is required"
        }
    ),

    body('nickname')
    .optional()
    .bail()
    .trim()
    .escape()
    .isLength({min:3})
    .withMessage("Field 'nickname' must be at least 3 characters"),

    body('species')
    .optional()
    .bail()
    .trim()
    .escape()
    .isLength({min:3})
    .withMessage("Field 'species' must be at least 3 characters"),

    body('zooId')
    .optional()
    .bail()
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage("Field 'zooId' must be a positive integer"),

    handleValidationErrors

];