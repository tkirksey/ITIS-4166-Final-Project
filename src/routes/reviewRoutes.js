import express from "express";

import {
    getAllReviewsHandler,
    getReviewByIdHandler,
    createReviewHandler,
    updateReviewHandler,
    deleteReviewHandler
} from '../controllers/reviewControllers.js';

const router = express.Router();

router.get('/', getAllReviewsHandler);
router.get('/:id', getReviewByIdHandler);
router.post('/', createReviewHandler);
router.put('/:id', updateReviewHandler);
router.delete('/:id', deleteReviewHandler);

export default router;