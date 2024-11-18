const mongoose=require('mongoose')
//This model was made to approve Doctor's request to link to hospital
const paSchema = new mongoose.Schema({
    doctor:{
        type: String,
        ref: 'User',
    },
    hospital:{
        type: String,
        ref: 'Hospital',
    }
},{timestamps:true})

const Pending = mongoose.model('Pending', paSchema)

module.exports = Pending
