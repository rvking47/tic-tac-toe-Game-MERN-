import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                            <div className="bg-white rounded p-1">
                                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                                    <div className="bg-purple-600 rounded-sm"></div>
                                    <div className="bg-blue-600 rounded-sm"></div>
                                    <div className="bg-blue-600 rounded-sm"></div>
                                    <div className="bg-purple-600 rounded-sm"></div>
                                </div>
                            </div>
                            <span>Tic-Tac-Toe</span>
                        </h3>
                        <p className="text-purple-100 text-sm leading-relaxed">
                            Challenge your friends or play against AI in this classic game. Built with React and designed for fun!
                        </p>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-lg font-bold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/home" className="text-purple-100 hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 text-sm group">
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/leaderboard" className="text-purple-100 hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 text-sm group">
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">Leaderboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/recentgame" className="text-purple-100 hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 text-sm group">
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">Recent Game</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-lg font-bold mb-3">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <Link
                                to="https://github.com/rvking47"
                                className="bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Github"
                                target='_blank'
                            >
                                <FaGithub className="w-5 h-5" />
                            </Link>
                            <Link
                                to="#"
                                className="bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </Link>
                            <Link
                                to="https://www.linkedin.com/in/rahul09123/"
                                className="bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="LinkedIn"
                                target='_blank'
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </Link>
                            <Link
                                to="#"
                                className="bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="mt-4">
                            <Link
                                to="https://github.com/rvking47/tic-tac-toe-Game-MERN-"
                                className="inline-flex items-center space-x-2 text-purple-100 hover:text-yellow-300 transition-colors duration-200 text-sm group"
                            >
                                <span>View on GitHub</span>
                                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white border-opacity-20 pt-6">
                    {/* Bottom Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-purple-100 text-sm text-center sm:text-left">
                            © {currentYear} Tic-Tac-Toe Game. All rights reserved.
                        </p>
                        <p className="text-purple-100 text-sm flex items-center space-x-1">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" />
                            <span>by Game Developers  — <b>Rahul Vimal</b></span>
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </footer>
    );
};

export default Footer;