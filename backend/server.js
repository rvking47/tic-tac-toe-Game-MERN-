import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import tournamentRoute from "./routes/tournamentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
ConnectDB();
const app = express();
app.use(express.json());
app.use(cors());

//Deployement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/tournament", tournamentRoute);

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server is running port http://localhost:${PORT}`)
});