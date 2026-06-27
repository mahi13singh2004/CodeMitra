import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import logger from "../utils/logger.js"

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            return res.status(401).json({ message: "Unauthorised" })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = user
        next()
    }
    catch (error) {
        console.log("Error in verifyToken backend", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export default verifyToken