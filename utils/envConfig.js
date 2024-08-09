import dotenv from "dotenv";

// Load environment variables from .env file

dotenv.config();

const {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    JWT_EXPIRATION_TIME
} = process.env;

export { PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRATION_TIME };