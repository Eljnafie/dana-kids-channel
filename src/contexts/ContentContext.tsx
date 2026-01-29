import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { DATA } from '../constants';
import type { AppContent, Video } from '../types';

interface ContentContextProps {
  content: AppContent;
  updateContent: (newContent: AppContent) => void;
  resetContent: () => void;
  // Helpers for specific updates (optional, but good for cleanliness)
  addVideo: (lang: 'en' | 'ar', video: Video) => void;
  deleteVideo: (lang: 'en' | 'ar', id: string) => void;
}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(DATA);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('dana_content');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  const updateContent = (newContent: AppContent) => {
    setContent(newContent);
    localStorage.setItem('dana_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(DATA);
    localStorage.removeItem('dana_content');
  };

  const addVideo = (lang: 'en' | 'ar', video: Video) => {
    const newContent = { ...content };
    newContent[lang].videos = [video, ...newContent[lang].videos];
    updateContent(newContent);
  };

  const deleteVideo = (lang: 'en' | 'ar', id: string) => {
    const newContent = { ...content };
    newContent[lang].videos = newContent[lang].videos.filter(v => v.id !== id);
    updateContent(newContent);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, addVideo, deleteVideo }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};