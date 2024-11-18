const mongoose=require('mongoose')
//This model was made to approve Doctor's request to link to hospital
const paSchema = new mongoose.Schema({
    doctor:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Hospital',
    }
},{timestamps:true})

const Pending = mongoose.model('Pending', paSchema)

module.exports = Pending
