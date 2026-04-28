import express from 'express';
import { loginHandler, signUpHandler } from '../controllers/authControllers.js';
import { loginValidator, signupValidator } from '../middleware/authValidators.js';
import { rateLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/signup', signupValidator, signUpHandler);
router.post('/login', rateLimiter, loginValidator, loginHandler);

export default router;