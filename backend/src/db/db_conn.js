const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const dbconn= await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`Mongoose connected to ${dbconn.connection.host}`);
    }catch(err){
        console.error("Failed to Reach Database!:",err);
        process.exit(1);
    }
}
module.exports= connectDB