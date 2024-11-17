const mongoose=require('mongoose')
//This model grants permission to a doctor to view a patient's record
const permSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Schema.Types.UUID,
        ref: 'Perm'
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessGranted: {
        type: Date,
        default: Date.now
    }
},{timestamps:true})

const Perm = mongoose.model('Perm',permSchema)

module.exports = Perm