import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, Sun, Moon, Cloud, Heart, Music, Zap, Smile, RefreshCw, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import Mascot from '../components/Mascot';
import { Link } from 'react-router-dom';

interface Card {
  id: number;
  icon: React.ElementType;
  color: string;
  matched: boolean;
}

const ICONS = [
  { icon: Star, color: 'text-yellow-400' },
  { icon: Sun, color: 'text-orange-400' },
  { icon: Moon, color: 'text-indigo-400' },
  { icon: Cloud, color: 'text-blue-400' },
  { icon: Heart, color: 'text-red-400' },
  { icon: Music, color: 'text-purple-400' },
  { icon: Zap, color: 'text-yellow-500' },
  { icon: Smile, color: 'text-green-500' },
];

const MemoryGame: React.FC = () => {
  const { t, dir } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const shuffleCards = () => {
    const shuffledCards = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index, matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setWon(false);
  };

  const handleChoice = (card: Card) => {
    if(choiceOne && choiceOne.id === card.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.icon === choiceTwo.icon) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.icon === choiceOne.icon) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
        setTimeout(() => setWon(true), 500);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="mb-8 relative">
            <Link to="/games" className="absolute top-0 ltr:left-0 rtl:right-0 text-gray-500 hover:text-dana-blue flex items-center gap-1">
                <ArrowIcon size={20} /> <span className="hidden sm:inline">{t('games_title')}</span>
            </Link>
            <h1 className="font-heading text-5xl text-dana-purple mb-2">{t('game_title')}</h1>
            <p className="font-soft text-xl text-gray-600">{t('game_subtitle')}</p>
            <div className="flex justify-center items-center gap-4 mt-4">
                <div className="bg-white px-6 py-2 rounded-full shadow-sm font-bold text-gray-700">
                    {t('game_turns')}: {turns}
                </div>
                <button 
                    onClick={shuffleCards} 
                    className="bg-dana-yellow text-dana-purple px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2"
                >
                    <RefreshCw size={18} /> {t('game_reset')}
                </button>
            </div>
        </div>

        {won ? (
            <div className="bg-white rounded-3xl p-12 shadow-2xl animate-pop max-w-lg mx-auto">
                <Trophy size={64} className="mx-auto text-yellow-400 mb-6 animate-bounce" />
                <h2 className="font-heading text-4xl text-dana-blue mb-4">{t('game_won_title')}</h2>
                <p className="font-soft text-lg text-gray-600 mb-8">{t('game_won_desc')} {turns} {t('game_turns')}!</p>
                <button 
                    onClick={shuffleCards} 
                    className="bg-dana-coral text-white font-heading text-xl px-8 py-3 rounded-xl shadow-lg hover:bg-red-500 transition-colors"
                >
                    {t('game_play_again')}
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map(card => (
                <div 
                    key={card.id} 
                    className="relative aspect-square cursor-pointer group"
                    onClick={() => !disabled && !card.matched && handleChoice(card)}
                >
                    <div 
                        className={`w-full h-full rounded-xl transition-transform duration-500 transform shadow-lg preserve-3d ${
                            card === choiceOne || card === choiceTwo || card.matched ? 'rotate-y-180' : ''
                        }`} 
                    >
                        {/* Front of Card (Revealed) */}
                        <div 
                            className={`absolute inset-0 w-full h-full bg-white rounded-xl flex items-center justify-center backface-hidden border-4 border-dana-yellow rotate-y-180 ${card.matched ? 'border-green-400 bg-green-50' : ''}`}
                        >
                            <card.icon size={40} className={card.color} />
                        </div>

                        {/* Back of Card (Cover) */}
                        <div 
                            className="absolute inset-0 w-full h-full bg-dana-blue rounded-xl flex items-center justify-center backface-hidden border-4 border-white"
                        >
                            <span className="text-white font-heading text-3xl opacity-50">?</span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default MemoryGame;