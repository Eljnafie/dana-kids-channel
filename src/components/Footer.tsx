import React from 'react';
import { Youtube, Instagram, Facebook, Mail, Lock } from 'lucide-react';
import { CHANNEL_URL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dana-green pt-12 pb-6 border-t-8 border-dana-yellow">
      <div className="container mx-auto px-4 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-start">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading text-3xl mb-4 drop-shadow-md">{t('footer_brand')}</h3>
            <p className="font-soft text-lg opacity-90 mb-4 max-w-xs">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="bg-white text-red-600 p-2 rounded-full hover:scale-110 transition-transform shadow-md">
                <Youtube size={24} />
              </a>
              <a href="#" className="bg-white text-pink-500 p-2 rounded-full hover:scale-110 transition-transform shadow-md">
                <Instagram size={24} />
              </a>
              <a href="#" className="bg-white text-blue-600 p-2 rounded-full hover:scale-110 transition-transform shadow-md">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-xl mb-4 text-dana-yellow">{t('footer_explore')}</h4>
            <ul className="space-y-2 font-bold font-body">
              <li><Link to="/videos" className="hover:text-dana-yellow transition-colors">{t('footer_links_videos')}</Link></li>
              <li><Link to="/activities" className="hover:text-dana-yellow transition-colors">{t('footer_links_activities')}</Link></li>
              <li><Link to="/quizzes" className="hover:text-dana-yellow transition-colors">{t('footer_links_quizzes')}</Link></li>
              <li><Link to="/shop" className="hover:text-dana-yellow transition-colors">{t('footer_links_shop')}</Link></li>
              <li><Link to="/parents" className="hover:text-dana-yellow transition-colors">{t('footer_links_parents')}</Link></li>
            </ul>
          </div>

          {/* Contact/Safety */}
          <div className="flex flex-col items-center md:items-start">
             <h4 className="font-heading text-xl mb-4 text-dana-yellow">{t('footer_contact')}</h4>
             <p className="font-soft mb-4">{t('footer_questions')}</p>
             <a href="mailto:hello@danaforchildren.com" className="flex items-center gap-2 bg-dana-purple px-6 py-2 rounded-full font-bold shadow-md hover:bg-purple-600 transition-colors">
               <Mail size={18} /> {t('footer_email_btn')}
             </a>
          </div>
        </div>

        <div className="border-t border-white/30 pt-6 text-center font-soft text-sm flex flex-col items-center gap-2">
          <p>© {new Date().getFullYear()} {t('footer_brand')}. {t('footer_rights')}</p>
          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-xs mt-2">
            <Link to="/privacy" className="hover:text-white underline">{t('nav_privacy')}</Link>
            <Link to="/terms" className="hover:text-white underline">{t('nav_terms')}</Link>
            <Link to="/cookies" className="hover:text-white underline">{t('nav_cookies')}</Link>
          </div>
          <p className="opacity-75 mt-2">{t('footer_safety')}</p>
          <Link to="/admin" className="text-white/20 hover:text-white transition-colors flex items-center gap-1 text-xs mt-2">
            <Lock size={12} /> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;