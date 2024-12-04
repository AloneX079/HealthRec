const mongoose=require('mongoose')
const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY;

const recordSchema = new mongoose.Schema({
    pid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fullName:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    gender:{
        type:String
    },
    bloodGroup:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    address:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    ethnicityRace:{
        type:String
    },
    smokingAlcohol:{
        type:String
    },
    medicalHistory:{
        type:[]
    },
    familyMedicalHistory:{
        type:[]
    },
    allergies:{
        type:[]
    },
    immunizationHistory:{
        type:[]
    },
    surgeriesUndergone:{
        type:[]
    },
    heightInCm:{
        type:String
    },
    weightInKg:{
        type:String
    },
    LastBloodPressureInMmHg:{
        type:String
    },
    LastHeartRateInBpm:{
        type:String
    },
    emergencyContactPhone:{
        type:{
            primaryrespondername: { type: String },
            primaryresponderphone: { type: Number },
            secondaryrespondername: { type: String },
            secondaryresponderphone: { type: Number }
          }
    },
    insuranceProvider:{
        type:String
    },
    insurancePolicyNumber:{
        type:String
    },
    visitHistory:{
        type:[]
    }
},{timestamps:true})
// function encrypt(text) {
//     const cipher = crypto.createCipher('des-ede3', Buffer.from(secretKey));
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }
// function decrypt(encryptedData) {
//     const decipher = crypto.createDecipher('des-ede3', Buffer.from(secretKey))
//     let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }
// function decryptAttributes(doc, attributes) {
//     attributes.forEach(attr => {
//         if (doc[attr]) {
//             try {
//                 doc[attr] = decrypt(doc[attr])
//             } catch (error) {
//                 console.error(`Error decrypting ${attr}:`, error.message);
//             }
//         }
//     })
// }

// recordSchema.pre("save", async function (next) {
//     const attributesToEncrypt = [
//         "ethnicityRace",
//         "fullName",
//         "dateOfBirth",
//         "gender",
//         "bloodGroup",
//         "phoneNumber",
//         "address",
//         "maritalStatus"
//     ];
//     for (const attr of attributesToEncrypt) {
//         if (this.isModified(attr)) {
//             const encryptedData = encrypt(this[attr])
//             this[attr] = encryptedData
//         }
//     }
//     next()
// })
// recordSchema.post(['find', 'findOne'], function (result) {
//     if(!result) return;
//     const attributesToDecrypt = [
//         "ethnicityRace",
//         "fullName",
//         "dateOfBirth",
//         "gender",
//         "bloodGroup",
//         "phoneNumber",
//         "address",
//         "maritalStatus",
//     ];
//     if (Array.isArray(result)) {
//         result.forEach(doc => decryptAttributes(doc, attributesToDecrypt));
//     } else {
//         decryptAttributes(result, attributesToDecrypt);
//     }
// })

const Record = mongoose.model('Record',recordSchema)

module.exports = Record