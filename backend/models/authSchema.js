import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
},
{
    timestamps: true
});


const authModel = mongoose.model("user", authSchema);

export default authModel;