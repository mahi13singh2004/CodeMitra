import express from "express"
import { testQueue } from "../controllers/ai.controller.js"
const router=express.Router()

router.post("/test",testQueue)

export default router