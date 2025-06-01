// Imports:
import jsonWebToken from 'jsonwebtoken';
import User from '../models/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import asyncWrapper from './asyncWrapper.js';

export const validateUserSession = asyncWrapper(
  async function (req, _res, next) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(
        new ErrorHandler(
          'Access denied. A valid login is required to proceed.',
          401,
        ),
      );
    }
    const token = authorization.split(' ')[1];

    try {
      const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch {
      return next(
        new ErrorHandler(
          'Your session has expired or is invalid. Please login again to continue.',
          401,
        ),
      );
    }
  },
);

export function validateUserRole(...roles) {
  return function (req, _res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Unauthorized access. The role '${req.user.role}' is not permitted to perform this action.`,
          403,
        ),
      );
    }

    next();
  };
}
