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

const router = express.Router();

router.get('/', authenticate, getAllAnimalsHandler);
router.get('/:id', authenticate, validateId, getAnimalByIdHandler);
router.post('/', authenticate, validateCreateData, createAnimalHandler);
router.put('/:id', authenticate, validateId, authorizeAnimalOwnership, validateUpdateData, updateAnimalHandler);
router.delete('/:id', deleteAnimalHandler);

export default router;