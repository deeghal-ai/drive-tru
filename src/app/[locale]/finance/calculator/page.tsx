import { EMICalculator } from '@/components/forms/EMICalculator'
import { Building2, CheckCircle, ShieldCheck, Clock } from 'lucide-react'

export default function FinanceCalculatorPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const bankPartners = [
    'Emirates NBD',
    'Dubai Islamic Bank',
    'Abu Dhabi Commercial Bank',
    'HSBC',
    'Mashreq Bank',
    'RAK Bank'
  ]
  
  const benefits = [
    { icon: CheckCircle, title: t.benefit1, desc: t.benefit1Desc },
    { icon: Clock, title: t.benefit2, desc: t.benefit2Desc },
    { icon: ShieldCheck, title: t.benefit3, desc: t.benefit3Desc },
    { icon: Building2, title: t.benefit4, desc: t.benefit4Desc },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.pageTitle}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t.pageSubtitle}</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <EMICalculator locale={params.locale} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bank Partners */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">{t.bankPartners}</h3>
              <div className="grid grid-cols-2 gap-3">
                {bankPartners.map(bank => (
                  <div 
                    key={bank}
                    className="bg-gray-50 rounded-lg p-3 text-center text-sm font-medium"
                  >
                    {bank}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Need Help */}
            <div className="bg-secondary/10 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">{t.needHelp}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t.needHelpDesc}</p>
              <a 
                href={`/${params.locale}/tools/contact`}
                className="btn-secondary w-full"
              >
                {t.contactUs}
              </a>
            </div>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t.whyFinance}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <benefit.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6 text-sm text-muted-foreground">
          <p className="font-semibold mb-2">{t.disclaimer}</p>
          <p>{t.disclaimerText}</p>
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Car Finance Calculator',
    pageSubtitle: 'Calculate your monthly payments and find the best financing option for your dream car.',
    bankPartners: 'Our Banking Partners',
    needHelp: 'Need Help?',
    needHelpDesc: 'Our finance experts are here to help you find the best deal.',
    contactUs: 'Contact Us',
    whyFinance: 'Why Finance with Drive Life?',
    benefit1: 'Competitive Rates',
    benefit1Desc: 'Starting from 3.99% p.a. with our partner banks',
    benefit2: 'Quick Approval',
    benefit2Desc: 'Get pre-approved in just 24 hours',
    benefit3: 'Flexible Terms',
    benefit3Desc: 'Choose tenure from 12 to 84 months',
    benefit4: 'Multiple Banks',
    benefit4Desc: 'Compare offers from 6+ banks',
    disclaimer: 'Disclaimer',
    disclaimerText: 'The EMI calculation is indicative and for illustrative purposes only. Actual EMI may vary based on bank policies, credit score, and other factors. Final terms and conditions are subject to bank approval.',
  },
  ar: {
    pageTitle: 'حاسبة تمويل السيارات',
    pageSubtitle: 'احسب أقساطك الشهرية واعثر على أفضل خيار تمويل لسيارة أحلامك.',
    bankPartners: 'شركاؤنا من البنوك',
    needHelp: 'تحتاج مساعدة؟',
    needHelpDesc: 'خبراء التمويل لدينا هنا لمساعدتك في الحصول على أفضل صفقة.',
    contactUs: 'اتصل بنا',
    whyFinance: 'لماذا التمويل مع درايف لايف؟',
    benefit1: 'أسعار تنافسية',
    benefit1Desc: 'تبدأ من 3.99% سنوياً مع بنوكنا الشريكة',
    benefit2: 'موافقة سريعة',
    benefit2Desc: 'احصل على الموافقة المبدئية خلال 24 ساعة',
    benefit3: 'شروط مرنة',
    benefit3Desc: 'اختر المدة من 12 إلى 84 شهراً',
    benefit4: 'بنوك متعددة',
    benefit4Desc: 'قارن العروض من 6+ بنوك',
    disclaimer: 'إخلاء مسؤولية',
    disclaimerText: 'حساب القسط الشهري تقديري ولأغراض توضيحية فقط. قد يختلف القسط الفعلي بناءً على سياسات البنك ودرجة الائتمان وعوامل أخرى. الشروط والأحكام النهائية خاضعة لموافقة البنك.',
  }
}
