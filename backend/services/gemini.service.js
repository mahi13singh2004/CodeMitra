import { GoogleGenAI } from "@google/genai"
import logger from "../utils/logger.js"

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })

export const generateContent = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt
        })
        return response.text
    } catch (error) {
        logger.error("Gemini API Error:", error.message)
        throw error
    }
}
