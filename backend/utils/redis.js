import { createClient } from "redis"
import logger from "../utils/logger.js"
import dotenv from "dotenv"

dotenv.config()

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"

const redisClient = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 3) {
                logger.warn("Redis max retries reached")
                return false
            }
            return Math.min(retries * 100, 3000)
        },
        connectTimeout: 10000
    }
})

redisClient.on("connect", () => {
    logger.info(`Redis connected to ${redisUrl.includes('localhost') ? 'localhost' : 'production'}`)
})

redisClient.on("error", (error) => {
    logger.error(`Redis error: ${error.message}`)
})

redisClient.on("ready", () => {
    logger.info("Redis client ready")
})

export default redisClient
