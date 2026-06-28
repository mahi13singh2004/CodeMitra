import { createClient } from "redis";
import logger from "../utils/logger.js";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
    logger.info("Redis Connected");
});

redisClient.on("error", (error) => {
    logger.error(error);
});

export default redisClient;