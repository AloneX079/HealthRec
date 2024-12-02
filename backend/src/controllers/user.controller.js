const User = require('../models/user.model.js')
const Hospital = require('../models/hosp.model.js')
const Pending = require('../models/pa.model.js')
const Perm = require('../models/perm.model.js')
const asynchandler = require('../utils/asynchandler.js')
const apierror = require('../utils/apierror.js')
const apiresponse = require('../utils/apiresponse.js')

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

const getHospitalList = asynchandler(async(req, res) => {
    const hospitals = await Hospital.find({ isApproved: true }).select("nin hname haddress")
    return res.status(200)
        .json(new apiresponse(200, hospitals, "Hospitals fetched successfully!"))
})

const getDocApproval = asynchandler(async(req, res) => {
    const {hospid} = req.body
    if([hospid].some((field)=>field===undefined|| typeof field !== 'string' || (field?.trim() === "")))
        throw new apierror(400,"Please fill all the fields! ERR:user.controller.l115")
    const checkHospital = await Hospital.findById(hospid)
    if(!checkHospital)
        throw new apierror(404,"Hospital not found! ERR:user.controller.l118")
    if(checkHospital.isApproved){
        const ifExists = await Pending.findOne({
            doctor: req.user._id,
            hospital: checkHospital._id
        })
        if(ifExists)
            throw new apierror(400,"Pending approval request already exists! ERR:user.controller.l126")
        const newApproval = await Pending.create({
            doctor: req.user._id,
            hospital: checkHospital._id
        })
        if(!newApproval)
            throw new apierror(500,"Error creating approval request! ERR:user.controller.l132")
    }
    return res.status(200)
        .json(new apiresponse(200, {}, "Approval request sent successfully!"))
})

const getDocQr = asynchandler(async(req, res) => {
    const {docobjid} = req.body
    if(docobjid === undefined || typeof docobjid !== 'string' || (docobjid?.trim() === ""))
        throw new apierror(400,"Please fill all the fields! ERR:user.controller.l141")
    const doc = await User.findById(docobjid).select("_id isDoctor isPharmacist")
    if(!doc)
        throw new apierror(404,"Doctor/Pharmacist not found! ERR:user.controller.l144")
    if(!doc.isDoctor && !doc.isPharmacist)
        throw new apierror(400,"User is not a Doctor or Pharmacist! ERR:user.controller.l146")
    const PermExists = await Perm.findOne({
        patient: req.user._id,
        doctor: doc._id
    })
    if(PermExists)
        throw new apierror(400,"Permission already exists! ERR:user.controller.l150")
    const createPerm = await Perm.create({
        patient: req.user._id,
        patientName: req.user.name,
        doctor: doc._id
    })
    if(!createPerm)
        throw new apierror(500,"Error creating permission! ERR:user.controller.l152")
    return res.status(200)
        .json(new apiresponse(200, createPerm, "Permission created successfully!"))
})

const getPharApproval = asynchandler(async(req, res) => {
    const {hospid} = req.body
    if([hospid].some((field)=>field===undefined|| typeof field !== 'string' || (field?.trim() === "")))
        throw new apierror(400,"Please fill all the fields! ERR:user.controller.l160")
    const checkHospital = await Hospital.findById(hospid)
    if(!checkHospital)
        throw new apierror(404,"Hospital not found! ERR:user.controller.l163")
    if(checkHospital.isApproved){
        const ifExists = await Pending.findOne({
            pharmacist: req.user._id,
            hospital: checkHospital._id
        })
        if(ifExists)
            throw new apierror(400,"Approval request already exists! ERR:user.controller.l170")
        const newApproval = await Pending.create({
            pharmacist: req.user._id,
            hospital: checkHospital._id
        })
        if(!newApproval)
            throw new apierror(500,"Error creating approval request! ERR:user.controller.l176")
    }
    return res.status(200)
        .json(new apiresponse(200, {}, "Approval request sent successfully!"))
})

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    getHospitalList,
    getDocApproval,
    getDocQr,
    getPharApproval
}