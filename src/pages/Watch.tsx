import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import VideoCard from '../components/VideoCard';
import SEO from '../components/SEO';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, data, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  // Find video details in static data to show title/desc (fallback)
  const videoDetails = data.videos.find(v => v.youtubeId === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id) return null;

  // Video Object Schema for SEO
  const videoSchema = videoDetails ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoDetails.title,
    "description": videoDetails.description,
    "thumbnailUrl": [videoDetails.thumbnail],
    "uploadDate": new Date().toISOString(), // In real app, fetch actual date
    "embedUrl": `https://www.youtube.com/embed/${id}`,
    "contentUrl": `https://www.youtube.com/watch?v=${id}`,
    "isFamilyFriendly": true,
    "genre": videoDetails.category
  } : undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {videoDetails && (
          <SEO 
            title={videoDetails.title} 
            description={videoDetails.description}
            image={videoDetails.thumbnail}
            type="video.movie"
            schema={videoSchema}
            path={`/watch/${id}`}
          />
      )}

      <div className="container mx-auto px-4">
        
        {/* Back Button */}
        <Link to="/videos" className="inline-flex items-center gap-2 font-bold text-gray-600 hover:text-dana-blue mb-8 transition-colors">
          <ArrowIcon size={20} /> {t('watch_back')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Player Column */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video mb-6 relative">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`} 
                title={videoDetails?.title || "YouTube video player"}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-gray-200">
              <h1 className="font-heading text-2xl md:text-3xl text-dana-blue mb-2">
                {videoDetails ? videoDetails.title : '...'}
              </h1>
              <p className="font-soft text-gray-600 leading-relaxed">
                {videoDetails ? videoDetails.description : ''}
              </p>
            </div>
          </div>

          {/* Sidebar / Watch Next */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl text-dana-purple mb-4 px-2">{t('watch_next')}</h3>
            <div className="flex flex-col gap-6">
              {data.videos
                .filter(v => v.youtubeId !== id)
                .slice(0, 4)
                .map(video => (
                  <VideoCard key={video.id} video={video} />
                ))
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Watch;