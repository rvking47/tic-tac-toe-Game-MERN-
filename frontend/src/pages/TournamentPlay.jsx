import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TournamentResult from "./TournamentResult";
import { Trophy, Award, X, Circle, Play, Star, Zap } from 'lucide-react';

const base_url = "http://localhost:7001";

const emptyBoard = Array(9).fill("");

const TournamentPlay = () => {
    const [tournament, setTournament] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [board, setBoard] = useState(emptyBoard);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [winner, setWinner] = useState(null); // "X" | "O" | "draw" | null
    const [moves, setMoves] = useState([]); // strings like "X:4" or "O:2"
    const [isTournamentOver, setIsTournamentOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");
    const aiTimeoutRef = useRef(null);

    const startTournament = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(
                `${base_url}/api/tournament/start`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTournament(res.data.tournament);
            setCurrentLevel(1);
            setBoard(emptyBoard);
            setMoves([]);
            setWinner(null);
            setPlayerTurn(true);
            setIsTournamentOver(false);
        } catch (err) {
            console.error(err);
            alert("Error starting tournament");
        } finally {
            setIsLoading(false);
        }
    };

    // Player click
    const handleClick = (index) => {
        if (!playerTurn || winner || board[index] !== "") return;

        const newBoard = [...board];
        newBoard[index] = "X";
        setBoard(newBoard);
        setMoves((p) => [...p, `X:${index}`]);

        if (checkWinner(newBoard, "X")) {
            setWinner("X");
            // finishLevel will be called from checkWinner below via setTimeout to allow UX
            setTimeout(() => finishLevel("X"), 700);
            return;
        }

        if (!newBoard.includes("")) {
            setWinner("draw");
            setTimeout(() => finishLevel("draw"), 700);
            return;
        }

        setPlayerTurn(false);
    };

    const aiMoveByLevel = (level) => {
        if (winner || playerTurn) return;

        const newBoard = [...board];
        const winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        const empty = newBoard.map((v, i) => v === "" ? i : null).filter(v => v !== null);

        let move = null;
        let moveMade = false;

        const findLineMove = (targetSymbol) => {
            for (let [a, b, c] of winLines) {
                const line = [newBoard[a], newBoard[b], newBoard[c]];
                if (line.filter(v => v === targetSymbol).length === 2 && line.includes("")) {
                    return [a, b, c].find(i => newBoard[i] === "");
                }
            }
            return null;
        };

        if (level === 1) {
            move = empty[Math.floor(Math.random() * empty.length)];
            moveMade = true;
        } else if (level === 2) {
            const block = findLineMove("X");
            if (block !== null) { move = block; moveMade = true; }
            else { move = empty[Math.floor(Math.random() * empty.length)]; moveMade = true; }
        } else if (level === 3) {
            // try win
            const win = findLineMove("O");
            if (win !== null) { move = win; moveMade = true; }
            else {
                const block = findLineMove("X");
                if (block !== null) { move = block; moveMade = true; }
            }
            if (!moveMade) { move = empty[Math.floor(Math.random() * empty.length)]; moveMade = true; }
        } else if (level === 4) {
            const win = findLineMove("O");
            if (win !== null) { move = win; moveMade = true; }
            if (!moveMade) {
                const block = findLineMove("X");
                if (block !== null) { move = block; moveMade = true; }
            }
            if (!moveMade && newBoard[4] === "") { move = 4; moveMade = true; }
            if (!moveMade) {
                const corners = [0, 2, 6, 8].filter(i => newBoard[i] === "");
                if (corners.length > 0) { move = corners[Math.floor(Math.random() * corners.length)]; moveMade = true; }
            }
            if (!moveMade) { move = empty[Math.floor(Math.random() * empty.length)]; moveMade = true; }
        } else if (level === 5) {
            const win = findLineMove("O");
            if (win !== null) { move = win; moveMade = true; }
            if (!moveMade) {
                const block = findLineMove("X");
                if (block !== null) { move = block; moveMade = true; }
            }
            if (!moveMade && newBoard[4] === "") { move = 4; moveMade = true; }
            if (!moveMade) {
                const corners = [0, 2, 6, 8].filter(i => newBoard[i] === "");
                if (corners.length > 0) { move = corners[Math.floor(Math.random() * corners.length)]; moveMade = true; }
            }
            if (!moveMade) { move = empty[Math.floor(Math.random() * empty.length)]; moveMade = true; }
        }

        if (move === null || !Number.isFinite(move)) {
            const empties = newBoard.map((v, i) => v === "" ? i : null).filter(v => v !== null);
            if (empties.length === 0) return;
            move = empties[Math.floor(Math.random() * empties.length)];
        }

        newBoard[move] = "O";
        setBoard(newBoard);
        setMoves(prev => [...prev, `O:${move}`]);
        if (checkWinner(newBoard, "O")) {
            setWinner("O");
            setTimeout(() => finishLevel("O"), 700);
            return;
        }
        if (!newBoard.includes("")) {
            setWinner("draw");
            setTimeout(() => finishLevel("draw"), 700);
            return;
        }
        setPlayerTurn(true);
    };

    useEffect(() => {
        if (!playerTurn && !winner) {
            aiTimeoutRef.current = setTimeout(() => {
                aiMoveByLevel(currentLevel);
            }, 600);
            return () => clearTimeout(aiTimeoutRef.current);
        }
        return undefined;
    }, [playerTurn, currentLevel, winner]);

    const checkWinner = (boardToCheck, symbol) => {
        const winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let [a, b, c] of winLines) {
            if (boardToCheck[a] === symbol && boardToCheck[b] === symbol && boardToCheck[c] === symbol) {
                return true;
            }
        }
        return false;
    };

    const finishLevel = async (winnerSymbol) => {
        try {
            const w = winnerSymbol?.toUpperCase();

            const payload = {
                winner: w === "X" ? "player" : w === "O" ? "ai" : "draw",
                moves,
                playerSymbol: "X",
                aiSymbol: "O",
            };

            const res = await axios.post(
                `${base_url}/api/tournament/${tournament._id}/level/${currentLevel}/finish`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(res);

            const updated = res.data.tournament;
            setTournament(updated);

            const finishedCount = updated.levels.filter(l => l.completed).length;

            if (finishedCount === 5) {
                setIsTournamentOver(true);
                return;
            }

            setTimeout(() => {
                setBoard([...emptyBoard]);
                setMoves([]);
                setWinner(null);
                setPlayerTurn(true);

                setCurrentLevel(prev => prev + 1);
            }, 500);

        } catch (err) {
            console.error(err);
            alert("Error finishing level");
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 md:mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Trophy className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 animate-pulse" />
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Tournament Play
                        </h1>
                        <Trophy className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 animate-pulse" />
                    </div>
                    <p className="text-gray-300 text-sm md:text-base">Battle through 5 levels of increasing difficulty</p>
                </div>

                {!tournament && (
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-md w-full">
                            <div className="text-center mb-8">
                                <Star className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Compete?</h2>
                                <p className="text-gray-400">Challenge the AI and prove your skills</p>
                            </div>

                            <button
                                onClick={startTournament}
                                disabled={isLoading}
                                className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                {isLoading ? "Starting Tournament..." : "Start Tournament"}
                            </button>
                        </div>
                    </div>
                )}

                {tournament && (
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-2xl border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-yellow-400" />
                                    <span className="text-lg md:text-xl font-bold">Level {currentLevel}</span>
                                </div>
                                <span className="text-gray-400 text-sm md:text-base">of 5</span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(currentLevel / 5) * 100}%` }}
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${level < currentLevel
                                            ? 'bg-green-500 text-white'
                                            : level === currentLevel
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110 ring-4 ring-purple-500/50'
                                                : 'bg-gray-700 text-gray-400'
                                            }`}
                                    >
                                        {level}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10">
                            <div className="flex flex-col items-center">
                                <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-md aspect-square">
                                    {board.map((val, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleClick(i)}
                                            disabled={val !== '' || winner}
                                            className="relative bg-gradient-to-br from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-2xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl border border-white/5 group disabled:cursor-not-allowed"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-200" />

                                            <div className="relative flex items-center justify-center h-full">
                                                {val === 'X' && (
                                                    <X className="w-12 h-12 md:w-16 md:h-16 text-blue-400" strokeWidth={3} />
                                                )}
                                                {val === 'O' && (
                                                    <Circle className="w-12 h-12 md:w-16 md:h-16 text-pink-400" strokeWidth={3} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {winner && (
                                    <div className="mt-8 text-center">
                                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-2xl px-6 py-4 backdrop-blur-sm">
                                            <Award className="w-10 h-10 mx-auto mb-2 text-yellow-400 animate-bounce" />
                                            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                                {winner === "draw" ? "It's a Draw!" : `${winner} Wins This Round!`}
                                            </p>
                                            <p className="text-gray-300 text-sm mt-2">Moving to next level...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/10">
                            <div className="flex items-center justify-around">
                                <div className="flex items-center gap-2">
                                    <X className="w-6 h-6 text-blue-400" strokeWidth={3} />
                                    <span className="font-semibold">You</span>
                                </div>
                                <div className="w-px h-8 bg-white/20" />
                                <div className="flex items-center gap-2">
                                    <Circle className="w-6 h-6 text-pink-400" strokeWidth={3} />
                                    <span className="font-semibold">AI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isTournamentOver && TournamentResult && (
                    <TournamentResult
                        result={tournament}
                        onClose={() => { }}
                    />
                )}
            </div>
        </div>
    );
};

export default TournamentPlay;

