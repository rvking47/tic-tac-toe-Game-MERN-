import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const base_url = "http://localhost:7001";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const naviagte = useNavigate();

  const handleBack = () => naviagte("/home");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${base_url}/api/tournament/leaderboard`);
        setLeaders(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalColor = (index) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600';
    if (index === 1) return 'from-gray-300 to-gray-500';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-slate-600 to-slate-700';
  };

  const getMedalIcon = (index) => {
    if (index === 0) return '👑';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '🎮';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Champions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
      {/* Header with Back Button */}
      <div className="max-w-5xl mx-auto mb-8">
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
            <div className="text-6xl md:text-7xl animate-bounce">🏆</div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 mb-3">
            Hall of Champions
          </h1>
          <p className="text-purple-200 text-lg md:text-xl">Top Tournament Warriors</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        {leaders.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-12 text-center border border-purple-500/20">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-gray-300 text-xl">No champions yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaders.map((user, idx) => (
              <div
                key={user._id}
                className="group relative bg-gradient-to-r from-slate-800/80 to-slate-800/50 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute -left-3 -top-3 md:-left-4 md:-top-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${getMedalColor(idx)} flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                    <span className="text-2xl md:text-3xl">{getMedalIcon(idx)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between ml-8 md:ml-12">
                  <div className="flex items-center gap-4 md:gap-6 flex-1">
                    <div className="text-3xl md:text-5xl font-bold text-white/20 group-hover:text-purple-400/40 transition-colors duration-300">
                      #{idx + 1}
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl md:text-2xl font-bold text-white shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1 truncate">
                        {user.name}
                      </h3>
                      <p className="text-sm md:text-base text-purple-300">Tournament Champion</p>
                    </div>
                  </div>

                  <div className="ml-4 text-right">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg group-hover:shadow-purple-500/50 transition-shadow duration-300">
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div>
                        <div className="text-xl md:text-3xl font-bold text-white leading-none">
                          {user.tournamentsWon}
                        </div>
                        <div className="text-xs md:text-sm text-purple-100">wins</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {leaders.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500/20">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-white">{leaders.length}</div>
            <div className="text-purple-300">Total User Champions</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500/20">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-white">
              {leaders.reduce((sum, user) => sum + user.tournamentsWon, 0)}
            </div>
            <div className="text-purple-300">Total Win Tournaments</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500/20">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-white">
              {leaders[0]?.tournamentsWon || 0}
            </div>
            <div className="text-purple-300">Top Record</div>
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

export default Leaderboard;