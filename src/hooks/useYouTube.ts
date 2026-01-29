import { useState, useEffect } from 'react';
import { Video } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { YOUTUBE_CONFIG } from '../constants';

export const useYouTubeVideos = (maxResults = 12) => {
  const { data } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiSource, setIsApiSource] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      // If no API key, use mock data immediately
      if (!YOUTUBE_CONFIG.API_KEY || !YOUTUBE_CONFIG.CHANNEL_ID) {
        if (isMounted) {
            setVideos(data.videos);
            setIsLoading(false);
            setIsApiSource(false);
        }
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_CONFIG.API_KEY}&channelId=${YOUTUBE_CONFIG.CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
        );
        
        const json = await response.json();
        
        if (json.error) {
            console.error("YouTube API Error:", json.error.message);
            throw new Error(json.error.message);
        }

        if (isMounted) {
            if (json.items) {
                const mappedVideos: Video[] = json.items.map((item: any) => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url,
                    category: 'New', 
                    description: item.snippet.description,
                    youtubeId: item.id.videoId
                }));
                setVideos(mappedVideos);
                setIsApiSource(true);
            } else {
                setVideos(data.videos);
                setIsApiSource(false);
            }
        }
      } catch (error) {
        console.warn("Falling back to static data due to API error or configuration.");
        if (isMounted) {
            setVideos(data.videos);
            setIsApiSource(false);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchVideos();
    return () => { isMounted = false; };
  }, [data.videos, maxResults]);

  return { videos, isLoading, isApiSource };
};