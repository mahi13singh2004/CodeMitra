import { generateContent } from "./gemini.service.js"
import crypto from "crypto"
import redisClient from "../utils/redis.js"
import { buildPrompt } from "./prompt.service.js"
import logger from "../utils/logger.js"

export const processAIRequest = async (feature, data) => {
    const cacheKey = feature + ":" + crypto.createHash("md5").update(JSON.stringify(data)).digest("hex")

    const cached = await redisClient.get(cacheKey)

    if (cached) {
        logger.info("Cache hit")
        return JSON.parse(cached)
    }

    logger.info("Calling Gemini API")

    const prompt = buildPrompt(feature, data)

    const result = await generateContent(prompt)

    await redisClient.set(
        cacheKey,
        JSON.stringify(result),
        {
            EX: 60 * 60 * 24
        }
    )
    return result
}