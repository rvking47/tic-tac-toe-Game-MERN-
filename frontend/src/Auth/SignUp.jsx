import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTrophy, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

const base_url = "https://tic-tac-toe-game-mern.onrender.com";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [particles, setParticles] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${base_url}/api/auth/register`, { name, email, password }, {
                headers: { "Content-Type": "application/json" },
                validateStatus: () => true
            });
            if (result.status === 201) {
                toast.success(result.data.message);
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user))
                setName("");
                setEmail("");
                setPassword("");
                setTimeout(() => {
                    navigate("/home")
                }, 2000);
            }
            else {
                toast.error(result.data.message);
            }
        }
        catch (err) {
            toast.error("Server Error!!");
        }
    };

    const handleLoginGo = () => {
        navigate("/login")
    }

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 10 + 5,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);

        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden nunito-uniquifier">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-white opacity-20 animate-pulse"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: '3s'
                    }}
                />
            ))}

            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-3 gap-8 h-full w-full p-8">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="border-4 border-white rounded-lg"></div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="flex justify-center mb-6 animate-bounce">
                    <FaTrophy className="text-yellow-400 text-6xl drop-shadow-2xl" />
                </div>

                <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50 animate-pulse"></div>

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center relative overflow-hidden">
                            <div className="absolute top-2 left-4 text-4xl font-bold text-white opacity-20 animate-spin" style={{ animationDuration: '10s' }}>X</div>
                            <div className="absolute bottom-2 right-4 text-4xl font-bold text-white opacity-20 animate-spin" style={{ animationDuration: '8s' }}>O</div>

                            <div className="flex justify-center gap-2 mb-4">
                                <FaStar className="text-yellow-300 text-2xl animate-pulse" style={{ animationDelay: '0s' }} />
                                <FaStar className="text-yellow-300 text-3xl animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <FaStar className="text-yellow-300 text-2xl animate-pulse" style={{ animationDelay: '0.4s' }} />
                            </div>

                            <h1 className="text-4xl font-black text-white mb-2 tracking-wider animate-pulse">
                                TIC-TAC-TOE
                            </h1>
                            <p className="text-yellow-300 font-bold text-lg">PLAYER SIGNUP</p>
                            <div className="mt-4 flex justify-center gap-2">
                                {['X', 'O', 'X'].map((symbol, i) => (
                                    <div key={i} className="w-12 h-12 bg-white  bg-opacity-20 rounded-lg flex items-center justify-center text-2xl font-bold text-yellow-500 transform hover:scale-110 transition-transform cursor-pointer">
                                        {symbol}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="p-8 space-y-5">
                            {/* Username Field */}
                            <div className="relative group">
                                <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">
                                    Player Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaUser className="text-purple-400 text-lg" />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800 border-2 border-purple-500 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-30 transition-all transform hover:scale-105"
                                        placeholder="Enter your game name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-purple-400 text-lg" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800 border-2 border-purple-500 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-30 transition-all transform hover:scale-105"
                                        placeholder="player@game.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaLock className="text-purple-400 text-lg" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 bg-gray-800 border-2 border-purple-500 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-30 transition-all transform hover:scale-105"
                                        placeholder="Create password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-400 hover:text-pink-400 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-black py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 shadow-2xl uppercase tracking-widest text-lg border-2 border-pink-400 animate-pulse"
                            >
                                🎮 START GAME 🎮
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-gray-400 text-sm mb-2">Already a player?</p>
                                <button onClick={handleLoginGo} className="text-pink-400 hover:text-pink-300 font-bold transition-colors text-lg uppercase tracking-wide">
                                    Login Here
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-xl p-3 border-2 border-purple-500 transform hover:scale-110 transition-transform">
                        <div className="text-2xl font-bold text-yellow-400">1M+</div>
                        <div className="text-xs text-gray-400 uppercase">Players</div>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-xl p-3 border-2 border-pink-500 transform hover:scale-110 transition-transform">
                        <div className="text-2xl font-bold text-pink-400">10M+</div>
                        <div className="text-xs text-gray-400 uppercase">Games</div>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-xl p-3 border-2 border-purple-500 transform hover:scale-110 transition-transform">
                        <div className="text-2xl font-bold text-purple-400">24/7</div>
                        <div className="text-xs text-gray-400 uppercase">Online</div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default SignUp;