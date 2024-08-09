import express from 'express';
import { authorizeByToken } from '../middlewares/apiAuthMiddleware';
import { bookEventHandler } from '../controllers/bookingController';

const bookingRoutes = express.Router();


bookingRoutes.post('/book-event', authorizeByToken, bookEventHandler); 