// Imports:
import Stripe from 'stripe';
import { plans } from '../constants/data/plans/index.js';
import {
  getNewPasswordEmail,
  getPlanPurchaseEmail,
} from '../constants/templates/email/index.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import Customer from '../models/customerModel.js';
import Payment from '../models/paymentModel.js';
import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';
import emailService from '../utils/emailService.js';
import ErrorHandler from '../utils/errorHandler.js';
import generateRandomPassword from '../utils/helpers.js';

// Initializing Stripe instance:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const purchasePlan = asyncWrapper(async function (req, res, next) {
  const {
    name,
    email,
    phone,
    timeZone,
    role = 'roofer',
    companyName,
    plan,
    billingAddress,
    zipCode,
    priceId,
    paymentMethodId,
    transactionType = 'plan',
  } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    const newPassword = generateRandomPassword(12);
    const [newUser, price] = await Promise.all([
      User.create({
        name,
        email,
        password: newPassword,
        phone,
        timeZone,
        role,
      }),

      stripe.prices.retrieve(priceId),
    ]);

    const stripeCustomer = await stripe.customers.create({
      email,
      name,
      phone,
      address: {
        line1: billingAddress,
        postal_code: zipCode,
      },

      metadata: {
        timeZone,
      },

      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: 'usd',
      customer: stripeCustomer.id,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status !== 'succeeded') {
      await Promise.all([
        stripe.customers.del(stripeCustomer.id), // Delete the customer if payment fails.
        newUser.deleteOne({ _id: newUser._id }), // Delete the user if payment fails.
      ]);

      return next(
        new ErrorHandler(
          'Payment failed. Please try again or contact support.',
          400,
        ),
      );
    }

    const customer = await Customer.create({
      user: newUser._id,
      companyName,
      plan: plans[plan].name,
      stripeCustomerId: stripeCustomer.id,
      stripePriceId: priceId,
      appointmentCredits: plans[plan].appointmentCredits,
    });

    const payment = await Payment.create({
      customer: customer._id,
      billingAddress,
      zipCode,
      stripePaymentMethodId: paymentMethodId,
      stripePaymentIntentId: paymentIntent.id,
    });

    await Transaction.create({
      payment: payment._id,
      customer: customer._id,
      amount: plans[plan].price,
      currency: paymentIntent.currency,
      plan: plans[plan].name,
      transactionStatus: paymentIntent.status,
      transactionType,
    });

    emailService({
      email: newUser.email,
      subject: 'Welcome to StormReach - Your Account is Ready!',
      func: getNewPasswordEmail(newUser.name, newUser.email, newPassword),
    }).catch((error) => next(new ErrorHandler(error.message, 500)));

    return res.status(200).json({
      success: true,
      message: 'Success! Your payment has been processed successfully.',
    });
  }

  const customer = await Customer.findOne({ user: existingUser._id }).populate(
    'user',
  );

  if (!customer) {
    return next(
      new ErrorHandler('Customer not found. Please contact support.', 404),
    );
  }

  if (
    (customer.autoReload === false && customer.appointmentCredits === 0) ||
    (customer.autoReload === true && customer.appointmentCredits === 0)
  ) {
    const amount = await stripe.prices.retrieve(priceId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount.unit_amount,
      currency: 'usd',
      customer: customer.stripeCustomerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status !== 'succeeded') {
      await Transaction.create({
        payment: null,
        customer: customer._id,
        amount: plans[plan].price,
        currency: paymentIntent.currency,
        plan: plans[plan].name,
        transactionStatus: paymentIntent.status,
        transactionType,
      });
      return next(
        new ErrorHandler(
          'Payment failed. Please try again or contact support.',
          400,
        ),
      );
    }

    customer.plan = plans[plan].name;
    customer.stripePriceId = priceId;
    customer.appointmentCredits = plans[plan].appointmentCredits;
    await customer.save();

    const payment = await Payment.create({
      customer: customer._id,
      billingAddress,
      zipCode,
      stripePaymentMethodId: paymentMethodId,
      stripePaymentIntentId: paymentIntent.id,
    });

    const transaction = await Transaction.create({
      payment: payment._id,
      customer: customer._id,
      amount: plans[plan].price,
      currency: paymentIntent.currency,
      plan: plans[plan].name,
      transactionStatus: paymentIntent.status,
      transactionType,
    });

    emailService({
      email: customer.user.email,
      subject: 'Successful Payment - StormReach',
      func: getPlanPurchaseEmail(
        customer.user.name,
        customer.plan,
        transaction.amount,
        customer.appointmentCredits,
      ),
    }).catch((error) => next(new ErrorHandler(error.message, 500)));

    return res.status(200).json({
      success: true,
      message: 'Success! Your payment has been processed successfully.',
    });
  }

  return res.status(400).json({
    success: false,
    message:
      'You already have an active plan. Please contact support for assistance.',
  });
});
