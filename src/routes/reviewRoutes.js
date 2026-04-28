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
import { rateLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.get('/', rateLimiter, authenticate, getAllReviewsHandler);
router.get('/:id', rateLimiter, authenticate, validateId, getReviewByIdHandler);
router.post('/', rateLimiter, authenticate, validateCreateData, createReviewHandler);
router.put('/:id', rateLimiter, authenticate, validateId, authorizeReviewOwnership, validateUpdateData, updateReviewHandler);
router.delete('/:id', rateLimiter, authenticate, validateId, authorizeReviewOwnership, deleteReviewHandler);

export default router;