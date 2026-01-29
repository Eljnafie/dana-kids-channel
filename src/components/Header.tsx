import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Globe, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
          setIsOpen(false);
          setSearchQuery('');
      }
  };

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_videos'), path: '/videos' },
    { name: t('nav_activities'), path: '/activities' },
    { name: t('nav_game'), path: '/games' },
    { name: t('nav_blog'), path: '/blog' },
    { name: t('nav_shop'), path: '/shop' },
    { name: t('nav_parents'), path: '/parents' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-dana-blue shadow-lg border-b-4 border-dana-yellow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="bg-white p-2 rounded-full border-2 border-dana-purple shadow-md group-hover:rotate-12 transition-transform">
             <Heart className="text-dana-coral w-6 h-6 fill-current" />
          </div>
          <span className="font-heading text-xl md:text-3xl text-white drop-shadow-md tracking-wide hidden sm:inline-block">
             {language === 'ar' ? 'دنا' : 'Dana'} <span className="text-dana-yellow">{language === 'ar' ? 'للأطفال' : 'for Children'}</span>
          </span>
        </Link>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xs relative mx-4">
            <input 
                type="text" 
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full border-2 border-transparent focus:border-dana-yellow outline-none bg-white/20 text-white placeholder-white/70 shadow-inner"
            />
            <button type="submit" className="absolute ltr:right-3 rtl:left-3 top-2.5 text-white/70 hover:text-white">
                <Search size={18} />
            </button>
        </form>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                isActive(link.path)
                  ? 'bg-dana-yellow text-dana-purple shadow-md transform scale-105'
                  : 'text-white hover:bg-white/30'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-white/30 mx-2"></div>

          <button 
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-full font-bold text-sm bg-dana-purple text-white hover:bg-purple-600 transition-colors flex items-center gap-2 shadow-md ml-2 whitespace-nowrap"
          >
            <Globe size={16} /> {language === 'ar' ? 'EN' : 'ع'}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
           <button 
              onClick={toggleLanguage}
              className="bg-white/20 text-white p-2 rounded-xl h-10 w-10 flex items-center justify-center"
            >
             <span className="font-bold text-sm">{language === 'ar' ? 'EN' : 'ع'}</span>
           </button>
           <button
             onClick={toggleMenu}
             className="bg-dana-yellow text-dana-purple p-2 rounded-xl shadow-md active:scale-95 transition-transform"
           >
             {isOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-dana-purple text-white p-4 absolute w-full shadow-xl animate-fade-in-down border-t-4 border-dashed border-white z-50">
          <div className="flex flex-col gap-3">
             {/* Mobile Search */}
             <form onSubmit={handleSearch} className="relative mb-2">
                <input 
                    type="text" 
                    placeholder={t('search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white/20 text-white placeholder-white/70"
                />
                <button type="submit" className="absolute ltr:right-3 rtl:left-3 top-3.5 text-white/70">
                    <Search size={20} />
                </button>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl font-bold text-center ${
                    isActive(link.path) 
                    ? 'bg-dana-yellow text-dana-purple' 
                    : 'hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;