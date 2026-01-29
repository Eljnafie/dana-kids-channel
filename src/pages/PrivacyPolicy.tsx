import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO 
        title={t('nav_privacy')} 
        description="Privacy Policy for Dana for Children. We are committed to protecting your privacy and safety."
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 border-b pb-4">
             <ShieldCheck size={40} className="text-dana-green" />
             <h1 className="font-heading text-4xl text-gray-800">{t('nav_privacy')}</h1>
          </div>
          
          <p className="text-gray-500 mb-8 font-bold text-sm">
            {t('legal_last_updated')}: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 font-soft leading-relaxed">
             {language === 'en' ? (
                <>
                  <h3>1. Introduction</h3>
                  <p>Welcome to Dana for Children. We are committed to protecting the privacy of our visitors, especially children. This policy outlines how we collect, use, and protect information.</p>
                  
                  <h3>2. Information We Collect</h3>
                  <p>We do not knowingly collect personal identifiable information from children under 13 without parental consent. We may collect non-personal data such as:</p>
                  <ul>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Pages visited and time spent</li>
                  </ul>

                  <h3>3. Cookies</h3>
                  <p>We use cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser settings.</p>

                  <h3>4. Third-Party Services</h3>
                  <p>Our website includes embedded videos from YouTube. YouTube may collect data about your interaction with these videos. Please review Google's Privacy Policy for more information.</p>

                  <h3>5. Contact Us</h3>
                  <p>If you have questions about this privacy policy, please contact us at hello@danaforchildren.com.</p>
                </>
             ) : (
                <>
                  <h3>١. مقدمة</h3>
                  <p>مرحباً بكم في دنا للأطفال. نحن ملتزمون بحماية خصوصية زوارنا، وخاصة الأطفال. توضح هذه السياسة كيفية جمع المعلومات واستخدامها وحمايتها.</p>
                  
                  <h3>٢. المعلومات التي نجمعها</h3>
                  <p>نحن لا نجمع عمداً معلومات شخصية من الأطفال دون سن 13 عاماً دون موافقة الوالدين. قد نجمع بيانات غير شخصية مثل:</p>
                  <ul>
                      <li>نوع المتصفح وإصداره</li>
                      <li>نظام التشغيل</li>
                      <li>الصفحات التي تمت زيارتها ووقت الزيارة</li>
                  </ul>

                  <h3>٣. ملفات تعريف الارتباط (Cookies)</h3>
                  <p>نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة المرور. يمكنك اختيار تعطيل هذه الملفات من إعدادات المتصفح لديك.</p>

                  <h3>٤. خدمات الطرف الثالث</h3>
                  <p>يتضمن موقعنا فيديوهات مدمجة من يوتيوب. قد يجمع يوتيوب بيانات حول تفاعلك مع هذه الفيديوهات. يرجى مراجعة سياسة خصوصية Google لمزيد من المعلومات.</p>

                  <h3>٥. اتصل بنا</h3>
                  <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر hello@danaforchildren.com.</p>
                </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;