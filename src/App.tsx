import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Activities from './pages/Activities';
import Quizzes from './pages/Quizzes';
import Games from './pages/Games';
import MemoryGame from './pages/MemoryGame';
import TicTacToe from './pages/TicTacToe';
import RockPaperScissors from './pages/RockPaperScissors';
import DrawingPad from './pages/DrawingPad';
import BalloonPop from './pages/BalloonPop';
import SlidePuzzle from './pages/SlidePuzzle';
import Shop from './pages/Shop';
import ParentsCorner from './pages/ParentsCorner';
import About from './pages/About';
import Contact from './pages/Contact';
import Watch from './pages/Watch';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SearchResults from './pages/SearchResults';
import AdminPanel from './pages/AdminPanel';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import { ContentProvider } from './contexts/ContentContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';
import MusicPlayer from './components/MusicPlayer';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <LanguageProvider>
        <UserProvider>
          <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen relative">
              
              {/* Conditionally render Header/Footer based on route could be nice, but CSS hiding in Admin is easier if needed. 
                  For now, we keep header on admin for navigation back to home easily. */}
              
              <Routes>
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="*" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                            <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/videos" element={<Videos />} />
                            <Route path="/watch/:id" element={<Watch />} />
                            <Route path="/activities" element={<Activities />} />
                            <Route path="/quizzes" element={<Quizzes />} />
                            
                            {/* Games Routes */}
                            <Route path="/games" element={<Games />} />
                            <Route path="/game/memory" element={<MemoryGame />} />
                            <Route path="/game/tictactoe" element={<TicTacToe />} />
                            <Route path="/game/rps" element={<RockPaperScissors />} />
                            <Route path="/game/drawing" element={<DrawingPad />} />
                            <Route path="/game/balloon" element={<BalloonPop />} />
                            <Route path="/game/puzzle" element={<SlidePuzzle />} />
                            
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<BlogPost />} />
                            <Route path="/search" element={<SearchResults />} />
                            
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/parents" element={<ParentsCorner />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            
                            {/* Legal Pages */}
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="/cookies" element={<CookiePolicy />} />
                            </Routes>
                        </main>
                        <Footer />
                        <MusicPlayer />
                      </>
                  } />
              </Routes>
              </div>
          </Router>
        </UserProvider>
      </LanguageProvider>
    </ContentProvider>
  );
};

export default App;