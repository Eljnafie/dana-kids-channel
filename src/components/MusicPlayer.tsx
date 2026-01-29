import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Music, Play, Pause, SkipForward, Minus } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const { data, t, dir } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = data.songs;
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    // Re-load audio source when language changes to ensure correct song list if needed,
    // though usually songs are language agnostic or we map them.
    // For now we keep the index, just update reference if data changed.
  }, [data.songs]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => {
          console.log("Autoplay blocked, user interaction needed", e);
          setIsPlaying(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    nextSong();
  };

  if (!currentSong) return null;

  return (
    <div className={`fixed bottom-4 z-50 transition-all duration-300 ${dir === 'rtl' ? 'left-4' : 'right-4'}`}>
      <audio 
        ref={audioRef} 
        src={currentSong.url} 
        onEnded={handleEnded}
      />

      {/* Expanded Player */}
      {isExpanded ? (
        <div className="bg-white rounded-3xl shadow-2xl p-4 w-64 border-4 border-dana-purple animate-pop">
           <div className="flex justify-between items-center mb-3">
               <div className="flex items-center gap-2 text-dana-purple font-heading">
                   <Music size={20} className="animate-bounce" />
                   <span>{t('radio_title')}</span>
               </div>
               <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600">
                   <Minus size={20} />
               </button>
           </div>
           
           <div className="bg-purple-50 rounded-xl p-3 mb-4 text-center">
               <p className="font-bold text-gray-800 text-sm truncate">{currentSong.title}</p>
               <div className="flex justify-center gap-1 mt-1">
                   <span className="w-1 h-3 bg-dana-purple/50 rounded-full animate-pulse"></span>
                   <span className="w-1 h-5 bg-dana-purple/50 rounded-full animate-pulse delay-75"></span>
                   <span className="w-1 h-4 bg-dana-purple/50 rounded-full animate-pulse delay-150"></span>
                   <span className="w-1 h-3 bg-dana-purple/50 rounded-full animate-pulse delay-100"></span>
               </div>
           </div>

           <div className="flex justify-center items-center gap-4">
               <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-dana-yellow text-dana-purple flex items-center justify-center shadow-md hover:scale-105 transition-transform"
               >
                   {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
               </button>
               <button 
                onClick={nextSong}
                className="text-gray-400 hover:text-dana-blue transition-colors"
               >
                   <SkipForward size={24} fill="currentColor" />
               </button>
           </div>
        </div>
      ) : (
        /* Minimized FAB */
        <button 
            onClick={() => setIsExpanded(true)}
            className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 ${isPlaying ? 'bg-dana-purple text-white animate-spin-slow' : 'bg-white text-dana-purple border-2 border-dana-purple'}`}
        >
            <Music size={24} />
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;