const mongoose=require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const hospSchema = new mongoose.Schema({
    nin:{
        type:Number,
        required:[true,"NIN cannot be empty!"],
        unique:[true,"Hospital already exists with this NIN!"],
        minlength:[10,"NIN must be 10 digits!"],
        maxlength:[10,"NIN must be 10 digits!"],
        validator:function(v){
            return /^[0-9]{10}$/.test(v)
            //Regex to validate NIN
        }
    },
    hname:{
        type:String,
        required:[true,"Name cannot be empty!"],
        minlength:[3,"Name must be at least 3 characters!"],
        maxlength:[64,"Name must be at most 64 characters!"],
        validator:function(v){
            return /^[a-zA-Z ]+$/.test(v)
            //Regex to validate name
        }
    },
    haddress:{
        type:String,
        required:[true,"Address cannot be empty!"],
        minlength:[3,"Address must be at least 3 characters!"],
        maxlength:[64,"Address must be at most 64 characters!"]
    },
    hemail:{
        type:String,
        required:[true,"Email cannot be empty!"],
        maxlength:[64,"Email must be at most 64 characters!"],
        unique:[true,"Account already exists with this email address!"],
        lowercase:true,
        trim:true,
        index:true,
        validate:{
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
                //Regex to validate email
            },
            message:(props)=>`${props.value} is not a valid email address!`
        }
    },
    hpassword: {
        type: String,
        required: [true, "Password cannot be empty!"],
        minlength: [8, "Password must be at least 8 characters!"],
        maxlength: [64, "Password must be at most 64 characters!"],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-zA-Z\d]).{8,}$/.test(v)
                //Regex to validate password
            },
            message: (props) => `${props.value} is not a valid password!`,
        }
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    approvedDoctors: {
        type: [],
        required: false,
    }
},{timestamps:true})
hospSchema.pre('save',async function(next){
    if(!this.isModified('hpassword'))
        return next()
    this.hpassword = await bcrypt.hash(this.hpassword, 10)
    next()
})
hospSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.hpassword)
}
hospSchema.methods.generateAccessTokenHosp = function(){
    return jwt.sign({
        _id:this._id
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}
const Hospital = mongoose.model('Hospital',hospSchema)

module.exports = Hospital
