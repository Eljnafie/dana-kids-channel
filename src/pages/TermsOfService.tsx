import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { FileText } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO 
        title={t('nav_terms')} 
        description="Terms of Service for Dana for Children."
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 border-b pb-4">
             <FileText size={40} className="text-dana-blue" />
             <h1 className="font-heading text-4xl text-gray-800">{t('nav_terms')}</h1>
          </div>
          
          <p className="text-gray-500 mb-8 font-bold text-sm">
            {t('legal_last_updated')}: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 font-soft leading-relaxed">
             {language === 'en' ? (
                <>
                  <h3>1. Acceptance of Terms</h3>
                  <p>By accessing and using Dana for Children, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>
                  
                  <h3>2. Use of Content</h3>
                  <p>All content on this website, including videos, games, and printables, is for personal, non-commercial use only. You may not distribute, modify, or sell any content without prior written permission.</p>

                  <h3>3. User Conduct</h3>
                  <p>You agree to use the site only for lawful purposes. Harassment, hate speech, or inappropriate behavior in any interactive areas (if available) is strictly prohibited.</p>

                  <h3>4. Disclaimer</h3>
                  <p>The content provided on Dana for Children is for educational and entertainment purposes. We make no warranties regarding the accuracy or completeness of the materials.</p>

                  <h3>5. Changes to Terms</h3>
                  <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of the new terms.</p>
                </>
             ) : (
                <>
                  <h3>١. قبول الشروط</h3>
                  <p>من خلال الوصول إلى واستخدام موقع دنا للأطفال، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق، يرجى عدم استخدام موقعنا.</p>
                  
                  <h3>٢. استخدام المحتوى</h3>
                  <p>جميع المحتويات الموجودة على هذا الموقع، بما في ذلك الفيديوهات والألعاب والمطبوعات، مخصصة للاستخدام الشخصي وغير التجاري فقط. لا يجوز لك توزيع أو تعديل أو بيع أي محتوى دون إذن كتابي مسبق.</p>

                  <h3>٣. سلوك المستخدم</h3>
                  <p>أنت توافق على استخدام الموقع لأغراض قانونية فقط. يُحظر تماماً المضايقة أو خطاب الكراهية أو السلوك غير اللائق في أي مناطق تفاعلية.</p>

                  <h3>٤. إخلاء المسؤولية</h3>
                  <p>المحتوى المقدم في دنا للأطفال هو لأغراض تعليمية وترفيهية. نحن لا نقدم أي ضمانات بخصوص دقة أو اكتمال المواد.</p>

                  <h3>٥. تغيير الشروط</h3>
                  <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يعتبر الاستمرار في استخدام الموقع قبولاً للشروط الجديدة.</p>
                </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;