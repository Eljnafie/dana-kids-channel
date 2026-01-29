import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const post = data.blog.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) return <div className="p-20 text-center">Post not found</div>;

  // Article Schema (Structured Data)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": new Date(post.date).toISOString(), // Approximating date parsing for demo
    "author": [{
        "@type": "Person",
        "name": post.author,
        "url": "https://danaforchildren.com/about"
    }],
    "publisher": {
        "@type": "Organization",
        "name": "Dana for Children",
        "logo": {
            "@type": "ImageObject",
            "url": "https://picsum.photos/seed/dana/512/512"
        }
    },
    "description": post.excerpt
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        image={post.image}
        type="article"
        schema={articleSchema}
        path={`/blog/${post.id}`}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-dana-blue mb-8 font-bold">
            <ArrowIcon size={20} /> {t('blog_back')}
        </Link>

        <article>
            <h1 className="font-heading text-4xl md:text-5xl text-gray-900 mb-6">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-gray-500 mb-8 border-b border-gray-100 pb-8">
                <span className="flex items-center gap-2"><Calendar size={18} /> {post.date}</span>
                <span className="flex items-center gap-2"><User size={18} /> {post.author}</span>
            </div>

            <div className="rounded-3xl overflow-hidden mb-12 shadow-lg">
                <img src={post.image} alt={post.title} className="w-full h-auto" width="800" height="450" />
            </div>

            <div 
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dana-blue prose-a:text-dana-coral"
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;