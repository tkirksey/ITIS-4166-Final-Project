import express from "express";
import { createZooHandler, deleteZooHandler, getAllZoosHandler, getAnimalsOwnedByZooHandler, getReviewsAboutZooHandler, getZooByIdHandler, updateZooHandler } from "../controllers/zooControllers.js";
import { validateCreateData, validateId, validateUpdateData } from "../middleware/zooValidators.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeZooOwnership } from "../middleware/authorizeOwnership.js";
import { rateLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.get('/', rateLimiter, authenticate, getAllZoosHandler);
router.get('/:id', rateLimiter, authenticate, validateId, getZooByIdHandler);
router.post('/', rateLimiter, authenticate, validateCreateData, createZooHandler);
router.put('/:id', rateLimiter, authenticate, validateId, authorizeZooOwnership, validateUpdateData, updateZooHandler);
router.delete('/:id', rateLimiter, authenticate, validateId, authorizeZooOwnership, deleteZooHandler);

router.get('/:id/animals', rateLimiter, authenticate, validateId, getAnimalsOwnedByZooHandler);
router.get('/:id/reviews', rateLimiter, authenticate, validateId, getReviewsAboutZooHandler);

export default router;