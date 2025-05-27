// Imports:
import { plans } from '../data/plans/index.js';

export const modelConstants = {
  user: {
    error: {
      name: {
        required: 'The "name" field is required. Please provide a value.',
        maxLength: 'The "name" field must not exceed 30 characters.',
        minLength: 'The "name" field must be at least 8 characters long.',
      },

      email: {
        required: 'The "email" field is required. Please provide a value.',
        invalid:
          'The provided email is invalid. Please provide a valid email address.',
      },

      password: {
        required: 'The "password" field is required. Please provide a value.',
        minLength: 'The "password" field must be at least 8 characters long.',
        weak: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },

      phone: {
        required: 'The "phone" field is required. Please provide a value.',
        invalid:
          'The provided phone number is invalid. Please provide a valid phone number with a country code.',
      },

      timeZone: {
        required: 'The "timeZone" field is required. Please provide a value.',
        invalid:
          'The provided timezone is invalid. Please provide a valid timezone like "Asia/Karachi" or "America/New_York".',
      },

      role: {
        required: 'The "role" field is required. Please provide a value.',
        invalid:
          'The provided role is invalid. Please provide a valid role like "user" or "admin".',
        enum: ['roofer', 'admin', 'manager', 'salesAgent', 'telemarketer'],
      },
    },
  },

  customer: {
    error: {
      user: {
        required: 'The "user" field is required. Please provide a value.',
      },

      companyName: {
        maxLength: 'The "companyName" field must not exceed 50 characters.',
        minLength:
          'The "companyName" field must be at least 3 characters long.',
      },

      plan: {
        required: 'The "plan" field is required. Please provide a value.',
        enum: [
          plans.strike10.name,
          plans.surge30.name,
          plans.blackout60.name,
          plans.payAsYouGo.name,
        ],
      },

      stripePriceId: {
        required:
          'The "stripePriceId" field is required. Please provide a value.',
      },

      stripeCustomerId: {
        required:
          'The "stripeCustomerId" field is required. Please provide a value.',
      },
    },
  },

  payment: {
    error: {
      customer: {
        required: 'The "customer" field is required. Please provide a value.',
      },

      billingAddress: {
        required:
          'The "billingAddress" field is required. Please provide a value.',
        maxLength: 'The "billingAddress" field must not exceed 100 characters.',
      },

      zipCode: {
        required: 'The "zipCode" field is required. Please provide a value.',
        maxLength: 'The "zipCode" field must not exceed 5 characters.',
      },

      stripePaymentMethodId: {
        required:
          'The "stripePaymentMethodId" field is required. Please provide a value.',
      },

      stripePaymentIntentId: {
        required:
          'The "stripePaymentIntentId" field is required. Please provide a value.',
      },
    },
  },

  transaction: {
    error: {
      customer: {
        required: 'The "customer" field is required. Please provide a value.',
      },

      amount: {
        required: 'The "amount" field is required. Please provide a value.',
        min: 'The "amount" field must be at least 0.',
      },

      transactionType: {
        required:
          'The "transactionType" field is required. Please provide a value.',
        enum: ['plan', 'refund'],
      },

      transactionStatus: {
        required:
          'The "transactionStatus" field is required. Please provide a value.',
        enum: ['succeeded', 'pending', 'failed', 'disputed'],
      },

      currency: {
        required: 'The "currency" field is required. Please provide a value.',
      },

      plan: {
        enum: [
          plans.strike10.name,
          plans.surge30.name,
          plans.blackout60.name,
          plans.payAsYouGo.name,
        ],
      },
    },
  },
};
