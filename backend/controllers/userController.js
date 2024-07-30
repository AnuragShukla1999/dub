import authModel from "../models/authSchema.js";



export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await authModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}