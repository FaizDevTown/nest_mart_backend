import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`C`)
        
    } catch (error) {
        console.log(`Error connecting in db: ${error.message}`);
        
    }
}
export default connectDB