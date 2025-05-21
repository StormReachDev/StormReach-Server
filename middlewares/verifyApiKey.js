// Imports:
import ErrorHandler from '../utils/errorHandler.js'

export default function verifyApiKey(req, _res, next) {
  const secretKey = req.headers['stormy-api-key']
  const apiKey = process.env.STORMY_API_KEY

  if (!secretKey || secretKey !== apiKey) {
    return next(new ErrorHandler('Invalid or missing API key.', 403))
  }

  next()
}
