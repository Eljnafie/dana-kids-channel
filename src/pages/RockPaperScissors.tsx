import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RockPaperScissors: React.FC = () => {
  const { t, dir } = useLanguage();
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [compChoice, setCompChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const choices = [
      { id: 'rock', emoji: '🪨' },
      { id: 'paper', emoji: '📄' },
      { id: 'scissors', emoji: '✂️' }
  ];

  const play = (choiceId: string) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)].id;
    setUserChoice(choiceId);
    setCompChoice(randomChoice);

    if (choiceId === randomChoice) {
        setResult('draw');
    } else if (
        (choiceId === 'rock' && randomChoice === 'scissors') ||
        (choiceId === 'paper' && randomChoice === 'rock') ||
        (choiceId === 'scissors' && randomChoice === 'paper')
    ) {
        setResult('win');
    } else {
        setResult('lose');
    }
  };

  const reset = () => {
      setUserChoice(null);
      setCompChoice(null);
      setResult(null);
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 relative">
           <Link to="/games" className="absolute top-0 ltr:left-0 rtl:right-0 text-gray-500 hover:text-dana-blue flex items-center gap-1">
                <ArrowIcon size={20} />
            </Link>
          <h1 className="font-heading text-4xl text-dana-coral mb-2">{t('rps_title')}</h1>
          <p className="font-soft text-gray-600">{t('rps_subtitle')}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
            
            {!userChoice ? (
                <div className="flex justify-center gap-4 md:gap-8 my-12">
                    {choices.map(c => (
                        <button 
                            key={c.id} 
                            onClick={() => play(c.id)}
                            className="w-24 h-24 md:w-32 md:h-32 bg-pink-100 rounded-full text-5xl md:text-6xl flex items-center justify-center hover:scale-110 hover:bg-pink-200 transition-all shadow-md"
                        >
                            {c.emoji}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="my-8">
                    <div className="flex justify-center items-center gap-8 md:gap-16 mb-8">
                        <div>
                            <p className="font-bold text-gray-500 mb-2">{t('rps_you')}</p>
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-dana-blue/20 rounded-full text-5xl flex items-center justify-center animate-pop">
                                {choices.find(c => c.id === userChoice)?.emoji}
                            </div>
                        </div>
                        <div className="font-heading text-2xl text-gray-400">VS</div>
                        <div>
                            <p className="font-bold text-gray-500 mb-2">{t('rps_comp')}</p>
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-red-100 rounded-full text-5xl flex items-center justify-center animate-pop">
                                {choices.find(c => c.id === compChoice)?.emoji}
                            </div>
                        </div>
                    </div>

                    <h2 className="font-heading text-4xl mb-8">
                        {result === 'win' && <span className="text-green-500">{t('rps_result_win')}</span>}
                        {result === 'lose' && <span className="text-red-500">{t('rps_result_lose')}</span>}
                        {result === 'draw' && <span className="text-gray-500">{t('rps_result_draw')}</span>}
                    </h2>

                    <button 
                        onClick={reset}
                        className="bg-dana-purple text-white font-bold px-8 py-3 rounded-full hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw size={20} /> {t('game_play_again')}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;