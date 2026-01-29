import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dana-blue/10 py-12">
      <div className="container mx-auto px-4">
        
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-dana-blue p-8 text-center">
                <h1 className="font-heading text-4xl text-white mb-2">{t('contact_title')}</h1>
                <p className="text-white/90 font-soft">{t('contact_subtitle')}</p>
            </div>
            
            <div className="p-8 md:p-12">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message!"); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 text-sm">{t('contact_name')}</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-dana-blue outline-none bg-gray-50" placeholder="" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 text-sm">{t('contact_email')}</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-dana-blue outline-none bg-gray-50" placeholder="" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-sm">{t('contact_subject')}</label>
                        <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-dana-blue outline-none bg-gray-50">
                            <option>General Feedback</option>
                            <option>Business Inquiry / Collaboration</option>
                            <option>Report an Issue</option>
                            <option>Just Saying Hi!</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-sm">{t('contact_message')}</label>
                        <textarea className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-dana-blue outline-none bg-gray-50 h-32" placeholder="..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-dana-yellow text-dana-purple font-heading text-xl py-4 rounded-xl shadow-md hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2">
                        <Send size={20} /> {t('contact_btn_send')}
                    </button>
                </form>
            </div>
        </div>

        <div className="max-w-2xl mx-auto text-center mt-8">
            <p className="text-gray-500 text-sm font-soft">
                {t('contact_disclaimer')}
            </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;