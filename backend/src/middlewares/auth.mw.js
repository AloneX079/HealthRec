const asynchandler = require('../utils/asynchandler.js')
const apierror = require('../utils/apierror.js')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

const verifyJWT = asynchandler(async (req, res, next) => {
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //Get token from cookies or header
        if(!token)
            throw new apierror(401,"Unauthorized! Please Login ERR:auth.mw.l11")
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password")
        if(!user)
            throw new apierror(401,"Invalid Access Token ERR:auth.mw.l15")
        req.user=user
        next()
    }catch(err){
        throw new apierror(401,err?.message || "Invalid Access Token ERR:auth.mw.19")
    }
})

module.exports={verifyJWT}