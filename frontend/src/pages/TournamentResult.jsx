import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Trophy, RotateCcw } from "lucide-react";

const TournamentResult = ({ result, onClose }) => {
    const navigate = useNavigate();
    const levels = result?.levels ?? [];

    useEffect(() => {
        console.log("TournamentResult — raw levels:", levels);
    }, [levels]);

    const inferLevelResult = (level) => {
        if (!level) return null;

        if (typeof level.result === "string" && level.result.trim().toLowerCase() === "player") {
            return "player";
        }

        if (level.winner && result?.player && String(level.winner) === String(result.player)) {
            return "player";
        }
        return null;
    };

    const normalized = useMemo(() => {
        return levels.map((l) => ({ ...l, inferredResult: inferLevelResult(l) }));
    }, [levels]);

    const playerWins = normalized.filter((l) => l.inferredResult === "player").length;

    const handleClose = () => {
        if (typeof onClose === "function") onClose();
        navigate("/home");
    };
    const handleRestart = () => {
        navigate("/start");
        window.location.reload();
    };


    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-3xl max-w-2xl w-full p-6 border border-white/10">
                {/* Close */}
                <div className="flex justify-end">
                    <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Header */}
                <div className="text-center mb-6">
                    <Trophy className="w-16 h-16 mx-auto text-yellow-400 animate-bounce" />
                    <h2 className="text-3xl font-bold mt-2">Tournament Finished!</h2>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/40 p-4 rounded-xl text-center mb-4">
                    <p className="text-sm text-gray-300">You</p>
                    <p className="text-2xl font-bold">{playerWins}</p>
                    <p className="text-xs text-gray-400 mt-1">wins</p>
                </div>

                <div className="text-center text-sm text-gray-300 mb-4">
                    <p className="font-semibold">
                        {playerWins > 0 ? "🏆 You won the tournament!" : "Tournament ended!"}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={handleClose} className="flex-1 bg-white/10 py-3 rounded-xl hover:bg-white/20">Close</button>
                    <button onClick={handleRestart} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl flex items-center justify-center gap-2">
                        <RotateCcw className="w-5 h-5" /> Play Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TournamentResult;
