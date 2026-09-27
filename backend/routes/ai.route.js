import express from "express"
import { getHint, debugCode, explainCode, analyzeComplexity, identifyPattern } from "../controllers/ai.controller.js"

const router = express.Router()

router.post("/hint", getHint)
router.post("/debug", debugCode)
router.post("/explain", explainCode)
router.post("/complexity", analyzeComplexity)
router.post("/pattern", identifyPattern)

export default router
