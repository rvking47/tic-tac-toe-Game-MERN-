import React, { useEffect, useState } from 'react';
import { Menu, X, User, Trophy, Settings, LogOut, Home, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const base_url = "https://tic-tac-toe-game-mern.onrender.com";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [profileEmail, setProfileEmail] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }

    const hanldeRecentGame = () => navigate("/recentgame");
    const handleLeaderboard = () => navigate("/leaderboard");
    const handleHome = () => navigate("/home");


    useEffect(() => {
        const accessToken = localStorage.getItem("user");
        if (accessToken) {
            const parseUser = JSON.parse(accessToken);
            setProfileName(parseUser.name);
            setProfileEmail(parseUser.email);
        }

        const token = localStorage.getItem("token");

        axios.get(`${base_url}/api/tournament/stats`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setStats(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 shadow-lg nunito-uniquifier">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo & Title */}
                        <div className="flex items-center space-x-3 animate-fade-in">
                            <div className="bg-white rounded-lg p-2 shadow-md transform hover:scale-110 transition-transform duration-200">
                                <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                                    <div className="bg-purple-600 rounded-sm"></div>
                                    <div className="bg-blue-600 rounded-sm"></div>
                                    <div className="bg-blue-600 rounded-sm"></div>
                                    <div className="bg-purple-600 rounded-sm"></div>
                                </div>
                            </div>
                            <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide">
                                Tic-Tac-Toe
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button onClick={handleHome} className="text-white hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105">
                                <Home className="w-5 h-5" />
                                <span className="font-medium">Home</span>
                            </button>
                            <button onClick={handleLeaderboard} className="text-white hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105">
                                <Trophy className="w-5 h-5" />
                                <span className="font-medium">Leaderboard</span>
                            </button>
                            <button onClick={hanldeRecentGame} className="text-white hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105">
                                <Gamepad2 className="w-5 h-5" />
                                <span className="font-medium">Recent Games</span>
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-yellow-300 hover:text-purple-700 transition-all duration-200 shadow-md transform hover:scale-105"
                            >
                                <User className="w-5 h-5" />
                                <span>Profile & Logout</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white hover:text-yellow-300 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden pb-4 animate-slide-down">
                            <div className="flex flex-col space-y-3">
                                <button onClick={handleHome} className="text-white hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105">
                                    <Home className="w-5 h-5" />
                                    <span className="font-medium">Home</span>
                                </button>
                                <button onClick={handleLeaderboard} className="text-white hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 py-2">
                                    <Trophy className="w-5 h-5" />
                                    <span className="font-medium">Leaderboard</span>
                                </button>
                                <button onClick={hanldeRecentGame} className="text-white hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105">
                                    <Gamepad2 className="w-5 h-5" />
                                    <span className="font-medium">Recent Games</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-yellow-300 hover:text-purple-700 transition-all duration-200 shadow-md w-full justify-center"
                                >
                                    <User className="w-5 h-5" />
                                    <span>Profile & Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in nunito-uniquifier">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in transform">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-bounce-once">
                                <User className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{profileName}</h2>
                            <p className="text-gray-500 mb-6">{profileEmail}</p>
                            <div className="w-full space-y-3">
                                <button onClick={handleLogout} className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
      `}</style>
        </>
    );
};

export default Navbar;