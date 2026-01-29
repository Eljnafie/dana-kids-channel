import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayCircle, Star, Brain, ArrowLeft, ArrowRight, Loader, 
  Rocket, Palette, Music, Sparkles, ShieldCheck, Heart, Users, BookOpen, Calendar
} from 'lucide-react';
import VideoCard from '../components/VideoCard';
import Mascot from '../components/Mascot';
import { useLanguage } from '../contexts/LanguageContext';
import { useYouTubeVideos } from '../hooks/useYouTube';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { t, data, dir } = useLanguage();
  const { videos, isLoading } = useYouTubeVideos(3);
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const categories = [
    { id: 'space', icon: Rocket, color: 'bg-indigo-100 text-indigo-600', label: 'Space' },
    { id: 'art', icon: Palette, color: 'bg-pink-100 text-pink-600', label: 'Art' },
    { id: 'music', icon: Music, color: 'bg-yellow-100 text-yellow-600', label: 'Music' },
    { id: 'fun', icon: Sparkles, color: 'bg-green-100 text-green-600', label: 'Fun' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO 
        title={t('hero_title')} 
        description={t('hero_desc')}
        path="/"
      />
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-b from-dana-blue to-blue-200 py-20 lg:py-32 px-4 overflow-hidden rounded-b-[4rem]">
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 text-white/20 animate-float" style={{ animationDelay: '0s' }}><Star size={48} fill="currentColor" /></div>
        <div className="absolute top-40 right-20 text-dana-yellow/30 animate-float" style={{ animationDelay: '1s' }}><Star size={64} fill="currentColor" /></div>
        <div className="absolute bottom-20 left-1/4 text-white/10 animate-wiggle"><Rocket size={96} /></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-200 to-transparent"></div>

        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-start text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-pop">
                <Sparkles size={16} className="text-dana-yellow" />
                <span className="font-bold text-sm tracking-wide uppercase">{t('header_hello')}!</span>
            </div>
            
            <h1 className="font-heading text-5xl lg:text-7xl mb-6 drop-shadow-xl leading-tight">
              {t('hero_title')}
            </h1>
            
            <p className="font-soft text-xl lg:text-2xl mb-8 opacity-95 max-w-lg mx-auto lg:mx-0 leading-relaxed text-blue-50">
              {t('hero_desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/videos" className="bg-dana-coral hover:bg-white hover:text-dana-coral text-white font-heading text-xl px-10 py-5 rounded-2xl shadow-[0_10px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-[5px] transition-all flex items-center justify-center gap-3">
                <PlayCircle size={28} fill="currentColor" className="text-white/50" /> {t('hero_btn_watch')}
              </Link>
              <Link to="/quizzes" className="bg-dana-purple hover:bg-white hover:text-dana-purple text-white font-heading text-xl px-10 py-5 rounded-2xl shadow-[0_10px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-[5px] transition-all flex items-center justify-center gap-3">
                <Brain size={28} /> {t('hero_btn_quiz')}
              </Link>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl relative">
             <div className="relative z-10 animate-float">
                <div className="bg-white p-3 rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img 
                        src="https://picsum.photos/seed/dana_hero_fun/800/600" 
                        alt="Dana playing" 
                        className="rounded-[2.5rem] w-full h-auto border-4 border-dana-yellow"
                    />
                </div>
             </div>
             {/* Decor */}
             <div className="absolute -top-12 -right-12 z-20 hidden lg:block">
                <Mascot type="wiggle" size="md" />
             </div>
          </div>
        </div>
      </section>

      {/* --- TRUST SIGNALS (Professional Touch) --- */}
      <div className="bg-white py-8 border-b-4 border-gray-100">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 font-bold uppercase tracking-wider text-sm">
              <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-green-500" /> Safe Content</div>
              <div className="flex items-center gap-2"><Heart size={20} className="text-red-500" /> Parent Approved</div>
              <div className="flex items-center gap-2"><Brain size={20} className="text-purple-500" /> Educational</div>
          </div>
      </div>

      {/* --- EXPLORE TOPICS (Kid Friendly) --- */}
      <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
              <h2 className="text-center font-heading text-4xl text-dana-blue mb-12">What do you want to learn?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {categories.map(cat => (
                      <Link to="/videos" key={cat.id} className={`${cat.color} p-8 rounded-3xl flex flex-col items-center gap-4 transition-transform hover:scale-105 shadow-lg`}>
                          <cat.icon size={48} />
                          <span className="font-heading text-xl">{cat.label}</span>
                      </Link>
                  ))}
              </div>
          </div>
      </section>

      {/* --- FEATURED VIDEOS --- */}
      <section className="py-16 bg-gray-50 rounded-t-[4rem]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10 px-2">
            <div>
              <div className="flex items-center gap-2 text-dana-coral font-bold uppercase tracking-widest text-sm mb-2">
                <PlayCircle size={16} /> New Episodes
              </div>
              <h2 className="font-heading text-4xl text-gray-800">{t('home_new_videos')}</h2>
            </div>
            <Link to="/videos" className="hidden md:flex items-center gap-2 text-white bg-dana-blue px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-400 transition-colors">
               {t('home_view_all')} <ArrowIcon size={18} />
            </Link>
          </div>
          
          {isLoading ? (
             <div className="flex justify-center py-12">
                 <Loader className="animate-spin text-dana-blue" size={48} />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.slice(0, 3).map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
             <Link to="/videos" className="text-dana-blue font-bold hover:underline">{t('home_view_all')} &larr;</Link>
          </div>
        </div>
      </section>

      {/* --- MEET THE CHARACTERS --- */}
      <section className="py-20 bg-dana-yellow/10">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-heading text-4xl text-dana-purple mb-12">{t('about_team_title')}</h2>
              <div className="flex flex-wrap justify-center gap-12">
                  {data.team.slice(0, 3).map((member, idx) => (
                      <div key={member.id || idx} className="group relative">
                          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 transform group-hover:scale-110 transition-transform duration-300 bg-white">
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="bg-white px-4 py-2 rounded-xl shadow-md inline-block">
                              <h3 className="font-heading text-xl text-gray-800">{member.name}</h3>
                          </div>
                      </div>
                  ))}
                  <Link to="/about" className="flex flex-col items-center justify-center w-40 h-40 rounded-full bg-white border-4 border-dashed border-dana-purple text-dana-purple hover:bg-purple-50 cursor-pointer transition-colors shadow-xl">
                      <Users size={32} className="mb-2" />
                      <span className="font-bold">Meet All</span>
                  </Link>
              </div>
          </div>
      </section>

      {/* --- ACTIVITIES TEASER --- */}
      <section className="py-20 bg-dana-blue relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
         
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-heading text-4xl text-white mb-4">{t('home_activities_title')}</h2>
            <p className="font-soft text-blue-100 max-w-2xl mx-auto mb-12 text-lg">
                {t('home_activities_desc')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.activities.slice(0, 4).map(activity => (
                    <Link to="/activities" key={activity.id} className="group bg-white p-4 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <div className="overflow-hidden rounded-2xl mb-4 bg-gray-100 aspect-square">
                            <img 
                              src={activity.image} 
                              alt={activity.title} 
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>
                        <h3 className="font-heading text-gray-800 group-hover:text-dana-blue truncate px-2">{activity.title}</h3>
                        <span className="inline-block mt-2 text-xs font-bold text-white bg-dana-coral px-2 py-1 rounded-md uppercase tracking-wider">{activity.type}</span>
                    </Link>
                ))}
            </div>
            
            <div className="mt-12">
                <Link to="/activities" className="inline-flex items-center gap-2 bg-white text-dana-blue font-heading text-xl px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    Explore All Activities <ArrowIcon size={20} />
                </Link>
            </div>
         </div>
      </section>

      {/* --- FROM THE BLOG --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
             <div className="flex justify-between items-end mb-10 px-2">
                <div>
                   <div className="flex items-center gap-2 text-dana-purple font-bold uppercase tracking-widest text-sm mb-2">
                       <BookOpen size={16} /> {t('blog_title')}
                   </div>
                   <h2 className="font-heading text-4xl text-gray-800">{t('blog_subtitle')}</h2>
                </div>
                <Link to="/blog" className="hidden md:flex items-center gap-2 text-white bg-dana-purple px-6 py-2 rounded-full font-bold shadow-md hover:bg-purple-400 transition-colors">
                   {t('home_view_all')} <ArrowIcon size={18} />
                </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.blog.slice(0, 3).map(post => (
                   <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                      <div className="rounded-3xl overflow-hidden mb-4 shadow-lg h-56 relative bg-gray-100">
                          {post.image ? (
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <BookOpen size={48} />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-xs font-bold bg-dana-coral px-2 py-1 rounded flex items-center gap-1 w-fit">
                                <Calendar size={10} /> {post.date}
                              </span>
                          </div>
                      </div>
                      <h3 className="font-heading text-xl text-gray-800 group-hover:text-dana-purple transition-colors line-clamp-2 px-1">{post.title}</h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2 px-1 font-soft">{post.excerpt}</p>
                   </Link>
                ))}
             </div>
             
             <div className="mt-8 text-center md:hidden">
                <Link to="/blog" className="text-dana-purple font-bold hover:underline">{t('home_view_all')} &larr;</Link>
             </div>
        </div>
      </section>
    </div>
  );
};

export default Home;