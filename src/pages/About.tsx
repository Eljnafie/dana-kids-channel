import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { data, t } = useLanguage();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Mission */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="flex-1">
                <img 
                    src="https://picsum.photos/seed/mission/800/600" 
                    alt="Kids playing" 
                    className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                />
            </div>
            <div className="flex-1">
                <h1 className="font-heading text-5xl text-dana-blue mb-6">{t('about_title')}</h1>
                <h3 className="font-subheading text-2xl text-gray-600 mb-6 italic">{t('about_quote')}</h3>
                <p className="font-body text-gray-700 leading-relaxed mb-6">
                    {t('about_p1')}
                </p>
                <p className="font-body text-gray-700 leading-relaxed">
                    {t('about_p2')}
                </p>
            </div>
        </div>

        {/* Team */}
        <div className="bg-gray-50 rounded-[3rem] p-12 text-center">
            <h2 className="font-heading text-4xl text-dana-purple mb-12">{t('about_team_title')}</h2>
            <div className="flex flex-wrap justify-center gap-12">
                {data.team.map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center max-w-xs">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-xl mb-6">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-heading text-2xl text-gray-800">{member.name}</h3>
                        <span className="text-dana-coral font-bold text-sm uppercase mb-3">{member.role}</span>
                        <p className="font-soft text-gray-600">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;