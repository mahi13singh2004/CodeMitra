import { GoogleGenAI } from "@google/genai"
import logger from "../utils/logger.js"

const createClient = () => {
    try {
        return new GoogleGenAI({
            apiKey: process.env.GOOGLE_API_KEY
        })
    } catch (error) {
        logger.error("Failed to create Gemini client:", error.message)
        throw error
    }
}

let ai = null

function getClient() {
    if (!ai) {
        ai = createClient()
    }
    return ai
}

export const generateContent = async (prompt) => {
    try {
        const client = getClient()
        const response = await client.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt
        })
        return response.text
    } catch (error) {
        logger.error("Gemini API Error Details:")
        logger.error("Message:", error.message)
        logger.error("Stack:", error.stack)
        throw new Error(error.message || "Failed to generate content")
    }
}
