// Imports:
import express from 'express';
import { purchasePlan } from '../controllers/customer.js';
import {
  validateUserRole,
  validateUserSession,
} from '../middlewares/authGuard.js';

const router = express.Router();

// User routes:
router
  .route('/customer/purchase-plan')
  .post(
    validateUserSession,
    validateUserRole('admin', 'salesAgent'),
    purchasePlan,
  );

export default router;
