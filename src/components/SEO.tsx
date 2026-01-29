import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'video.movie' | 'product';
  schema?: object;
  path?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://picsum.photos/seed/dana_hero/1200/630', 
  type = 'website',
  schema,
  path = ''
}) => {
  const { language } = useLanguage();
  const siteUrl = 'https://danaforchildren.com'; // Replace with actual domain
  const fullUrl = `${siteUrl}${path}`;
  const siteName = language === 'ar' ? 'دنا للأطفال' : 'Dana for Children';
  const docTitle = `${title} | ${siteName}`;

  // Organization Schema (For Google Knowledge Graph / Search Logo)
  // Ensure the 'logo' URL is a public, crawlable image URL.
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dana for Children",
    "url": siteUrl,
    "logo": "https://picsum.photos/seed/dana_logo/512/512", // Ideally, replace this with a permanent URL to your logo file
    "sameAs": [
      "https://www.youtube.com/@دناللأطفال",
      "https://instagram.com/danaforchildren",
      "https://facebook.com/danaforchildren"
    ],
    "targetAudience": {
      "@type": "Audience",
      "audienceType": "Children",
      "geographicArea": "Worldwide"
    }
  };

  return (
    <>
      {/* React 19 automatically hoists these to the <head> */}
      <title>{docTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Alternate Language Links */}
      <link rel="alternate" href={`${siteUrl}${path}`} hrefLang="x-default" />
      <link rel="alternate" href={`${siteUrl}${path}?lang=en`} hrefLang="en" />
      <link rel="alternate" href={`${siteUrl}${path}?lang=ar`} hrefLang="ar" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || orgSchema)}
      </script>
    </>
  );
};

export default SEO;