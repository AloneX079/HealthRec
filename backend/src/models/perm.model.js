const mongoose=require('mongoose')

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
    }
},{timestamps:true})

const Perm = mongoose.model('Perm',permSchema)

module.exports = Perm