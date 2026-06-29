import { createClient } from "redis"
import logger from "../utils/logger.js"
import dotenv from "dotenv"

dotenv.config()

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"

const redisClient = createClient({
    url: redisUrl
})

redisClient.on("connect", () => {
    logger.info(`Redis connected to ${redisUrl.includes('localhost') ? 'localhost' : 'production'}`)
})

redisClient.on("error", (error) => {
    logger.error(`Redis error: ${error.message}`)
})

export default redisClient
