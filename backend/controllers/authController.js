import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(402).json({ message: "All fields is required!!" })
        }
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return res.status(402).json({ message: "This user already exits!!" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashPassword,
            tournamentsWon: 0
        });
        const jwttoken = jwt.sign({ email: user.email, _id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "8h"
        })
        await user.save();
        res.status(201).json({ message: `${name} registered successFully!!`, token: jwttoken, user: { name: user.name, email: user.email, password: user.password, _id: user._id } })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(402).json({ message: "All fields is required!!" })
        }
        const existsUser = await User.findOne({ email });
        if (!existsUser) {
            return res.status(402).json({ message: "Email and password wrong!!" })
        }
        const existsPassword = await bcrypt.compare(password, existsUser.password)
        if (!existsPassword) {
            return res.status(402).json({ message: "Email and password wrong!!" })
        }
        const jwttoken = jwt.sign({ email: existsUser.email, _id: existsUser._id }, process.env.SECRET_KEY, {
            expiresIn: "8h"
        })
        res.status(200).json({ message: "User login successFully!!", token: jwttoken, user: { name: existsUser.name, email: existsUser.email, _id: existsUser._id } })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { register, login };