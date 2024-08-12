import express from 'express';
import { authorizeByAdminRole, authorizeByToken } from '../middlewares/apiAuthMiddleware.js';
import { createEventHandler, deleteEventHandler, getEventByIdHandler, getEventsHandler, updateEventHandler } from '../controllers/eventController.js';


export const eventRoutes = express.Router();

eventRoutes.post('/create-event', authorizeByToken, authorizeByAdminRole, createEventHandler);
eventRoutes.get('/get-event', getEventsHandler);
eventRoutes.get('/get-event/:id', getEventByIdHandler);
eventRoutes.put('/update-event/:id', authorizeByAdminRole, authorizeByToken, updateEventHandler);
eventRoutes.delete('/delete-event/:id', authorizeByAdminRole, authorizeByToken, deleteEventHandler);