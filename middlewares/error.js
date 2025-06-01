// Imports:
import ErrorHandler from '../utils/errorHandler.js';

export default function globalErrorHandler(err, _req, res, _next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error.';

  if (err.name === 'CastError') {
    const message = `Resource not found.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `The ${Object.keys(err.keyValue)} is already in use. Please use another one.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = `Json web token is invalid! Please try again.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'TokenExpiredError') {
    const message = `Json web token is expired! Please try again.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
