import express from "express";

import {
    getAllAnimalsHandler,
    getAnimalByIdHandler,
    createAnimalHandler,
    updateAnimalHandler,
    deleteAnimalHandler
} from '../controllers/animalControllers.js'

const router = express.Router();

router.get('/', getAllAnimalsHandler);
router.get('/:id', getAnimalByIdHandler);
router.post('/', createAnimalHandler);
router.put('/:id', updateAnimalHandler);
router.delete('/:id', deleteAnimalHandler);

export default router;