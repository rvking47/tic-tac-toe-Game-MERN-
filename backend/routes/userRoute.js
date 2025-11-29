import express from "express";
import profile from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.get("/me/:id", authMiddleware, profile)

export default userRoute;