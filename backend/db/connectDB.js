import mongoose from "mongoose";
import logger from "../utils/logger.js"

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            logger.error("MONGO_URI is undefined!");
            process.exit(1);
        }

        const conn = await mongoose.connect(MONGO_URI)
        logger.info(`MongoDB connected: ${conn.connection.host}`)
    }
    catch (error) {
        logger.error("MongoDB connection failed!")
        logger.error(`Error: ${error?.message}`)
        process.exit(1)
    }
}

export default connectDB
