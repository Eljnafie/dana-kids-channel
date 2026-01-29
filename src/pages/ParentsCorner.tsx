import React from 'react';
import { BookOpen, ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ParentsCorner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto mb-16 text-center">
           <h1 className="font-heading text-4xl md:text-5xl text-dana-green mb-6">{t('parents_title')}</h1>
           <p className="font-body text-lg text-gray-700 leading-relaxed">
             {t('parents_intro')}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-lg ltr:border-l-8 rtl:border-r-8 border-dana-blue">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-dana-blue">
                    <ShieldCheck size={28} />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-gray-800">{t('parents_safety_title')}</h3>
                <p className="text-gray-600 mb-4 font-soft">
                    {t('parents_safety_desc')}
                </p>
                <a href="#" className="text-dana-blue font-bold hover:underline">{t('parents_safety_link')}</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg ltr:border-l-8 rtl:border-r-8 border-dana-yellow">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-dana-yellow-dark">
                    <BookOpen size={28} className="text-yellow-600" />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-gray-800">{t('parents_philosophy_title')}</h3>
                <p className="text-gray-600 mb-4 font-soft">
                    {t('parents_philosophy_desc')}
                </p>
                <a href="#" className="text-yellow-600 font-bold hover:underline">{t('parents_philosophy_link')}</a>
            </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-dana-purple p-8 text-center text-white">
                <Mail size={48} className="mx-auto mb-4 opacity-80" />
                <h2 className="font-heading text-3xl mb-2">{t('parents_newsletter_title')}</h2>
                <p className="font-soft opacity-90">{t('parents_newsletter_desc')}</p>
            </div>
            <div className="p-8">
                <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder={t('parents_newsletter_placeholder')}
                        className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-dana-purple outline-none font-soft"
                        required
                    />
                    <button type="submit" className="bg-dana-coral text-white font-heading px-8 py-3 rounded-xl hover:bg-rose-500 transition-colors shadow-md">
                        {t('parents_btn_subscribe')}
                    </button>
                </form>
                <p className="text-center text-xs text-gray-400 mt-4">
                    {t('parents_privacy')}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ParentsCorner;