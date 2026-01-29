import React from 'react';
import { Play, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { useUser } from '../contexts/UserContext';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { isFavorite, toggleFavorite } = useUser();
  const liked = isFavorite(video.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(video.id);
  };

  return (
    <Link to={`/watch/${video.youtubeId}`} className="block relative group">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-8 border-dana-blue">
        <div className="relative aspect-video">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-dana-coral text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform pointer-events-none">
              <Play fill="currentColor" size={32} />
            </button>
          </div>
          
          {/* Favorite Button */}
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all transform hover:scale-110 z-10 ${liked ? 'bg-dana-coral text-white' : 'bg-white/80 text-gray-400 hover:text-dana-coral'}`}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          </button>

          <span className="absolute top-2 left-2 bg-dana-yellow text-dana-purple text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
            {video.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-heading text-lg text-gray-800 leading-tight mb-2">{video.title}</h3>
          <p className="font-soft text-gray-600 text-sm line-clamp-2">{video.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;