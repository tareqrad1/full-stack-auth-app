import express from 'express';
import { signin, signout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';
const router = express.Router();

router.get('/me', protectedRoute, checkAuth);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;