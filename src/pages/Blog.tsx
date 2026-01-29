import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User } from 'lucide-react';

const Blog: React.FC = () => {
  const { data, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl text-dana-blue mb-4">{t('blog_title')}</h1>
          <p className="font-soft text-xl text-gray-600">{t('blog_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.blog.map(post => (
            <div key={post.id} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow">
               <div className="h-64 overflow-hidden">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
               </div>
               <div className="p-8 flex-1 flex flex-col">
                   <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-bold">
                       <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                       <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                   </div>
                   <h2 className="font-heading text-2xl text-gray-800 mb-4">{post.title}</h2>
                   <p className="font-soft text-gray-600 mb-6 flex-1">{post.excerpt}</p>
                   <Link 
                     to={`/blog/${post.id}`} 
                     className="text-dana-coral font-bold hover:underline inline-flex items-center gap-1"
                   >
                     {t('blog_read_more')} &rarr;
                   </Link>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;