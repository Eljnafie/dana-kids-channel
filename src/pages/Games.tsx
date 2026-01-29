import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Brain, Grid3X3, Scissors, Play, Palette, Gamepad, Disc, Puzzle } from 'lucide-react';

const Games: React.FC = () => {
  const { t, data } = useLanguage();

  // Map string IDs to Icons
  const ICONS: Record<string, any> = {
      balloon: Disc,
      puzzle: Puzzle,
      memory: Brain,
      drawing: Palette,
      tictactoe: Grid3X3,
      rps: Scissors,
      default: Gamepad
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl text-dana-blue mb-4">{t('games_title')}</h1>
          <p className="font-soft text-xl text-gray-600">{t('games_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {data.games.map((game) => {
            const Icon = ICONS[game.id] || ICONS.default;
            return (
            <div key={game.id} className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${game.color}`}>
                <Icon size={48} />
              </div>
              <h3 className="font-heading text-2xl text-gray-800 mb-2">{game.title}</h3>
              <p className="font-soft text-gray-500 mb-8">{game.description}</p>
              <Link 
                to={game.path} 
                className="inline-flex items-center gap-2 bg-dana-yellow text-dana-purple font-heading text-lg px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors"
              >
                <Play size={20} /> {t('game_play_btn')}
              </Link>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Games;