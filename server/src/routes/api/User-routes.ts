import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount
} from '../controllers/user-controller';
import { authenticate } from '../middleware/auth-middleware';

const router = express.Router();

// POST /users/register - Register new user
router.post('/register', registerUser);

// POST /users/login - Authenticate user
router.post('/login', loginUser);

// GET /users/profile - Get user profile (protected)
router.get('/profile', authenticate, getUserProfile);

// PUT /users/profile - Update user profile (protected)
router.put('/profile', authenticate, updateUserProfile);

// DELETE /users/profile - Delete account (protected)
router.delete('/profile', authenticate, deleteUserAccount);

export { router as userRouter };