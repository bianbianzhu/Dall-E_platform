import { Router } from 'express';
import healthCheckRouter from './healthCheck.js';
import postsRouter from './posts.js';
import dalleImagesRouter from './dalleImages.js';

const router = Router();

router.use('/health', healthCheckRouter);
router.use('/posts', postsRouter);
router.use('/dalleImages', dalleImagesRouter);

export default router;
