import React, { useState } from 'react';
import type { Quiz } from '../types';
import { Play, CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw, Brain } from 'lucide-react';
import Mascot from '../components/Mascot';
import { useLanguage } from '../contexts/LanguageContext';

const Quizzes: React.FC = () => {
  const { data, t, dir } = useLanguage();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
    window.scrollTo(0, 0);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (activeQuiz && index === activeQuiz.questions[currentQuestionIndex].correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const getEncouragingMessage = () => {
    if (!activeQuiz) return '';
    const percentage = (score / activeQuiz.questions.length) * 100;
    // Simple localization for messages
    if (dir === 'rtl') {
        if (percentage === 100) return "أنت نجم خارق! 🌟";
        if (percentage >= 50) return "عمل رائع! 🎉";
        return "حاول مرة أخرى! أنت تستطيع! 🌱";
    }
    if (percentage === 100) return "You're a Superstar! 🌟";
    if (percentage >= 50) return "Great Job! 🎉";
    return "Nice Try! Keep Learning! 🌱";
  };

  // --- QUIZ LIST VIEW ---
  if (!activeQuiz) {
    return (
      <div className="min-h-screen bg-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h1 className="font-heading text-5xl text-dana-purple mb-4">{t('quiz_title')}</h1>
            <p className="font-soft text-xl text-gray-600">{t('quiz_subtitle')}</p>
            {/* Mascot Decoration */}
            <div className="absolute top-0 ltr:right-0 rtl:left-0 hidden lg:block transform ltr:translate-x-12 rtl:-translate-x-12 -translate-y-4">
                 <Mascot type="wiggle" size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.quizzes.map(quiz => (
              <div key={quiz.id} className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border-b-8 border-dana-yellow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={quiz.thumbnail} 
                    alt={quiz.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => startQuiz(quiz)}
                      className="bg-dana-coral text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform"
                    >
                      <Play fill="currentColor" size={32} />
                    </button>
                  </div>
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-dana-purple text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                    {quiz.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-gray-800 mb-2">{quiz.title}</h3>
                  <p className="font-soft text-gray-600 mb-6 line-clamp-2">{quiz.description}</p>
                  <button 
                    onClick={() => startQuiz(quiz)}
                    className="w-full bg-dana-blue text-white font-heading text-lg py-3 rounded-xl shadow hover:bg-sky-500 transition-colors"
                  >
                    {t('quiz_play_now')}
                  </button>
                </div>
              </div>
            ))}
          </div>

           {/* Empty State / CTA */}
           <div className="mt-16 bg-white rounded-3xl p-8 text-center shadow-lg border-2 border-dashed border-gray-200">
              <Brain size={48} className="mx-auto text-dana-green mb-4" />
              <h3 className="font-heading text-2xl text-gray-700">{t('quiz_more_coming')}</h3>
              <p className="font-soft text-gray-500">{t('quiz_check_back')}</p>
           </div>
        </div>
      </div>
    );
  }

  // --- QUIZ PLAYER VIEW ---
  const question = activeQuiz.questions[currentQuestionIndex];

  // --- RESULTS SCREEN ---
  if (showResult) {
    return (
      <div className="min-h-screen bg-dana-blue flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl animate-pop relative overflow-hidden">
           
           {/* Confetti Background Effect (simulated with dots) */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-4 h-4 bg-red-400 rounded-full animate-bounce"></div>
                <div className="absolute top-20 right-20 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 left-1/3 w-5 h-5 bg-green-400 rounded-full animate-ping"></div>
           </div>

           <div className="flex justify-center mb-6">
              <Mascot type="wiggle" size="md" />
           </div>

           <h2 className="font-heading text-4xl md:text-5xl text-dana-purple mb-4">
             {getEncouragingMessage()}
           </h2>
           
           <div className="text-6xl font-heading text-dana-yellow drop-shadow-md mb-2">
             {score} / {activeQuiz.questions.length}
           </div>
           <p className="font-soft text-gray-500 text-xl mb-8">{t('quiz_correct')}</p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => startQuiz(activeQuiz)}
                className="bg-dana-coral text-white font-heading text-xl px-8 py-4 rounded-xl shadow-lg hover:bg-red-400 transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <RotateCcw size={24} /> {t('quiz_play_again')}
              </button>
              <button 
                onClick={resetQuiz}
                className="bg-gray-100 text-gray-700 font-heading text-xl px-8 py-4 rounded-xl shadow-lg hover:bg-gray-200 transition-transform hover:scale-105"
              >
                {t('quiz_pick_another')}
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- ACTIVE QUESTION SCREEN ---
  return (
    <div className="min-h-screen bg-purple-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-8">
           <button onClick={resetQuiz} className="text-gray-500 font-bold hover:text-dana-coral flex items-center gap-1">
             <BackIcon size={16} /> {t('quiz_exit')}
           </button>
           <div className="bg-white px-4 py-2 rounded-full font-heading text-dana-purple shadow-sm">
             {t('quiz_question')} {currentQuestionIndex + 1} / {activeQuiz.questions.length}
           </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-t-8 border-dana-purple relative">
           {/* Mascot Peeking */}
           <div className="absolute -top-16 ltr:right-4 ltr:md:right-10 rtl:left-4 rtl:md:left-10 transform ltr:rotate-12 rtl:-rotate-12">
               <Mascot type="static" size="sm" />
           </div>

           <h2 className="font-heading text-2xl md:text-4xl text-gray-800 mb-8 leading-snug text-center">
             {question.text}
           </h2>

           <div className="grid gap-4">
             {question.options.map((option, index) => {
               let btnClass = "bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-dana-blue hover:bg-blue-50";
               
               if (isAnswered) {
                 if (index === question.correctIndex) {
                   btnClass = "bg-green-100 border-2 border-green-500 text-green-800";
                 } else if (index === selectedOption) {
                   btnClass = "bg-red-100 border-2 border-red-500 text-red-800";
                 } else {
                   btnClass = "bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-50";
                 }
               }

               return (
                 <button
                   key={index}
                   onClick={() => handleAnswer(index)}
                   disabled={isAnswered}
                   className={`w-full p-6 rounded-2xl ltr:text-left rtl:text-right font-bold text-xl transition-all duration-200 transform ${btnClass} ${!isAnswered && 'active:scale-98'}`}
                 >
                   <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {isAnswered && index === question.correctIndex && <CheckCircle className="text-green-600" size={28} />}
                      {isAnswered && index === selectedOption && index !== question.correctIndex && <XCircle className="text-red-600" size={28} />}
                   </div>
                 </button>
               );
             })}
           </div>

           {/* Next Button Area */}
           {isAnswered && (
             <div className="mt-8 flex justify-center animate-pop">
               <button 
                 onClick={nextQuestion}
                 className="bg-dana-yellow text-dana-purple font-heading text-2xl px-12 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition-transform hover:scale-105 flex items-center gap-2"
               >
                 {t('quiz_next')} <ArrowIcon size={28} />
               </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;