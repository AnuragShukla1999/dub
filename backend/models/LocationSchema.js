import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
});

const locationSchema = new mongoose.Schema({
    pincode: {
        type: Number,
        required: true
    },
    addresses: {
        type: [addressSchema],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
}, { timestamps: true });

const locationModal = mongoose.model('locations', locationSchema);

export default locationModal;
