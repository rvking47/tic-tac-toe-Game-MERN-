import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { tournamentStrat, tournamentFinish, tournament, getLeaderboard, getRecentGames } from "../controllers/tournamentContoller.js";

const tournamentRoute = express.Router();

tournamentRoute.post("/start", authMiddleware, tournamentStrat);
tournamentRoute.post("/:id/level/:level/finish", authMiddleware, tournamentFinish);
tournamentRoute.get("/leaderboard", getLeaderboard);
tournamentRoute.get("/games/recent", authMiddleware, getRecentGames);
tournamentRoute.get("/:id", authMiddleware, tournament);

export default tournamentRoute;
