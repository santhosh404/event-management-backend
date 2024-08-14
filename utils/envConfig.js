import dotenv from "dotenv";

// Load environment variables from .env file

dotenv.config();

const {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    JWT_EXPIRATION_TIME,
    MOCEAN_KEY,
    MOCEAN_SECRET
} = process.env;

export { PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRATION_TIME, MOCEAN_SECRET, MOCEAN_KEY };