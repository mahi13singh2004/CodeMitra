import dotenv from "dotenv"
import app from "./app.js"
import logger from "./utils/logger.js"
import connectDB from "./db/connectDB.js"
import redisClient from "./utils/redis.js"

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()
        await redisClient.connect()

        app.listen(PORT, () => {
            logger.info(`Server is running on ${PORT}`)
        })
    }
    catch (error) {
        logger.error(error.message)
    }
}

startServer()
