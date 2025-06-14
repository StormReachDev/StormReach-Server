// Imports:
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import './config/loadEnv.js';
import globalErrorHandler from './middlewares/error.js';
import verifyApiKey from './middlewares/verifyApiKey.js';
import customerRoute from './routes/customerRoute.js';
import userRoute from './routes/userRoute.js';

// Instantiation:
const app = express();
const apiPrefix = process.env.API_PREFIX;

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_SIDE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
  }),
);

// Uncomment to test the API key verification middleware:
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Stormy API.',
  });
});

app.use(apiPrefix, verifyApiKey, userRoute);
app.use(apiPrefix, verifyApiKey, customerRoute);

// Error handling middleware:
app.use(globalErrorHandler);

export default app;
