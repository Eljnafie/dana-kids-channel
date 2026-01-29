import React, { useState } from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import ParentalGate from '../components/ParentalGate';

const Shop: React.FC = () => {
  const { data, t } = useLanguage();
  const [gateOpen, setGateOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  // Create schema for multiple products
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": data.products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": `${product.name} - ${product.category}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  const handleBuyClick = (url: string) => {
    setPendingUrl(url);
    setGateOpen(true);
  };

  const onGateSuccess = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
      setPendingUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <SEO 
        title={t('shop_title')} 
        description={t('shop_subtitle')}
        type="product"
        schema={productsSchema}
        path="/shop"
      />

      <ParentalGate 
        isOpen={gateOpen} 
        onClose={() => setGateOpen(false)} 
        onSuccess={onGateSuccess} 
      />

      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16 relative">
          <h1 className="font-heading text-5xl text-dana-purple mb-4">{t('shop_title')}</h1>
          <p className="font-soft text-xl text-gray-600">{t('shop_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.products.map(product => (
            <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden group h-full flex flex-col">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                 <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    width="400"
                    height="400"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
                 <button 
                    onClick={() => handleBuyClick(product.externalUrl)}
                    className="absolute bottom-4 ltr:right-4 rtl:left-4 bg-dana-coral text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 z-10 cursor-pointer"
                    title={t('shop_btn_buy')}
                    aria-label={`${t('shop_btn_buy')} ${product.name}`}
                >
                    <ExternalLink size={24} />
                 </button>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                 <div>
                    <span className="text-xs font-bold text-dana-blue uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-heading text-2xl text-gray-800 mb-2">{product.name}</h3>
                 </div>
                 <div className="flex justify-between items-center mt-4">
                    <p className="font-body text-xl text-dana-green font-bold">${product.price.toFixed(2)}</p>
                    <button 
                        onClick={() => handleBuyClick(product.externalUrl)}
                        className="text-sm font-bold text-dana-coral hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                        {t('shop_btn_buy')} <ExternalLink size={14} />
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-dana-blue rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="font-heading text-3xl md:text-4xl mb-4">{t('shop_sub_title')}</h2>
                <p className="font-soft text-lg mb-8 max-w-2xl mx-auto">{t('shop_sub_desc')}</p>
                <button className="bg-white text-dana-blue font-heading text-xl px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    {t('shop_btn_learn')}
                </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Shop;