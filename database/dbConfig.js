import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/envConfig.js";

const dbUrl = MONGODB_URI;

export const connectDatabase = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error.message);
    }
}