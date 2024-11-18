const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty!"],
        minlength: [3, "Name must be at least 3 characters!"],
        maxlength: [64, "Name must be at most 64 characters!"],
        validator: function (v) {
            return /^[a-zA-Z ]+$/.test(v)
            //Regex to validate name
        }
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty!"],
        maxlength: [64, "Email must be at most 64 characters!"],
        unique: [true,"Account already exists with this email address!"],
        lowercase: true,
        trim: true,
        index: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
                //Regex to validate email
            },
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        required: [true, "Phone cannot be empty!"],
        unique: [true,"Account already exists with this phone number!"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v)
                //Regex to validate phone number
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
    },
    password: {
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    isPharmacist: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    //If password is not modified, skip this step

    this.password = await bcrypt.hash(this.password, 10)
    //Hash password with salt rounds = 10
    next()
    //Call next middleware
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
    //Generate JWT with payload
        _id: this._id,
        email: this.email,
        name: this.name
    },
        process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;
