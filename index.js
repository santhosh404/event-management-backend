import express from 'express';
import { PORT } from './utils/envConfig.js';
import { connectDatabase } from './database/dbConfig.js';
import { authRoutes } from './routes/authRoutes.js';


// Initialize the application
const app = express();


// Adding the Middlewares
app.use(express.json());


//Connect to database
connectDatabase()




// Routes
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/user', userRoutes);
app.use('/api/v1/event', eventRoutes);


// Listerner to routes 


app.listen(PORT, () => {
    console.log(`Welcome to the port ${PORT}`);
});