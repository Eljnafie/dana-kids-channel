import React from 'react';
import { Download, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Activities: React.FC = () => {
  const { data, t } = useLanguage();

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl text-dana-coral mb-4">{t('activities_title')}</h1>
          <p className="font-soft text-xl text-gray-600">{t('activities_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.activities.map(activity => (
            <div key={activity.id} className="bg-white p-4 rounded-3xl shadow-lg border-2 border-transparent hover:border-dana-yellow transition-all">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                 <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                 {activity.isPremium && (
                    <div className="absolute top-2 left-2 bg-dana-yellow text-dana-purple px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                        <Lock size={12} /> {t('label_premium')}
                    </div>
                 )}
              </div>
              
              <h3 className="font-heading text-xl text-gray-800 mb-1">{activity.title}</h3>
              <div className="flex justify-between items-center mb-4">
                 <span className="text-sm text-gray-500 font-bold">{activity.type}</span>
                 <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{t('label_age')} {activity.ageGroup}</span>
              </div>

              <button className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                  activity.isPremium 
                  ? 'bg-dana-purple text-white hover:bg-purple-600' 
                  : 'bg-dana-green text-white hover:bg-green-600'
              }`}>
                 {activity.isPremium ? t('btn_get_access') : t('btn_download')}
                 {!activity.isPremium && <Download size={18} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;