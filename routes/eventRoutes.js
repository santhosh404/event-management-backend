import express from 'express';
import { authorizeByAdminRole, authorizeByToken } from '../middlewares/apiAuthMiddleware.js';
import { createEventHandler, deleteEventHandler, getEventByIdHandler, getEventByTagHandler, getEventsHandler, updateEventHandler } from '../controllers/eventController.js';


export const eventRoutes = express.Router();

eventRoutes.post('/create-event', authorizeByToken, authorizeByAdminRole, createEventHandler);
eventRoutes.get('/get-event', getEventsHandler);
eventRoutes.get('/get-event/:id', getEventByIdHandler);
eventRoutes.put('/update-event/:id', authorizeByToken, authorizeByAdminRole, updateEventHandler);
eventRoutes.delete('/delete-event/:id', authorizeByToken, authorizeByAdminRole, deleteEventHandler);
eventRoutes.get('/get-event/tag', authorizeByToken, getEventByTagHandler);