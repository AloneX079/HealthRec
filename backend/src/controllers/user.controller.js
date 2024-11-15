const User = require('../models/user.model.js')
const asynchandler = require('../utils/asynchandler.js')
const apierror = require('../utils/apierror.js')
const apiresponse = require('../utils/apiresponse.js')
const jwt = require('jsonwebtoken')
const { get } = require('mongoose')

const registerUser = asynchandler(async (req, res) => {
    const {name, email, phone, password} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const passwordRegex = /^(?=.*[a-zA-Z\d]).{8,}$/

    if([name,email,phone,password].some((field)=>field===undefined|| typeof field !== 'string' || (field?.trim() === "")))
        throw new apierror(400,"Please fill all the fields! ERR:user.controller.l14")
    if(!emailRegex.test(email))
        throw new apierror(400,"Invalid Email! ERR:user.controller.l16")
    if(!phoneRegex.test(phone))
        throw new apierror(400,"Invalid Phone! ERR:user.controller.l18")
    if(!passwordRegex.test(password))
        throw new apierror(400,"Invalid Password! ERR:user.controller.l20")

    const UseralreadyExists = await User.findOne({
        $or:[{email},{phone}]
    })
    if(UseralreadyExists)
        throw new apierror(400,"User already exists! ERR:user.controller.l26")
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        password
    })
    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser)
        throw new apierror(500,"Error Creating user! ERR:user.controller.l35")

    return res.status(201).json(
        new apiresponse(201,createdUser,"User registered successfully!")
    )
})

const loginUser = asynchandler(async (req, res) => {
    const {email, password} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if([email,password].some((field)=>field===undefined|| typeof field !== 'string' || (field?.trim() === "")))
        throw new apierror(400,"Please fill all the fields! ERR:user.controller.l47")

    if(!emailRegex.test(email))
        throw new apierror(400,"Invalid Email! ERR:user.controller.l50")

    const user = await User.findOne({
        email: email.toLowerCase()
    })
    if(!user)
        throw new apierror(400,"User Account does not exists! ERR:user.controller.l56")

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid)
        throw new apierror(400,"Incorrect Password! ERR:user.controller.l60")

    const accessToken = await generateAccessToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password")
    const options = {
        httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
        secure: process.env.COOKIE_SECURE === "true",
    }
    return res.status(200)
        .cookie("accessToken",accessToken,options)
        .json(new apiresponse(200,{loggedInUser,accessToken},"User logged in successfully!"))
})

const generateAccessToken = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        return accessToken
    }catch(err){
        throw new apierror(500,"Error generating access token! ERR:user.controller.l80",err)
    }
}

const getCurrentUser = asynchandler(async(req, res) => {
    if(!req.user)
        throw new apierror(404,"User not found! ERR:user.controller.l86")
    return res.status(200)
            .json(new apiresponse(200,req.user,"User fetched successfully!"))
})

const logoutUser = asynchandler(async(req, res) => {
    const options= {
        httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
        secure: process.env.COOKIE_SECURE === "true",
    }
    if(!req.user)
        throw new apierror(404,"User not found! ERR:user.controller.l97")
    //Note: Handle Bearer Token in LocalStorage in FrontEnd
    return res.status(200)
        .clearCookie("accessToken",options)
        .json(new apiresponse(200,{},"User logged out successfully!"))
})

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
}