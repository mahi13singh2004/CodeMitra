import "./config/env.js";
import app from "./app.js";
import logger from "./utils/logger.js";
import connectDB from "./db/connectDB.js";
import redisClient from "./utils/redis.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        try {
            await redisClient.connect();
        } catch (error) {
            logger.warn("Redis connection failed");
        }

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }
};

startServer();