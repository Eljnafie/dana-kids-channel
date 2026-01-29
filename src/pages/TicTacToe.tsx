import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { RefreshCw, X, Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TicTacToe: React.FC = () => {
  const { t, dir } = useLanguage();
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const checkWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const w = checkWinner(newBoard);
    if (w) {
      setWinner(w);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8 relative">
           <Link to="/games" className="absolute top-0 ltr:left-0 rtl:right-0 text-gray-500 hover:text-dana-blue flex items-center gap-1">
                <ArrowIcon size={20} />
            </Link>
          <h1 className="font-heading text-4xl text-dana-green mb-2">{t('ttt_title')}</h1>
          <p className="font-soft text-gray-600">{t('ttt_subtitle')}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
           {/* Status */}
           <div className="mb-8 text-2xl font-bold font-heading text-gray-700">
             {winner ? (
               <span className={winner === 'Draw' ? 'text-gray-500' : 'text-dana-coral'}>
                 {winner === 'Draw' ? t('ttt_draw') : `${t('ttt_winner')} ${winner}`}
               </span>
             ) : (
                <span>{t('ttt_turn')}: <span className="text-dana-blue">{isXNext ? 'X' : 'O'}</span></span>
             )}
           </div>

           {/* Grid */}
           <div className="grid grid-cols-3 gap-4 mb-8">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClick(idx)}
                  className="aspect-square bg-green-100 rounded-xl flex items-center justify-center text-4xl hover:bg-green-200 transition-colors"
                  disabled={!!cell || !!winner}
                >
                  {cell === 'X' && <X size={48} className="text-dana-blue" />}
                  {cell === 'O' && <Circle size={40} className="text-dana-coral" />}
                </button>
              ))}
           </div>

           <button 
             onClick={resetGame}
             className="bg-dana-yellow text-dana-purple font-bold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors flex items-center gap-2 mx-auto"
           >
             <RefreshCw size={20} /> {t('game_reset')}
           </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;