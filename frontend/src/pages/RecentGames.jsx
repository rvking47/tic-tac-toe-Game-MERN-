import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const base_url = "https://tic-tac-toe-game-mern.onrender.com";

const RecentGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBack = () => navigate("/home");

    useEffect(() => {
        const fetchRecentGames = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `${base_url}/api/tournament/games/recent?limit=10`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setGames(res.data.games);
            } catch (err) {
                console.error("Error fetching recent games:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentGames();
    }, []);

    const getResultBadge = (playerWins, aiWins) => {
        if (playerWins > aiWins) {
            return { text: 'VICTORY', color: 'from-green-500 to-emerald-600', icon: '🏆' };
        } else if (aiWins > playerWins) {
            return { text: 'DEFEAT', color: 'from-red-500 to-rose-600', icon: '💀' };
        } else {
            return { text: 'DRAW', color: 'from-yellow-500 to-orange-600', icon: '🤝' };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-3xl">
                            🎮
                        </div>
                    </div>
                    <p className="text-white text-xl font-semibold animate-pulse">Loading Battle History...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
            {/* Header with Back Button */}
            <div className="max-w-6xl mx-auto mb-8">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group mb-6"
                >
                    <svg
                        className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">Back</span>
                </button>

                <div className="text-center animate-fade-in">
                    <div className="inline-block mb-4">
                        <div className="text-6xl md:text-7xl animate-bounce">⚔️</div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-3">
                        Battle History
                    </h1>
                    <p className="text-purple-200 text-lg md:text-xl">Your Recent Game Matches</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {games.length === 0 ? (
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-12 text-center border border-purple-500/20">
                        <div className="text-6xl mb-4">🎯</div>
                        <p className="text-gray-300 text-xl">No battles fought yet. Start your journey!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        {games.map((game, idx) => {
                            const playerName = game.player?.name || "Unknown";
                            const winnerName = game.winner?.name || "AI";
                            const totalLevels = game.levels?.length || 0;
                            const finishedLevels = game.levels?.filter(l => l.completed).length || 0;
                            const result = getResultBadge(game.playerWins, game.aiWins);

                            return (
                                <div
                                    key={game._id}
                                    className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 animate-slide-up overflow-hidden"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>

                                    <div className="absolute top-4 right-4">
                                        <div className={`bg-gradient-to-r ${result.color} px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform group-hover:scale-110 transition-transform duration-300`}>
                                            <span className="text-xl">{result.icon}</span>
                                            <span className="text-white font-bold text-sm">{result.text}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                                                #{idx + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Game Match</h3>
                                                <p className="text-purple-300 text-sm flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {new Date(game.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-purple-200 text-sm font-medium">Level Progress</span>
                                            <span className="text-white font-bold">{finishedLevels}/{totalLevels}</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                                                style={{
                                                    width: `${totalLevels > 0 ? (finishedLevels / totalLevels) * 100 : 0}%`,
                                                    animationDelay: `${idx * 100 + 300}ms`
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Player Wins */}
                                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-4 hover:border-green-500/50 transition-colors duration-300">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-green-300 text-sm font-medium">Player</span>
                                            </div>
                                            <div className="text-3xl font-bold text-green-400">{game.playerWins}</div>
                                            <div className="text-green-300/70 text-xs">Wins</div>
                                        </div>

                                        <div className="bg-gradient-to-br from-red-500/10 to-rose-600/10 border border-red-500/30 rounded-xl p-4 hover:border-red-500/50 transition-colors duration-300">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-red-300 text-sm font-medium">AI + Draw</span>
                                            </div>
                                            <div className="text-3xl font-bold text-red-400">{game.aiWins}</div>
                                            <div className="text-red-300/70 text-xs">Wins</div>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {games.length > 0 && (
                <div className="max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
                        <div className="text-3xl mb-2">🏆</div>
                        <div className="text-xl md:text-2xl font-bold text-green-400">
                            {games.filter(g => g.playerWins > g.aiWins).length}
                        </div>
                        <div className="text-green-300 text-sm">Victories</div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                        <div className="text-3xl mb-2">💀</div>
                        <div className="text-xl md:text-2xl font-bold text-red-400">
                            {games.filter(g => g.aiWins > g.playerWins).length}
                        </div>
                        <div className="text-red-300 text-sm">Defeats</div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="text-xl md:text-2xl font-bold text-purple-400">
                            {Math.round((games.filter(g => g.playerWins > g.aiWins).length / games.length) * 100)}%
                        </div>
                        <div className="text-purple-300 text-sm">Win Rate</div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    );
};

export default RecentGames;