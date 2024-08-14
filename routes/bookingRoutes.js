import express from 'express';
import { authorizeByToken } from '../middlewares/apiAuthMiddleware.js';
import { bookEventHandler } from '../controllers/bookingController.js';

export const bookingRoutes = express.Router();


bookingRoutes.post('/book-event', authorizeByToken, bookEventHandler); 