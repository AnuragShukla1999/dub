import locationModal from "../models/LocationSchema.js";


export const getLocation = async (req, res) => {
    // const api_key = "https://api.postalpincode.in/pincode";

    const pincode = req.params.pincode;
    console.log("Received pincode:", pincode);
    try {
        const pinCode = await locationModal.findOne({ pincode })

        if (!pinCode) {
            return res.status(401).json({
                message: "pincode not found"
            })
        }

        res.status(201).json({
            data: pinCode
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};





export const createLocation = async (req, res) => {

    try {
        const { pincode, addresses, city, state } = req.body;

        const location = new locationModal({ pincode, addresses, city, state });

        await location.save();

        res.status(201).json({
            message: "location created successfully",
            location
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}