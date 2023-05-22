import { Router } from 'express';
import { addPost, getAllPosts, getPostById } from '../controllers/posts.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', addPost);

export default router;
