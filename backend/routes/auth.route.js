import express from "express"
import { checkAuth, login, logout, refreshAccessToken, signup } from "../controllers/auth.controller.js"
import verifyToken from "../middlewares/verifyToken.js"
const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",verifyToken,logout)
router.get("/checkAuth",verifyToken,checkAuth)
router.post("/refresh",refreshAccessToken)

export default router