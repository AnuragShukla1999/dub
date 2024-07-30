import mongoose from "mongoose";


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log ("Database is connected")
    } catch (error) {
        console.error("Error", error)
    }
}


export default dbConnection;