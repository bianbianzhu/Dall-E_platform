import { Router } from 'express';
import { createDalleImage } from '../controllers/dalleImages.js';

const router = Router();

router.post('/', createDalleImage);

export default router;
