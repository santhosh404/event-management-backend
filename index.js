import express from 'express';
import { PORT } from './utils/envConfig.js';
import { connectDatabase } from './database/dbConfig.js';
import { authRoutes } from './routes/authRoutes.js';
import { eventRoutes } from './routes/eventRoutes.js';
import cors from 'cors';
import { bookingRoutes } from './routes/bookingRoutes.js';

// Initialize the application
const app = express();


// Adding the Middlewares
app.use(express.json());
app.use(cors());


//Connect to database
connectDatabase()




// Routes
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/user', userRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1/book', bookingRoutes);


// Listerner to routes 


app.listen(PORT, () => {
    console.log(`Welcome to the port ${PORT}`);
});