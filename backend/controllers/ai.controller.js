import { processAIRequest } from "../services/ai.service.js"
import logger from "../utils/logger.js"

const validateRequest = (req) => {
    const { title, description, language } = req.body
    if (!title || !description || !language) {
        return { valid: false, message: "Missing required fields: title, description, language" }
    }
    return { valid: true }
}

export const getHint = async (req, res) => {
    try {
        const validation = validateRequest(req)
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }

        const { title, description, examples, constraints, language, code } = req.body

        const result = await processAIRequest("hint", {
            title,
            description,
            examples: examples || "",
            constraints: constraints || "",
            language,
            code: code || ""
        })

        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const debugCode = async (req, res) => {
    try {
        const validation = validateRequest(req)
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }

        const { title, description, examples, constraints, language, code } = req.body

        const result = await processAIRequest("debug", {
            title,
            description,
            examples: examples || "",
            constraints: constraints || "",
            language,
            code: code || ""
        })

        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const explainCode = async (req, res) => {
    try {
        const validation = validateRequest(req)
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }

        const { title, description, examples, constraints, language, code } = req.body

        const result = await processAIRequest("explain", {
            title,
            description,
            examples: examples || "",
            constraints: constraints || "",
            language,
            code: code || ""
        })

        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const analyzeComplexity = async (req, res) => {
    try {
        const validation = validateRequest(req)
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }

        const { title, description, examples, constraints, language, code } = req.body

        const result = await processAIRequest("complexity", {
            title,
            description,
            examples: examples || "",
            constraints: constraints || "",
            language,
            code: code || ""
        })

        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const identifyPattern = async (req, res) => {
    try {
        const validation = validateRequest(req)
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }

        const { title, description, examples, constraints, language, code } = req.body

        const result = await processAIRequest("pattern", {
            title,
            description,
            examples: examples || "",
            constraints: constraints || "",
            language,
            code: code || ""
        })

        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}
