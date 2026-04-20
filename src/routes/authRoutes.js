import express from 'express';
import { loginHandler, signUpHandler } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup', signUpHandler);
router.post('/login', loginHandler);

export default router;