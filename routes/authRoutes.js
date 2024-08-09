import express from 'express';
import {
    forgotPasswordHandler,
    resetPasswordHandler,
    signInHandler,
    signUpHandler
} from '../controllers/authController.js';

export const authRoutes = express.Router();

authRoutes.post('/sign-up', signUpHandler);
authRoutes.post('/sign-in', signInHandler);
authRoutes.post('/forgot-password', forgotPasswordHandler);
authRoutes.post('/reset-password', resetPasswordHandler);