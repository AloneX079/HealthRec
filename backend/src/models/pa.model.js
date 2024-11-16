const mongoose=require('mongoose')

const paSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Schema.Types.UUID,
        ref: 'Pending'
    },
    doctor:{
        type: String,
        ref: 'User',
    },
    hospital:{
        type: String,
        ref: 'Hospital',
    }
},{timestamps:true})

const pa = mongoose.model('Pending', paSchema)

module.exports = pa
