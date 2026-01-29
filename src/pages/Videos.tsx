import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import { Filter, Loader, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useYouTubeVideos } from '../hooks/useYouTube';
import { useUser } from '../contexts/UserContext';

const Videos: React.FC = () => {
  const { data, t } = useLanguage();
  const { videos, isLoading, isApiSource } = useYouTubeVideos(12);
  const { favorites } = useUser();
  const [filter, setFilter] = useState<string>('All');

  // Handle category names based on source
  const allLabel = data.categories[0];
  const favoritesLabel = data.categories[1]; // Assumes second item in DATA categories is 'Favorites'
  const activeFilter = filter === 'All' ? allLabel : filter;

  let filteredVideos = videos;

  if (activeFilter === favoritesLabel) {
      filteredVideos = videos.filter(v => favorites.includes(v.id));
  } else if (activeFilter !== allLabel) {
      filteredVideos = videos.filter(v => v.category === activeFilter);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl text-dana-blue mb-4">{t('videos_title')}</h1>
          <p className="font-soft text-xl text-gray-600">{t('videos_subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {/* Show Favorites Toggle if using API (since API doesn't have categories) or Static */}
            <button
                onClick={() => setFilter(favoritesLabel)}
                className={`px-6 py-2 rounded-full font-bold text-lg shadow-md transition-all flex items-center gap-2 ${
                  activeFilter === favoritesLabel
                    ? 'bg-dana-coral text-white scale-110' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
                <Heart size={18} fill={activeFilter === favoritesLabel ? "currentColor" : "none"} /> {t('video_favorites')}
            </button>
            
            {/* "All" Button */}
            <button
                onClick={() => setFilter(allLabel)}
                className={`px-6 py-2 rounded-full font-bold text-lg shadow-md transition-all ${
                  activeFilter === allLabel 
                    ? 'bg-dana-purple text-white scale-110' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
                {allLabel}
            </button>

            {/* Other Categories (Only for static data) */}
            {!isApiSource && data.categories.slice(2).map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold text-lg shadow-md transition-all ${
                  activeFilter === cat 
                    ? 'bg-dana-purple text-white scale-110' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
             <div className="flex justify-center py-20">
                 <Loader className="animate-spin text-dana-blue" size={64} />
             </div>
        ) : (
            <>
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>

                {filteredVideos.length === 0 && (
                  <div className="text-center py-20 text-gray-400">
                    <Filter size={48} className="mx-auto mb-4 opacity-50" />
                    <p>{activeFilter === favoritesLabel ? t('no_favorites') : t('videos_no_results')}</p>
                  </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default Videos;