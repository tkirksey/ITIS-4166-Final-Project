import express from "express";
import { createZooHandler, deleteZooHandler, getAllZoosHandler, getZooByIdHandler, updateZooHandler } from "../controllers/zooControllers.js";
import { validateCreateData, validateId, validateUpdateData } from "../middleware/zooValidators.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeZooOwnership } from "../middleware/authorizeOwnership.js";

const router = express.Router();

router.get('/', authenticate, getAllZoosHandler);
router.get('/:id', authenticate, validateId, getZooByIdHandler);
router.post('/', authenticate, validateCreateData, createZooHandler);
router.put('/:id', authenticate, validateId, authorizeZooOwnership, validateUpdateData, updateZooHandler);
router.delete('/:id', authenticate, validateId, authorizeZooOwnership, deleteZooHandler);

export default router;