import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, RefreshCw, Trophy, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const SlidePuzzle: React.FC = () => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const [tiles, setTiles] = useState<(number | null)[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize solved state: [0, 1, 2, 3, 4, 5, 6, 7, null]
  // We use 0-7 for image parts, null for empty space
  const SOLVED_STATE = [0, 1, 2, 3, 4, 5, 6, 7, null];

  // Image to slice
  const IMAGE_URL = 'https://picsum.photos/seed/puzzle_fun/600/600'; 

  const shuffle = () => {
    // To ensure solvability, we start solved and make random valid moves
    let currentTiles = [...SOLVED_STATE];
    let emptyIdx = 8;
    let previousIdx = -1;

    for (let i = 0; i < 100; i++) {
      const neighbors = getNeighbors(emptyIdx);
      // Don't undo the immediate last move to ensure mixing
      const validNeighbors = neighbors.filter(n => n !== previousIdx);
      const randomNeighbor = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
      
      // Swap
      currentTiles[emptyIdx] = currentTiles[randomNeighbor];
      currentTiles[randomNeighbor] = null;
      
      previousIdx = emptyIdx;
      emptyIdx = randomNeighbor;
    }

    setTiles(currentTiles);
    setIsSolved(false);
    setMoves(0);
  };

  const getNeighbors = (index: number) => {
    const neighbors = [];
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (row > 0) neighbors.push(index - 3); // Up
    if (row < 2) neighbors.push(index + 3); // Down
    if (col > 0) neighbors.push(index - 1); // Left
    if (col < 2) neighbors.push(index + 1); // Right

    return neighbors;
  };

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    const emptyIndex = tiles.indexOf(null);
    const neighbors = getNeighbors(emptyIndex);

    if (neighbors.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
      setMoves(prev => prev + 1);
      checkWin(newTiles);
    }
  };

  const checkWin = (currentTiles: (number | null)[]) => {
    const isWin = currentTiles.every((tile, index) => {
        if (index === 8) return tile === null;
        return tile === index;
    });

    if (isWin) {
      setIsSolved(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4">
       <div className="max-w-2xl mx-auto">
         
         {/* Header */}
         <div className="text-center mb-8 relative">
            <Link to="/games" className="absolute top-0 ltr:left-0 rtl:right-0 text-gray-500 hover:text-dana-blue flex items-center gap-1">
                <ArrowIcon size={20} /> <span className="hidden sm:inline">{t('games_title')}</span>
            </Link>
            <h1 className="font-heading text-4xl text-dana-coral mb-2">{t('puzzle_title')}</h1>
            <p className="font-soft text-gray-600 mb-4">{t('puzzle_subtitle')}</p>
            
            <div className="inline-flex items-center gap-4 bg-white px-6 py-2 rounded-full shadow-sm">
                <span className="font-bold text-gray-500 uppercase text-xs tracking-wider">{t('puzzle_moves')}</span>
                <span className="font-heading text-xl text-dana-blue">{moves}</span>
            </div>
         </div>

         <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
             
             {/* The Puzzle Board */}
             <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-dana-yellow">
                 <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] grid grid-cols-3 gap-1 bg-gray-200 rounded-lg overflow-hidden relative">
                    
                    {isSolved && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-pop">
                            <div className="text-center text-white">
                                <Trophy size={64} className="mx-auto text-yellow-400 mb-2 drop-shadow-md" />
                                <h2 className="font-heading text-4xl">{t('game_won_title')}</h2>
                            </div>
                        </div>
                    )}

                    {tiles.map((tile, index) => {
                        if (tile === null) return <div key={`empty-${index}`} className="bg-gray-100/50 rounded-sm"></div>;

                        // Calculate background position
                        // Tile 0: 0% 0%, Tile 1: 50% 0%, Tile 2: 100% 0%
                        // Tile 3: 0% 50% ...
                        const x = (tile % 3) * 50; 
                        const y = Math.floor(tile / 3) * 50;

                        return (
                            <div
                                key={tile}
                                onClick={() => handleTileClick(index)}
                                className={`
                                    cursor-pointer rounded-sm shadow-sm hover:opacity-90 transition-all duration-200
                                    ${isSolved ? '' : 'hover:scale-[0.98]'}
                                `}
                                style={{
                                    backgroundImage: `url(${IMAGE_URL})`,
                                    backgroundSize: '300%',
                                    backgroundPosition: `${x}% ${y}%`
                                }}
                            >
                                {!isSolved && (
                                   <div className="w-full h-full bg-black/0 hover:bg-white/10 transition-colors flex items-start justify-start p-1">
                                      <span className="text-white/50 text-xs font-bold drop-shadow-md">{tile + 1}</span>
                                   </div>
                                )}
                            </div>
                        );
                    })}
                 </div>
             </div>

             {/* Controls / Preview */}
             <div className="flex flex-col items-center gap-6">
                 <div className="bg-white p-2 rounded-xl shadow-md rotate-3 hover:rotate-0 transition-transform duration-300">
                     <p className="text-center text-xs font-bold text-gray-400 mb-1 flex items-center justify-center gap-1">
                        <ImageIcon size={12} /> Target
                     </p>
                     <img src={IMAGE_URL} alt="Target" className="w-32 h-32 rounded-lg object-cover" />
                 </div>

                 <button 
                    onClick={shuffle}
                    className="bg-dana-purple text-white font-heading px-8 py-3 rounded-xl shadow-lg hover:bg-purple-600 transition-colors flex items-center gap-2 active:scale-95"
                 >
                    <RefreshCw size={20} /> {isSolved ? t('game_play_again') : t('game_reset')}
                 </button>
             </div>
         </div>

       </div>
    </div>
  );
};

export default SlidePuzzle;