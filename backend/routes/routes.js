import express from 'express';
import { createRequest, getAllRequests, updateRequest, getRequestById } from '../controllers/requestController.js';
const router = express.Router();


router.post('/', createRequest);
router.get('/', getAllRequests);
router.get('/:id', getRequestById);

router.put("/:id", updateRequest);

export default router;