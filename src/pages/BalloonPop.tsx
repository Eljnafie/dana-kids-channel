import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Play, RotateCcw, ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
}

const BalloonPop: React.FC = () => {
  const { t, dir } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [gameOver, setGameOver] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);

  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const COLORS = [
    'bg-red-400', 'bg-blue-400', 'bg-green-400', 
    'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400'
  ];

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setBalloons([]);
    setGameOver(false);
    lastSpawnTime.current = Date.now();
  };

  const spawnBalloon = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const newBalloon: Balloon = {
      id: Date.now(),
      x: Math.random() * (width - 60), // Keep within bounds
      y: containerRef.current.offsetHeight + 50,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 1 + Math.random() * 2 // Speed between 1 and 3
    };
    setBalloons(prev => [...prev, newBalloon]);
  };

  const popBalloon = (id: number) => {
    // Play pop sound effect if we had one
    setScore(prev => prev + 10);
    setBalloons(prev => prev.filter(b => b.id !== id));
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = () => {
      const now = Date.now();
      
      // Spawn logic
      if (now - lastSpawnTime.current > 800) { // Spawn every 800ms
        spawnBalloon();
        lastSpawnTime.current = now;
      }

      // Move balloons
      setBalloons(prev => {
         const nextBalloons = prev
            .map(b => ({ ...b, y: b.y - b.speed }))
            .filter(b => b.y > -100); // Remove if off top screen
         return nextBalloons;
      });

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  // Timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-sky-100 overflow-hidden relative font-heading">
      
      {/* HUD */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
         <Link to="/games" className="bg-white/50 backdrop-blur p-2 rounded-full hover:bg-white text-gray-700">
             <ArrowIcon size={24} />
         </Link>
         <div className="flex gap-4">
            <div className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-dana-yellow">
                <span className="text-gray-500 text-sm uppercase font-bold mr-2">{t('balloon_score')}</span>
                <span className="text-2xl text-dana-purple">{score}</span>
            </div>
            <div className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-dana-coral w-32 text-center">
                 <span className="text-gray-500 text-sm uppercase font-bold mr-2">{t('balloon_time')}</span>
                 <span className={`text-2xl ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-dana-blue'}`}>
                     {timeLeft}s
                 </span>
            </div>
         </div>
      </div>

      {/* Game Area */}
      <div ref={containerRef} className="w-full h-screen relative z-10">
          {balloons.map(balloon => (
              <div
                  key={balloon.id}
                  onClick={() => popBalloon(balloon.id)}
                  className={`absolute w-16 h-20 rounded-[50%] ${balloon.color} cursor-pointer shadow-inner active:scale-150 active:opacity-0 transition-transform duration-100 flex items-center justify-center`}
                  style={{ 
                      left: balloon.x, 
                      top: balloon.y,
                      // Little string
                      boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.1)'
                   }}
              >
                  <div className="absolute -bottom-4 left-1/2 w-0.5 h-8 bg-gray-400/50 transform -translate-x-1/2"></div>
                  <div className="w-4 h-8 bg-white/20 rounded-full transform -rotate-45 -translate-y-2 -translate-x-2"></div>
              </div>
          ))}
      </div>

      {/* Clouds Decoration */}
      <div className="absolute top-20 left-10 text-white/40"><div className="w-32 h-12 bg-current rounded-full blur-xl"></div></div>
      <div className="absolute top-40 right-20 text-white/30"><div className="w-48 h-16 bg-current rounded-full blur-xl"></div></div>

      {/* Overlay Screens */}
      {(!isPlaying && !gameOver) && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 flex items-center justify-center">
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md animate-pop">
                  <h1 className="text-5xl text-dana-blue mb-4">{t('balloon_title')}</h1>
                  <p className="text-xl text-gray-500 mb-8 font-soft">{t('balloon_subtitle')}</p>
                  <button onClick={startGame} className="bg-dana-green text-white text-2xl px-12 py-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
                      <Play fill="currentColor" /> {t('balloon_start')}
                  </button>
              </div>
          </div>
      )}

      {gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-30 flex items-center justify-center">
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md animate-pop border-8 border-dana-yellow">
                  <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
                  <h1 className="text-5xl text-dana-purple mb-2">{t('balloon_game_over')}</h1>
                  <div className="text-4xl font-bold text-gray-800 mb-8">{t('balloon_score')}: {score}</div>
                  
                  <div className="flex justify-center gap-4">
                     <button onClick={startGame} className="bg-dana-coral text-white text-xl px-8 py-3 rounded-xl shadow-lg hover:bg-red-400 transition-colors flex items-center gap-2">
                        <RotateCcw /> {t('game_play_again')}
                     </button>
                     <Link to="/games" className="bg-gray-200 text-gray-600 text-xl px-8 py-3 rounded-xl hover:bg-gray-300 transition-colors">
                        {t('quiz_exit')}
                     </Link>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default BalloonPop;