import express from 'express';
import { userRouter } from './User-routes.js';
import { habitRouter } from './habit-routes.js';

const router = express.Router();

// User routes
router.use('/users', userRouter);

// Habit routes
router.use('/habits', habitRouter);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export { router as apiRouter };