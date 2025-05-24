// Imports:
import mongoose from 'mongoose'
import { modelConstants } from '../constants/models/index.js'

const paymentModel = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, modelConstants.payment.error.customer.required],
    },

    stripePaymentMethodId: {
      type: String,
      required: [true, modelConstants.payment.error.stripePaymentMethodId.required],
      trim: true,
    },

    stripePaymentIntentId: {
      type: String,
      required: [true, modelConstants.payment.error.stripePaymentIntentId.required],
      trim: true,
    },

    billingAddress: {
      type: String,
      required: [true, modelConstants.payment.error.billingAddress.required],
      trim: true,
      maxLength: [100, modelConstants.payment.error.billingAddress.maxLength],
    },

    zipCode: {
      type: String,
      required: [true, modelConstants.payment.error.zipCode.required],
      trim: true,
      maxLength: [5, modelConstants.payment.error.zipCode.maxLength],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Payment = mongoose.model('Payment', paymentModel)
export default Payment
