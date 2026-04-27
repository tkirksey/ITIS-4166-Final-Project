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

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/:id', authenticate, authorizeRoles('ADMIN'), validateId, getUserByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), validateUserPost, createUserHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateId, validateUserUpdate, updateUserHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateId, deleteUserByIdHandler);

router.get('/:id/zoos', authenticate, validateId, getZoosOwnedByUserHandler);
router.get('/:id/reviews', authenticate, validateId, getReviewsAuthoredByUserHandler);

export default router;