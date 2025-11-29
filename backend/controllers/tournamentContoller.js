import Tournament from "../models/tournamentModel.js";
import User from "../models/userModel.js";

const tournamentStrat = async (req, res) => {
    try {
        const levels = Array.from({ length: 5 }, (_, i) => ({
            level: i + 1,
            result: null,
            winner: null,
            moves: [],
            playerSymbol: "X",
            aiSymbol: "O",
            completed: false
        }));

        const tournament = await Tournament.create({
            player: req.user._id,
            levels,
            winner: null,
        });

        res.status(201).json({
            message: "Tournament started",
            tournament,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const tournamentFinish = async (req, res) => {
    try {
        const { id, level } = req.params;
        const { winner, moves, playerSymbol, aiSymbol } = req.body;

        if (!["player", "ai", "draw"].includes(winner)) {
            return res.status(400).json({ error: "Invalid winner value" });
        }

        const tournament = await Tournament.findById(id);
        if (!tournament) return res.status(404).json({ error: "Tournament not found" });

        if (tournament.player.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Not authorized" });
        }

        // Update this level
        const levelIndex = tournament.levels.findIndex(l => l.level == level);
        if (levelIndex === -1) return res.status(404).json({ error: "Invalid level number" });

        tournament.levels[levelIndex].result = winner;
        tournament.levels[levelIndex].winner = winner === "player" ? req.user._id : null;
        tournament.levels[levelIndex].moves = moves;
        tournament.levels[levelIndex].playerSymbol = playerSymbol;
        tournament.levels[levelIndex].aiSymbol = aiSymbol;
        tournament.levels[levelIndex].completed = true;

        if (winner === "player") {
            await User.findByIdAndUpdate(
                req.user._id,
                { $inc: { tournamentsWon: 1 } },
                { new: true }
            );
        }

        await tournament.save();

        const completedCount = tournament.levels.filter(l => l.completed).length;

        if (completedCount === 5) {
            const playerWins = tournament.levels.filter(l => l.result === "player").length;
            const aiWins = tournament.levels.filter(l => l.result === "ai").length;

            if (playerWins > aiWins) {
                tournament.winner = req.user._id;
                await User.findByIdAndUpdate(
                    req.user._id,
                    { $inc: { tournamentsWon: 1 } },
                    { new: true, strict: false }
                );

            } else if (aiWins > playerWins) {
                tournament.winner = null;
            } else {
                tournament.winner = null;
            }

            await tournament.save();
        }
        res.json({
            message: `Level ${level} saved successfully`,
            tournament
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const tournament = async (req, res) => {
    try {
        const { id } = req.params;

        const tournament = await Tournament.findById(id)
            .populate("player", "name email")
            .populate("levels.winner", "name email");

        if (!tournament) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        if (tournament.player._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Not authorized to view this tournament" });
        }

        res.json({
            message: "Tournament status fetched",
            tournament,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getLeaderboard = async (req, res) => {
    try {
        const topUsers = await User.find({}, "name email tournamentsWon")
            .sort({ tournamentsWon: -1 })
            .limit(10);

        res.json(topUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRecentGames = async (req, res) => {
    try {
        const { limit = 5 } = req.query;

        const filter = { player: req.user._id };

        const recentGames = await Tournament.find(filter)
            .populate("player", "name email")
            .populate("winner", "name email")
            .sort({ createdAt: -1 })
            .limit(Number(limit));

        const formattedGames = recentGames.map(game => {
            let playerWins = 0;
            let aiWins = 0;

            game.levels.forEach(level => {
                if (String(level.winner) === String(game.player._id)) {
                    playerWins++;
                }
                else {
                    aiWins++;
                }
            });

            return {
                ...game.toObject(),
                playerWins,
                aiWins
            };
        });

        res.json({
            count: formattedGames.length,
            games: formattedGames
        });

    } catch (error) {
        console.error("Error fetching recent games:", error);
        res.status(500).json({ error: error.message });
    }
};

export { tournamentStrat, tournamentFinish, tournament, getLeaderboard, getRecentGames };