import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { TRANSLATIONS } from '../constants';
import { useContent } from './ContentContext';
import type { ContentData } from '../types';

type Language = 'en' | 'ar';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  data: ContentData;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const { content } = useContent(); // Consume the dynamic content

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    // Try to get dynamic translation first, fallback to static constant, then key name
    // @ts-ignore
    return content[language].translations[key] || TRANSLATIONS[language][key as keyof typeof TRANSLATIONS.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, data: content[language], dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};