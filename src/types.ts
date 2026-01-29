export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  description: string;
  youtubeId: string; // Used for embedding
}

export interface Activity {
  id: string;
  title: string;
  type: string;
  isPremium: boolean;
  image: string;
  ageGroup: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  externalUrl: string; // Link to buy on other platform
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  questions: Question[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  image: string;
  date: string;
  author: string;
}

export interface Song {
  id: string;
  title: string;
  url: string;
  duration: string;
}

export interface GameItem {
  id: string;
  title: string;
  description: string;
  path: string;
  color: string;
}

export interface ContentData {
  videos: Video[];
  activities: Activity[];
  products: Product[];
  team: TeamMember[];
  quizzes: Quiz[];
  blog: BlogPost[];
  songs: Song[];
  games: GameItem[];
  categories: string[];
  translations: Record<string, string>;
}

export interface AppContent {
  en: ContentData;
  ar: ContentData;
}