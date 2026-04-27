import express from "express";

import {
    getAllReviewsHandler,
    getReviewByIdHandler,
    createReviewHandler,
    updateReviewHandler,
    deleteReviewHandler
} from '../controllers/reviewControllers.js';

import {
    validateId,
    validateCreateData,
    validateUpdateData
} from '../middleware/reviewValidators.js'

import { authenticate } from '../middleware/authenticate.js';

import { authorizeReviewOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', authenticate, getAllReviewsHandler);
router.get('/:id', authenticate, validateId, getReviewByIdHandler);
router.post('/', authenticate, validateCreateData, createReviewHandler);
router.put('/:id', authenticate, validateId, authorizeReviewOwnership, validateUpdateData, updateReviewHandler);
router.delete('/:id', authenticate, validateId, authorizeReviewOwnership, deleteReviewHandler);

export default router;