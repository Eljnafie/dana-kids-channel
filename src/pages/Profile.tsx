import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { Save, User } from 'lucide-react';

const AVATARS = [
  "https://picsum.photos/seed/dana_avatar/200/200",
  "https://picsum.photos/seed/owl_avatar/200/200",
  "https://picsum.photos/seed/cat_avatar/200/200",
  "https://picsum.photos/seed/dog_avatar/200/200",
  "https://picsum.photos/seed/bear_avatar/200/200",
  "https://picsum.photos/seed/fox_avatar/200/200"
];

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateProfile } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATARS[0]);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateProfile(name, selectedAvatar);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-12">
      <div className="container mx-auto px-4">
        
        <div className="max-w-xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-dana-yellow"></div>
            
            <h1 className="font-heading text-4xl text-center text-dana-purple mb-8">{t('profile_title')}</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name Input */}
                <div>
                    <label className="block text-gray-700 font-bold mb-3 text-lg">{t('profile_name_label')}</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-dana-blue outline-none text-xl bg-gray-50"
                            placeholder={t('profile_name_label')}
                            required
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Avatar Selection */}
                <div>
                    <label className="block text-gray-700 font-bold mb-4 text-lg">{t('profile_avatar_label')}</label>
                    <div className="grid grid-cols-3 gap-4">
                        {AVATARS.map((avatar, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedAvatar(avatar)}
                                className={`rounded-full overflow-hidden border-4 transition-all ${selectedAvatar === avatar ? 'border-dana-green scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                            >
                                <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-dana-yellow text-dana-purple font-heading text-xl py-4 rounded-2xl shadow-lg hover:bg-yellow-300 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <Save size={24} /> {saved ? t('profile_saved_msg') : t('profile_save')}
                </button>

            </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;