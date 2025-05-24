// Imports:
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import mongoose from 'mongoose'
import validator from 'validator'
import { modelConstants } from '../constants/models/index.js'

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, modelConstants.user.error.name.required],
      maxLength: [30, modelConstants.user.error.name.maxLength],
      minLength: [8, modelConstants.user.error.name.minLength],
      trim: true,
    },

    email: {
      type: String,
      required: [true, modelConstants.user.error.email.required],
      unique: true,
      validate: [validator.isEmail, modelConstants.user.error.email.invalid],
      trim: true,
    },

    password: {
      type: String,
      required: [true, modelConstants.user.error.password.required],
      minLength: [8, modelConstants.user.error.password.minLength],
      select: false,
      validate: [validator.isStrongPassword, modelConstants.user.error.password.weak],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, modelConstants.user.error.phone.required],
      unique: true,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, 'any', { strictMode: true })
        },

        message: modelConstants.user.error.phone.invalid,
      },
      trim: true,
    },

    timeZone: {
      type: String,
      trim: true,
      required: [true, modelConstants.user.error.timeZone.required],
      validate: {
        validator: (tz) => moment.tz.zone(tz) !== null,
        message: modelConstants.user.error.timeZone.invalid,
      },
    },

    role: {
      type: String,
      required: [true, modelConstants.user.error.role.required],
      trim: true,
      enum: modelConstants.user.error.role.enum,
    },

    resetPasswordToken: String,
    resetTokenExpiresAt: Date,

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
)

userModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

userModel.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

userModel.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password)
}

userModel.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetTokenExpiresAt = Date.now() + 15 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userModel)
export default User
