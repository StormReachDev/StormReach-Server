import crypto from 'crypto'
import getResetPasswordEmail from '../constants/templates/email/index.js'
import asyncWrapper from '../middlewares/asyncWrapper.js'
import User from '../models/userModel.js'
import emailService from '../utils/emailService.js'
import ErrorHandler from '../utils/errorHandler.js'
import setAuthToken from '../utils/setAuthToken.js'

export const createUser = asyncWrapper(async function (req, res, _next) {
  const { name, email, password, phone, timeZone, role } = req.body

  await User.create({
    name,
    email,
    password,
    phone,
    timeZone,
    role,
  })

  return res.status(201).json({
    success: true,
    message: 'User created successfully',
  })
})

export const signIn = asyncWrapper(async function (req, res, next) {
  const { email, password } = req.body

  if (!email || !password) {
    return next(
      new ErrorHandler('Oops! Looks like you missed entering your email or password.', 400),
    )
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(
      new ErrorHandler('The email or password you entered is incorrect. Please try again.', 401),
    )
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler('The email or password you entered is incorrect. Please try again.', 401),
    )
  }

  return setAuthToken(user, 200, res)
})

export const signOut = asyncWrapper(async function (_req, res, _next) {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'You’ve successfully signed out.',
  })
})

export const forgotPassword = asyncWrapper(async function (req, res, next) {
  const { email } = req.body

  if (!email) {
    return next(new ErrorHandler('Oops! Looks like you missed entering your email.', 400))
  }

  const user = await User.findOne({ email })

  if (!user) {
    return next(new ErrorHandler("Oops! We couldn't find that user.", 404))
  }

  const resetPasswordToken = user.generateResetPasswordToken()
  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${process.env.CLIENT_SIDE_URL}/reset-password/${resetPasswordToken}`

  try {
    await emailService({
      email: user.email,
      subject: 'Password Recovery - StormReach',
      func: getResetPasswordEmail(user.name, resetPasswordUrl),
    })

    return res.status(200).json({
      success: true,
      message: `We've emailed a password reset link to ${user.email}. Please check your inbox to proceed.`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetTokenExpiresAt = undefined

    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message, 500))
  }
})

export const resetPassword = asyncWrapper(async function (req, res, next) {
  const { password, confirmPassword } = req.body
  const { token } = req.params

  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler('"Don’t forget to fill out both your password and confirm password.', 400),
    )
  }

  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    resetPasswordToken,
    resetTokenExpiresAt: {
      $gt: Date.now(),
    },
  })

  if (!user) {
    return next(
      new ErrorHandler(
        'Your password reset request is no longer valid. Please initiate the process again.',
        400,
      ),
    )
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler(
        'Oops! Your passwords didn’t match. Please double-check and try again.',
        400,
      ),
    )
  }

  user.password = password
  user.resetPasswordToken = undefined
  user.resetTokenExpiresAt = undefined

  await user.save()

  return res.status(200).json({
    success: true,
    message: 'Success! You’ve reset your password. Go ahead and sign in.',
  })
})

export const getCurrentUser = asyncWrapper(async function (req, res, _next) {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

export const changeUserPassword = asyncWrapper(async function (req, res, next) {
  const { currentPassword, confirmPassword, newPassword } = req.body

  if (!currentPassword || !confirmPassword || !newPassword) {
    return next(
      new ErrorHandler(
        'Incomplete request. Please enter your current password, new password, and confirm the new password.',
        400,
      ),
    )
  }

  const user = await User.findById(req.user.id).select('+password')
  const isPasswordMatched = await user.comparePassword(currentPassword)

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler('The current password you entered is incorrect. Please try again.', 400),
    )
  }

  if (confirmPassword !== newPassword) {
    return next(new ErrorHandler("The passwords you entered don't match. Please try again.", 400))
  }

  if (newPassword === currentPassword) {
    return next(new ErrorHandler("Please choose a password you haven't used before.", 400))
  }

  user.password = newPassword
  await user.save()

  setAuthToken(user, 200, res)
})

export const updateUserProfile = asyncWrapper(async function (req, res, _next) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    timeZone: req.body.timeZone,
  }

  const user = await User.findByIdAndUpdate(req.user.id, payload, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    message: 'Success! Your profile details have been updated.',
    user,
  })
})
