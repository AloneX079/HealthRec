const mongoose=require('mongoose')

const recordSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Schema.Types.UUID,
        ref: 'Record'
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
    maritialStatus:{
        type:String
    },
    ethinicityRace:{
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
    prevMedications:{
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
    smokingAlcohol:{
        type:String
    },
    emergencyContactPhone:{
        type:[]
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
})