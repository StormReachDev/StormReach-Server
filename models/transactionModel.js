// Imports:
import mongoose from 'mongoose'
import { modelConstants } from '../constants/models/index.js'

// TODO: LATER ON LINK THIS WITH DISPUTES AS WELL. THE REASON WHY PLAN IS OPTIONAL IS BECAUSE DISPUTES CAN HAPPEN AS WELL.
const transactionModel = new mongoose.Schema(
  {
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, modelConstants.transaction.error.customer.required],
    },

    amount: {
      type: Number,
      required: [true, modelConstants.transaction.error.amount.required],
      min: [0, modelConstants.transaction.error.amount.min],
    },

    currency: {
      type: String,
      required: [true, modelConstants.transaction.error.currency.required],
      trim: true,
    },

    plan: {
      type: String,
      enum: modelConstants.transaction.error.plan.enum,
      trim: true,
    },

    transactionType: {
      type: String,
      enum: modelConstants.transaction.error.transactionType.enum,
      required: [true, modelConstants.transaction.error.transactionType.required],
      trim: true,
    },

    transactionStatus: {
      type: String,
      enum: modelConstants.transaction.error.transactionStatus.enum,
      required: [true, modelConstants.transaction.error.transactionStatus.required],
      trim: true,
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

const Transaction = mongoose.model('Transaction', transactionModel)
export default Transaction
