// Imports:
import express from 'express';
import {
  changeUserPassword,
  createUser,
  forgotPassword,
  getCurrentUser,
  resetPassword,
  signIn,
  signOut,
  updateUserProfile,
} from '../controllers/user.js';
import {
  validateUserRole,
  validateUserSession,
} from '../middlewares/authGuard.js';

const router = express.Router();

// User routes:
router
  .route('/user/create')
  .post(
    validateUserSession,
    validateUserRole('admin', 'salesAgent'),
    createUser,
  );
router.route('/user/session').post(signIn);
router.route('/user/invalidate-session').get(signOut);
router.route('/user/forgot-password').post(forgotPassword);
router.route('/user/reset-password/:token').put(resetPassword);
router
  .route('/user/me')
  .get(validateUserSession, getCurrentUser)
  .put(validateUserSession, updateUserProfile);
router
  .route('/user/change-password')
  .put(validateUserSession, changeUserPassword);

export default router;
