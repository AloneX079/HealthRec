const mongoose=require('mongoose')

const prescSchema = new mongoose.Schema({
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    illness:{
        type:String
    },
    prescription:{
        type:String
    }
},{timestamps:true})

const Presc = mongoose.model('Presc',prescSchema)
module.exports = Presc