import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import VideoCard from '../components/VideoCard';
import { Search } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data, t } = useLanguage();

  const lowerQuery = query.toLowerCase();

  // Filter Content
  const videos = data.videos.filter(v => v.title.toLowerCase().includes(lowerQuery) || v.description.toLowerCase().includes(lowerQuery));
  const activities = data.activities.filter(a => a.title.toLowerCase().includes(lowerQuery));
  const blogs = data.blog.filter(b => b.title.toLowerCase().includes(lowerQuery));

  const hasResults = videos.length > 0 || activities.length > 0 || blogs.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        <h1 className="font-heading text-3xl mb-8 text-center text-gray-700">
            {t('search_for')} <span className="text-dana-blue">"{query}"</span>
        </h1>

        {!hasResults ? (
            <div className="text-center py-12 opacity-50">
                <Search size={64} className="mx-auto mb-4" />
                <p className="text-xl">{t('search_no_results')}</p>
            </div>
        ) : (
            <div className="space-y-12">
                {/* Videos */}
                {videos.length > 0 && (
                    <section>
                        <h2 className="font-heading text-2xl mb-4 border-b-2 border-dana-yellow inline-block pb-1">{t('nav_videos')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {videos.map(v => <VideoCard key={v.id} video={v} />)}
                        </div>
                    </section>
                )}

                {/* Activities */}
                {activities.length > 0 && (
                    <section>
                        <h2 className="font-heading text-2xl mb-4 border-b-2 border-dana-yellow inline-block pb-1">{t('nav_activities')}</h2>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {activities.map(activity => (
                                <Link to="/activities" key={activity.id} className="group bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all">
                                    <div className="overflow-hidden rounded-xl mb-4">
                                        <img src={activity.image} alt={activity.title} className="w-full h-32 object-cover" />
                                    </div>
                                    <h3 className="font-bold text-gray-800">{activity.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Blog */}
                {blogs.length > 0 && (
                    <section>
                        <h2 className="font-heading text-2xl mb-4 border-b-2 border-dana-yellow inline-block pb-1">{t('nav_blog')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blogs.map(b => (
                                <Link key={b.id} to={`/blog/${b.id}`} className="bg-white p-4 rounded-2xl shadow flex gap-4 hover:bg-gray-50">
                                    <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={b.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{b.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{b.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default SearchResults;