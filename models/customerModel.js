// Imports:
import mongoose from 'mongoose'
import { modelConstants } from '../constants/models/index.js'

const customerModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, modelConstants.customer.error.user.required],
    },

    companyName: {
      type: String,
      maxLength: [50, modelConstants.customer.error.companyName.maxLength],
      minLength: [3, modelConstants.customer.error.companyName.minLength],
      trim: true,
    },

    plan: {
      type: String,
      required: [true, modelConstants.customer.error.plan.required],
      enum: modelConstants.customer.error.plan.enum,
      trim: true,
    },

    stripePriceId: {
      type: String,
      required: [true, modelConstants.customer.error.stripePriceId.required],
      trim: true,
    },

    stripeCustomerId: {
      type: String,
      required: [true, modelConstants.customer.error.stripeCustomerId.required],
      trim: true,
    },

    appointmentCredits: {
      type: Number,
      min: 0,
      default: 0,
    },

    autoReload: {
      type: Boolean,
      default: false,
    },

    onboardedAt: {
      type: Date,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
)

const Customer = mongoose.model('Customer', customerModel)
export default Customer
