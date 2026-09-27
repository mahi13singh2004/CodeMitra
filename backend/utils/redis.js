import { createClient } from "redis"
import logger from "../utils/logger.js"

const redisUrl = process.env.REDIS_URL

const redisClient = createClient({
    url: redisUrl,
    socket: {
        tls: redisUrl.startsWith('rediss://'),
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                return new Error('Redis reconnection failed')
            }
            return Math.min(retries * 100, 3000)
        }
    }
})

redisClient.on("ready", () => {
    logger.info("Redis connected")
})

redisClient.on("error", (error) => {
    logger.error(`Redis error: ${error.message}`)
})

export default redisClient
