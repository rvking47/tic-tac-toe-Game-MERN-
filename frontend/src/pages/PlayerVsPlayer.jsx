import React, { useState } from 'react';
import { X, Circle, RotateCcw, Users, Award, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlayerVsPlayer = () => {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard);
  const [playerTurn, setPlayerTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const navigate = useNavigate();

  const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (board) => {
    for (let [a, b, c] of winLines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningLine([a, b, c]);
        return board[a];
      }
    }
    return board.includes('') ? null : 'draw';
  };

  const handleHome = () => navigate("/home");

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = playerTurn;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (result === 'X') setScores(prev => ({ ...prev, X: prev.X + 1 }));
      else if (result === 'O') setScores(prev => ({ ...prev, O: prev.O + 1 }));
      else setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }

    setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
  };

  const handleRestart = () => {
    setBoard(emptyBoard);
    setPlayerTurn('X');
    setWinner(null);
    setWinningLine([]);
  };

  const handleReset = () => {
    setBoard(emptyBoard);
    setPlayerTurn('X');
    setWinner(null);
    setWinningLine([]);
    setScores({ X: 0, O: 0, draws: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Player vs Player
            </h1>
            <Users className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
          </div>
          <p className="text-gray-300 text-sm md:text-base">Challenge your friend to a classic match</p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-4 border-2 transition-all duration-300 ${playerTurn === 'X' && !winner ? 'border-blue-500 ring-4 ring-blue-500/50 scale-105' : 'border-white/10'
            }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <X className="w-6 h-6 text-blue-400" strokeWidth={3} />
              <span className="text-white font-semibold">Player X</span>
            </div>
            <p className="text-3xl font-bold text-center text-blue-400">{scores.X}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-semibold">Draws</span>
            </div>
            <p className="text-3xl font-bold text-center text-yellow-400">{scores.draws}</p>
          </div>

          <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-4 border-2 transition-all duration-300 ${playerTurn === 'O' && !winner ? 'border-pink-500 ring-4 ring-pink-500/50 scale-105' : 'border-white/10'
            }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Circle className="w-6 h-6 text-pink-400" strokeWidth={3} />
              <span className="text-white font-semibold">Player O</span>
            </div>
            <p className="text-3xl font-bold text-center text-pink-400">{scores.O}</p>
          </div>
        </div>

        {!winner && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
              <span className="text-gray-300">Current Turn:</span>
              {playerTurn === 'X' ? (
                <>
                  <X className="w-6 h-6 text-blue-400 animate-pulse" strokeWidth={3} />
                  <span className="font-bold text-blue-400">Player X</span>
                </>
              ) : (
                <>
                  <Circle className="w-6 h-6 text-pink-400 animate-pulse" strokeWidth={3} />
                  <span className="font-bold text-pink-400">Player O</span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 mb-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-md aspect-square">
              {board.map((val, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  disabled={val !== '' || winner}
                  className={`relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl transition-all duration-200 shadow-lg border border-white/5 group disabled:cursor-not-allowed ${!val && !winner ? 'hover:scale-105 hover:from-slate-700 hover:to-slate-600 hover:shadow-xl' : ''
                    } ${winningLine.includes(i) ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 ring-4 ring-green-500/50' : ''
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-200" />

                  <div className="relative flex items-center justify-center h-full">
                    {val === 'X' && (
                      <X className="w-12 h-12 md:w-16 md:h-16 text-blue-400 animate-in zoom-in duration-200" strokeWidth={3} />
                    )}
                    {val === 'O' && (
                      <Circle className="w-12 h-12 md:w-16 md:h-16 text-pink-400 animate-in zoom-in duration-200" strokeWidth={3} />
                    )}
                  </div>

                  {winningLine.includes(i) && (
                    <Sparkles className="absolute top-2 right-2 w-5 h-5 text-yellow-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {winner && (
          <div className="mb-6 animate-in fade-in zoom-in duration-300">
            <div className={`text-center p-6 rounded-2xl border-2 backdrop-blur-sm ${winner === 'X' ? 'bg-blue-500/20 border-blue-500/50' :
              winner === 'O' ? 'bg-pink-500/20 border-pink-500/50' :
                'bg-yellow-500/20 border-yellow-500/50'
              }`}>
              <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400 animate-bounce" />
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                {winner === 'draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
              </p>
              <p className="text-gray-300">
                {winner === 'draw' ? "What a close match!" : "Congratulations! 🎉"}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            onClick={handleRestart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            New Round
          </button>
          <button
            onClick={handleHome}
            className="flex-1 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 border border-white/10 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerVsPlayer;