import User from "../models/userModel.js";

const profile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id, user: req.userId });
        if (!user) {
            res.status(402).json({ message: "User not found" });
        }
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default profile;