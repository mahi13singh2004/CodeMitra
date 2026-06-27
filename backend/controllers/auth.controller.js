import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"
import logger from "../utils/logger.js"

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "Account already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        const refreshToken = generateTokenAndSetCookie(user._id, res)
        const hashedRefresh = await bcrypt.hash(refreshToken, 10)
        user.refreshToken = hashedRefresh
        await user.save()
        return res.status(201).json({
            message: "User have been created",
            user: {
                ...user._doc,
                password: undefined,
                refreshToken: undefined
            }
        })
    }
    catch (error) {
        logger.error("Error in signup controller backend", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const refreshToken = generateTokenAndSetCookie(user._id, res)
        const hashedRefresh = await bcrypt.hash(refreshToken, 10)
        user.refreshToken = hashedRefresh
        await user.save()
        return res.status(200).json({
            message: "User have been logged in",
            user: {
                ...user._doc,
                password: undefined,
                refreshToken: undefined
            }
        })
    }
    catch (error) {
        logger.error("Error in login controller backend", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            refreshToken: null
        })
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict"
        })
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict"
        })
        return res.status(200).json({
            message: "Logged out successfully"
        })
    }
    catch (error) {
        logger.error("Error in logout controller backend", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({
            message: "User is authenticated",
            user: {
                ...user._doc,
                password: undefined,
                refreshToken: undefined
            }
        })
    }
    catch (error) {
        logger.error("Error in checkAuth controller backend", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({ message: "Not found" })
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid refresh token" })
        }
        const newRefreshToken = generateTokenAndSetCookie(user._id, res)
        user.refreshToken = await bcrypt.hash(newRefreshToken, 10)
        await user.save()

        return res.status(200).json({
            message: "Access token refreshed"
        })
    }
    catch (error) {
        logger.error("Error in refreshAccessToken controller backend", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}