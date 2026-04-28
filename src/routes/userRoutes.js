import express from "express";
import { validateId, validateUserPost, validateUserUpdate } from "../middleware/userValidators.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { 
    createUserHandler, 
    deleteUserByIdHandler, 
    getAllUsersHandler, 
    getReviewsAuthoredByUserHandler, 
    getUserByIdHandler, 
    getZoosOwnedByUserHandler, 
    updateUserHandler
} from "../controllers/userControllers.js";
import { rateLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.get('/', rateLimiter, authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/:id', rateLimiter, authenticate, authorizeRoles('ADMIN'), validateId, getUserByIdHandler);
router.post('/', rateLimiter, authenticate, authorizeRoles('ADMIN'), validateUserPost, createUserHandler);
router.put('/:id', rateLimiter, authenticate, authorizeRoles('ADMIN'), validateId, validateUserUpdate, updateUserHandler);
router.delete('/:id', rateLimiter, authenticate, authorizeRoles('ADMIN'), validateId, deleteUserByIdHandler);

router.get('/:id/zoos', rateLimiter, authenticate, validateId, getZoosOwnedByUserHandler);
router.get('/:id/reviews', rateLimiter, authenticate, validateId, getReviewsAuthoredByUserHandler);

export default router;