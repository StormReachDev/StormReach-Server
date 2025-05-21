// Imports:
import jsonWebToken from 'jsonwebtoken'
import User from '../models/userModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import asyncWrapper from './asyncWrapper.js'

export const validateUserSession = asyncWrapper(async function (req, _res, next) {
  const { token } = req.cookies

  if (!token) {
    return next(new ErrorHandler('Access denied. A valid login is required to proceed.', 401))
  }

  const decodedData = jsonWebToken.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decodedData.id)

  next()
})

export function validateUserRole(...roles) {
  return function (req, _res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Unauthorized access. The role '${req.user.role}' is not permitted to perform this action.`,
          403,
        ),
      )
    }

    next()
  }
}
