const Hospital = require('../models/hosp.model.js')
const asynchandler = require('../utils/asynchandler.js')
const apierror = require('../utils/apierror.js')
const apiresponse = require('../utils/apiresponse.js')
const jwt = require('jsonwebtoken')
const { get } = require('mongoose')

const registerHospital = asynchandler(async (req,res)=>{
    const {nin,hname,haddress,hemail,hpassword} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const ninRegex = /^\d{10}$/
    const passwordRegex = /^(?=.*[a-zA-Z\d]).{8,}$/
    if([hname,hemail,nin,hpassword,haddress].some((field)=>field===undefined|| typeof field !== 'string' || (field?.trim() === "")))
        throw new apierror(400,"Please fill all the fields! ERR:user.controller.l14")
    if(!emailRegex.test(hemail))
        throw new apierror(400,"Invalid Email! ERR:user.controller.l16")
    if(!ninRegex.test(nin))
        throw new apierror(400,"Invalid NIN! ERR:user.controller.l18")
    if(!passwordRegex.test(hpassword))
        throw new apierror(400,"Invalid Password! ERR:user.controller.l20")
    const HospalreadyExists = await Hospital.findOne({
        $or:[{nin},{hemail}]
    })
    if(HospalreadyExists)
        throw new apierror(400,"Hospital already exists! ERR:user.controller.l25")
    const hospital = await Hospital.create({
        nin,
        hname,
        haddress,
        hemail: hemail.toLowerCase(),
        hpassword
    })
    const createdHospital = await Hospital.findById(hospital._id).select("-hpassword")
    if(!createdHospital)
        throw new apierror(500,"Error Creating Hospital! ERR:user.controller.l35")
    return res.status(201).json(
        new apiresponse(201,createdHospital,"Hospital registered successfully!")
    )
})

const loginHospital = asynchandler(async(req,res)=>{
    const {hemail,hpassword} = req.body
    if([hemail,hpassword].some((field)=>field===undefined|| typeof field !== 'string' || (field?.trim() === "")))
        throw new apierror(400,"Please fill all the fields! ERR:user.controller.l44")
    const hospital = await Hospital.findOne({hemail:hemail.toLowerCase()})
    if(!hospital)
        throw new apierror(404,"Hospital not found! ERR:user.controller.l47")
    const isMatch = await hospital.isPasswordCorrect(hpassword)
    if(!isMatch)
        throw new apierror(401,"Incorrect Password! ERR:user.controller.l50")
    const token = await generateAccessTokenHosp(hospital._id)
    const loggedInHosp = await Hospital.findById(hospital._id).select("-hpassword")
    const options = {
        httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
        secure: process.env.COOKIE_SECURE === "true",
    }
    return res.status(200)
        .cookie("accessHospToken",token,options)
        .json(new apiresponse(200,{loggedInHosp,token},"Hospital logged in successfully!"))

})

const generateAccessTokenHosp = async (id) =>{
    try{
        const hosp = await Hospital.findById(id)
        const accessToken = hosp.generateAccessTokenHosp()
        return accessToken
    }catch(err){
        throw new apierror(500,"Error generating access token! ERR:Hospital.controller.l80",err)
    }
}

const logoutHospital = asynchandler(async(req,res)=>{
    const options= {
        httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
        secure: process.env.COOKIE_SECURE === "true",
    }
    if(!req.hospital)
        throw new apierror(404,"Hospital not found! ERR:Hospital.controller.l97")
    //Note: Handle Bearer Token in LocalStorage in FrontEnd
    return res.status(200)
        .clearCookie("accessHospToken",options)
        .json(new apiresponse(200,{},"Hospital logged out successfully!"))
})

const getCurrentHosp = asynchandler(async(req,res)=>{
    if(!req.hospital)
        throw new apierror(404,"User not found! ERR:user.controller.l86")
    return res.status(200)
            .json(new apiresponse(200,req.hospital,"User fetched successfully!"))
})

module.exports = {
    registerHospital,
    loginHospital,
    logoutHospital,
    getCurrentHosp
}