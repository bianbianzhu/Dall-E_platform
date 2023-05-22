import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Healthy');
  return;
});

export default router;
