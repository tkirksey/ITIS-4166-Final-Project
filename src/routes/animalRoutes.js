import express from "express";

import {
    getAllAnimalsHandler,
    getAnimalByIdHandler,
    createAnimalHandler,
    updateAnimalHandler,
    deleteAnimalHandler
} from '../controllers/animalControllers.js';

import {
    validateId,
    validateCreateData,
    validateUpdateData
} from '../middleware/animalValidators.js';

import {
    authenticate
} from '../middleware/authenticate.js'

import {
    authorizeAnimalOwnership
} from "../middleware/authorizeOwnership.js";

import {
    rateLimiter
} from '../middleware/rateLimit.js';

const router = express.Router();

router.get('/', rateLimiter, authenticate, getAllAnimalsHandler);
router.get('/:id', rateLimiter, authenticate, validateId, getAnimalByIdHandler);
router.post('/', rateLimiter, authenticate, validateCreateData, createAnimalHandler);
router.put('/:id', rateLimiter, authenticate, validateId, authorizeAnimalOwnership, validateUpdateData, updateAnimalHandler);
router.delete('/:id', rateLimiter, authenticate, validateId, authorizeAnimalOwnership, deleteAnimalHandler);

export default router;