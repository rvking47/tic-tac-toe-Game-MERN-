import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(400).json({ message: "Authorization Error!!" })
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "Token Error!!" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded._id).select("-passwordHash");
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default authMiddleware;

