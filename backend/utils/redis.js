import {createClient} from "redis"
import logger from "../utils/logger.js"

const redisClient=createClient({
    url:"redis://localhost:6379"
})

redisClient.on("connect",()=>{
    logger.info("Redis connected")
})

redisClient.on("error",(error)=>{
    logger.error(error)
})

export default redisClient