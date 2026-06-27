import jwt from "jsonwebtoken"

const generateRefreshToken=(id)=>{
    return jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d"
    })
}

const generateAccessToken=(id)=>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    })
}

const generateTokenAndSetCookie=(id,res)=>{
    const accessToken=generateAccessToken(id)
    const refreshToken=generateRefreshToken(id)

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV=="production",
        sameSite:"strict",
        maxAge:15*60*1000,
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV=="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    })

    return refreshToken
}

export default generateTokenAndSetCookie