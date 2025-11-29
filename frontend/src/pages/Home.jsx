import { Gamepad2, Users, Circle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/start");
  }
  const handlePlayer = () => {
    navigate("/player");
  }

  const handleLeaderboard = () => {
    navigate("/leaderboard");
  }

  const hanldeRecentGame = () => {
    navigate("/recentgame")
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden nunito-uniquifier">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float-slow">
          <Circle className="w-16 h-16 text-purple-300 opacity-30" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delay-1">
          <X className="w-20 h-20 text-blue-300 opacity-30" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float-delay-2">
          <Circle className="w-12 h-12 text-pink-300 opacity-30" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float-slow">
          <X className="w-14 h-14 text-purple-300 opacity-30" />
        </div>
        <div className="absolute bottom-20 right-40 animate-float-delay-1">
          <Circle className="w-18 h-18 text-blue-300 opacity-30" />
        </div>
        <div className="absolute top-1/2 left-20 animate-float-delay-2">
          <X className="w-16 h-16 text-pink-300 opacity-30" />
        </div>

        {/* Animated Grid Patterns */}
        <div className="absolute top-10 right-10 animate-spin-slow opacity-20">
          <div className="grid grid-cols-3 gap-2 w-24 h-24">
            <div className="border-2 border-purple-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-purple-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-purple-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-purple-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-purple-400 rounded"></div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 animate-spin-slow-reverse opacity-20">
          <div className="grid grid-cols-3 gap-2 w-20 h-20">
            <div className="border-2 border-pink-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-pink-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-pink-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-pink-400 rounded"></div>
            <div className="border-2 border-blue-400 rounded"></div>
            <div className="border-2 border-pink-400 rounded"></div>
          </div>
        </div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-slide-down">
              Tic-Tac-Toe
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto animate-slide-up">
              Challenge yourself in the ultimate strategy game. Play with friends or test your skills against AI!
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in border-2 border-transparent hover:border-purple-300 relative overflow-hidden">
              {/* Decorative Icons in Card */}
              <div className="absolute top-4 right-4 opacity-10">
                <Circle className="w-16 h-16 text-purple-600" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-10">
                <X className="w-16 h-16 text-blue-600" />
              </div>

              <div className="flex justify-center mb-6 relative z-10">
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-5 rounded-full animate-float shadow-xl">
                    <Gamepad2 className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                Player vs Ai
              </h2>
              <p className="text-gray-600 text-center mb-8 text-lg">
                Test your skills against an intelligent computer opponent!
              </p>

              <button onClick={handleStart} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                <Gamepad2 className="w-7 h-7 group-hover:rotate-12 transition-transform duration-200 relative z-10" />
                <span className="relative z-10">Start Game</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in border-2 border-transparent hover:border-green-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Circle className="w-16 h-16 text-green-600" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-10">
                <X className="w-16 h-16 text-orange-600" />
              </div>

              <div className="flex justify-center mb-6 relative z-10">
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-500 to-orange-600 p-5 rounded-full animate-float shadow-xl">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                Player vs Player
              </h2>
              <p className="text-gray-600 text-center mb-8 text-lg">
                Challenge your friend to a classic match. Best strategy wins!
              </p>

              <button onClick={handlePlayer} className="w-full bg-gradient-to-r from-green-600 to-orange-600 text-white py-5 rounded-xl font-bold text-xl hover:from-green-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                <Users className="w-7 h-7 group-hover:rotate-12 transition-transform duration-200 relative z-10" />
                <span className="relative z-10">Start Game</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button onClick={handleLeaderboard}>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-2 border border-transparent hover:border-purple-300">
                <div className="flex justify-center mb-2">
                  <div className="text-3xl">🏆</div>
                </div>
                <p className="text-gray-700 font-semibold text-sm">Leaderboard</p>

              </div>
            </button>


            <button onClick={hanldeRecentGame}>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-2 border border-transparent hover:border-purple-300">
                <div className="flex justify-center mb-2">
                  <div className="text-3xl">🎯</div>
                </div>
                <p className="text-gray-700 font-semibold text-sm">Recent Games</p>

              </div>
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-delay-1 {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) translateX(-10px) rotate(10deg);
          }
        }

        @keyframes float-delay-2 {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) translateX(15px) rotate(-10deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float-delay-1 7s ease-in-out infinite;
        }

        .animate-float-delay-2 {
          animation: float-delay-2 8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;