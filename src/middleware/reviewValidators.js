import { body, param, oneOf } from "express-validator";
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [

    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage("Parameter 'id' must be a positive integer"),

    handleValidationErrors

];

export const validateCreateData = [

    body('rating')
    .exists({values:'falsy'})
    .withMessage("Field 'rating' is missing")
    .bail()
    .trim()
    .escape()
    .isInt({min:1, max:5})
    .withMessage("Field 'rating' must be an integer between 1 to 5"),

    body('content')
    .exists({values:'falsy'})
    .withMessage("Field 'content' is missing")
    .bail()
    .trim()
    .escape()
    .isLength({min:10, max:100})
    .withMessage("Field 'content' must be between 10-100 characters"),

    body('authorId')
    .exists({values:'falsy'})
    .withMessage("Field 'authorId' is missing")
    .bail()
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage("Field 'authorId' must be a positive integer"),

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
            body('rating').exists({values:'falsy'}),
            body('content').exists({values:'falsy'}),
            body('authorId').exists({values:'falsy'}),
            body('zooId').exists({values:'falsy'})
        ],
        {
            message: "Either field 'rating', 'content', 'authorId', or 'zooId' must be present"
        }
    ),

    body('rating')
    .optional()
    .bail()
    .trim()
    .escape()
    .isInt({min:1, max:5})
    .withMessage("Field 'rating' must be an integer between 1 to 5"),

    body('content')
    .optional()
    .bail()
    .trim()
    .escape()
    .isLength({min:10, max:100})
    .withMessage("Field 'content' must be between 10-100 characters"),

    body('authorId')
    .optional()
    .bail()
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage("Field 'authorId' must be a positive integer"),

    body('zooId')
    .optional()
    .bail()
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage("Field 'zooId' must be a positive integer"),

    handleValidationErrors

];