import express from 'express';
import {
  createHabit,
  getAllHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  trackHabitCompletion
} from '../controllers/habit-controller.js';
import { authenticate } from '../middleware/auth-middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// GET /habits - Get all habits for user
router.get('/', getAllHabits);

// GET /habits/:id - Get specific habit
router.get('/:id', getHabitById);

// POST /habits - Create new habit
router.post('/', createHabit);

// PUT /habits/:id - Update habit
router.put('/:id', updateHabit);

// DELETE /habits/:id - Delete habit
router.delete('/:id', deleteHabit);

// POST /habits/:id/complete - Track habit completion
router.post('/:id/complete', trackHabitCompletion);

export { router as habitRouter };