import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import pinoHttp from "pino-http"
import rateLimit from "express-rate-limit"
import logger from "./utils/logger.js"
import healthRoutes from "./routes/health.route.js"
import aiRoutes from "./routes/ai.route.js"

const app = express()

app.use(pinoHttp({ logger }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(helmet())
app.use(cookieParser())

// Rate limiting: 20 requests per minute per IP
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: { success: false, message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
})

app.use("/api/ai", limiter)

app.use("/api/health", healthRoutes)
app.use("/api/ai", aiRoutes)

app.use((req, res) => {
    return res.status(400).json({ success: false, message: "Route not found" })
})

export default app
