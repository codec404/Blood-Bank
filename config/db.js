import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Succesfully Connected to the Database to ${mongoose.connection.host}`);
    }
    catch(error){
        console.log('Failed to connect to database');
    }
}

export default connectDb