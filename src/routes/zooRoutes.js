import express from "express";
import { createZooHandler, deleteZooHandler, getAllZoosHandler, getZooByIdHandler, updateZooHandler } from "../controllers/zooControllers.js";

const router = express.Router();

router.get('/', getAllZoosHandler);
router.get('/:id', getZooByIdHandler);
router.post('/', createZooHandler);
router.put('/:id', updateZooHandler);
router.delete('/:id', deleteZooHandler);

export default router;