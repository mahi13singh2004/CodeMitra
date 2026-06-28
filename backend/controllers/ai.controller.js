import { processAIRequest } from "../services/ai.service.js"
import logger from "../utils/logger.js"

export const processAI = async (req, res) => {
    try {
        const { feature, title, description, examples, constraints, language, code } = req.body
        if (!feature || !title || !description || !language) {
            return res.status(400).json({ success: false, message: "Missing required data" })
        }

        const result = await processAIRequest(feature, {
            title,
            description,
            examples,
            constraints,
            language,
            code
        })

        return res.status(200).json({
            success: true,
            data: result
        })
    }
    catch (error) {
        logger.error(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}