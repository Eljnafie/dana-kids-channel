import React, { useState, useEffect } from 'react';
import { Lock, X, Check, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ParentalGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ParentalGate: React.FC<ParentalGateProps> = ({ isOpen, onClose, onSuccess }) => {
  const { dir } = useLanguage();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<number>(0);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);

  // Generate a math challenge
  const generateChallenge = () => {
    const operations = ['+', 'x'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;

    setQuestion(`${a} ${op} ${b} = ?`);
    setAnswer(op === '+' ? a + b : a * b);
    setUserInput('');
    setError(false);
  };

  useEffect(() => {
    if (isOpen) generateChallenge();
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userInput) === answer) {
      onSuccess();
      onClose();
    } else {
      setError(true);
      setUserInput('');
      // Shake effect or visual feedback could be added here
      setTimeout(() => setError(false), 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100 animate-pop border-4 border-dana-purple">
        
        {/* Header */}
        <div className="bg-dana-purple p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 ltr:right-4 rtl:left-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-white">
            <Lock size={32} />
          </div>
          <h2 className="text-white font-heading text-2xl">
            {dir === 'rtl' ? 'للأهل فقط' : 'For Parents Only'}
          </h2>
          <p className="text-white/80 text-sm font-soft">
            {dir === 'rtl' ? 'يرجى حل المسألة للمتابعة' : 'Please solve to continue'}
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="bg-gray-100 rounded-xl p-4 text-center mb-6 border-2 border-dashed border-gray-300">
             <span className="font-heading text-4xl text-gray-700 tracking-wider">{question}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={dir === 'rtl' ? 'أدخل الإجابة' : 'Enter answer'}
                className={`w-full px-4 py-3 rounded-xl border-2 text-center text-xl font-bold outline-none transition-colors ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-dana-purple'}`}
                autoFocus
              />
              {error && (
                <div className="absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none text-red-500 font-bold text-xs">
                  {dir === 'rtl' ? 'خطأ' : 'Try Again'}
                </div>
              )}
            </div>

            <div className="flex gap-3">
               <button
                type="button"
                onClick={generateChallenge}
                className="px-4 py-3 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200"
                title="New Question"
               >
                 <RefreshCw size={20} />
               </button>
               <button
                type="submit"
                className="flex-1 bg-dana-yellow text-dana-purple font-heading text-lg py-3 rounded-xl shadow-md hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
               >
                 {dir === 'rtl' ? 'متابعة' : 'Continue'} <Check size={20} />
               </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ParentalGate;