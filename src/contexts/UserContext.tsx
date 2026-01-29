import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface UserProfile {
  name: string;
  avatar: string;
}

interface UserContextProps {
  user: UserProfile | null;
  favorites: string[];
  updateProfile: (name: string, avatar: string) => void;
  toggleFavorite: (videoId: string) => void;
  isFavorite: (videoId: string) => boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('dana_user');
    const savedFavorites = localStorage.getItem('dana_favorites');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const updateProfile = (name: string, avatar: string) => {
    const newUser = { name, avatar };
    setUser(newUser);
    localStorage.setItem('dana_user', JSON.stringify(newUser));
  };

  const toggleFavorite = (videoId: string) => {
    let newFavorites;
    if (favorites.includes(videoId)) {
      newFavorites = favorites.filter(id => id !== videoId);
    } else {
      newFavorites = [...favorites, videoId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('dana_favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (videoId: string) => favorites.includes(videoId);

  return (
    <UserContext.Provider value={{ user, favorites, updateProfile, toggleFavorite, isFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};