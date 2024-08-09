import express from 'express';
import { authorizeByAdminRole, authorizeByToken } from '../middlewares/apiAuthMiddleware';
import { createEventHandler, getEventsHandler } from '../controllers/eventController';


export const eventRoutes = express.Router();

eventRoutes.post('/create-event', authorizeByToken, authorizeByAdminRole, createEventHandler);
eventRoutes.get('/get-event', authorizeByToken, getEventsHandler);
eventRoutes.put('/update-event/:id', authorizeByAdminRole, authorizeByToken, updateEventHandler);
eventRoutes.delete('/delete-event/:id', authorizeByAdminRole, authorizeByToken, deleteEventHandler);