import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { Cookie } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO 
        title={t('nav_cookies')} 
        description="Cookie Policy for Dana for Children."
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 border-b pb-4">
             <Cookie size={40} className="text-dana-yellow" />
             <h1 className="font-heading text-4xl text-gray-800">{t('nav_cookies')}</h1>
          </div>
          
          <p className="text-gray-500 mb-8 font-bold text-sm">
            {t('legal_last_updated')}: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 font-soft leading-relaxed">
             {language === 'en' ? (
                <>
                  <h3>1. What Are Cookies?</h3>
                  <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
                  
                  <h3>2. How We Use Cookies</h3>
                  <p>We use cookies for the following purposes:</p>
                  <ul>
                      <li>**Essential Cookies:** Necessary for the website to function correctly.</li>
                      <li>**Analytics Cookies:** Help us understand how visitors interact with our website (e.g., Google Analytics).</li>
                      <li>**Preference Cookies:** Remember your settings, such as language preference.</li>
                  </ul>

                  <h3>3. Managing Cookies</h3>
                  <p>Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect the functionality of the website.</p>
                </>
             ) : (
                <>
                  <h3>١. ما هي ملفات تعريف الارتباط؟</h3>
                  <p>ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك عند زيارة موقع ويب. تُستخدم على نطاق واسع لجعل المواقع تعمل بكفاءة أكبر وتوفير المعلومات لأصحاب الموقع.</p>
                  
                  <h3>٢. كيف نستخدم ملفات تعريف الارتباط</h3>
                  <p>نستخدم ملفات تعريف الارتباط للأغراض التالية:</p>
                  <ul>
                      <li>**ملفات أساسية:** ضرورية لكي يعمل الموقع بشكل صحيح.</li>
                      <li>**ملفات التحليل:** تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا.</li>
                      <li>**ملفات التفضيلات:** تتذكر إعداداتك، مثل اللغة المفضلة.</li>
                  </ul>

                  <h3>٣. إدارة ملفات تعريف الارتباط</h3>
                  <p>تسمح معظم متصفحات الويب بالتحكم في ملفات تعريف الارتباط من خلال إعداداتها. ومع ذلك، قد يؤثر تقييد ملفات تعريف الارتباط على وظائف الموقع.</p>
                </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;