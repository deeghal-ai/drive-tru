// Finance Landing Page - Drive Tru
import Link from 'next/link'
import { 
  Calculator, 
  CheckCircle, 
  Clock, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  CreditCard,
  Percent,
  BadgeCheck
} from 'lucide-react'

export default function FinancePage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const bankPartners = [
    { name: 'Emirates NBD', rate: '3.49%' },
    { name: 'Dubai Islamic Bank', rate: '3.99%' },
    { name: 'ADCB', rate: '3.75%' },
    { name: 'HSBC', rate: '4.25%' },
    { name: 'Mashreq Bank', rate: '3.89%' },
    { name: 'RAK Bank', rate: '4.49%' },
  ]
  
  const howItWorks = [
    { step: 1, icon: Calculator, title: t.step1, desc: t.step1Desc },
    { step: 2, icon: FileText, title: t.step2, desc: t.step2Desc },
    { step: 3, icon: CreditCard, title: t.step3, desc: t.step3Desc },
    { step: 4, icon: BadgeCheck, title: t.step4, desc: t.step4Desc },
  ]
  
  const benefits = [
    { icon: Percent, title: t.benefit1, desc: t.benefit1Desc },
    { icon: Clock, title: t.benefit2, desc: t.benefit2Desc },
    { icon: ShieldCheck, title: t.benefit3, desc: t.benefit3Desc },
    { icon: Building2, title: t.benefit4, desc: t.benefit4Desc },
  ]
  
  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-accent to-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border border-secondary/30">
                💳 {t.tagline}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                {t.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/${params.locale}/finance/calculator`}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  {t.calculateEMI}
                </Link>
                <Link 
                  href={`/${params.locale}/finance/eligibility`}
                  className="btn-outline text-white border-white hover:bg-white hover:text-primary flex items-center justify-center gap-2"
                >
                  {t.checkEligibility}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold text-secondary">3.49%</div>
                  <div className="text-sm text-gray-400">{t.startingFrom}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">24h</div>
                  <div className="text-sm text-gray-400">{t.quickApproval}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">6+</div>
                  <div className="text-sm text-gray-400">{t.bankPartners}</div>
                </div>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-lg text-gray-300 mb-2">{t.monthlyPayment}</div>
                    <div className="text-5xl font-bold">AED 1,250</div>
                    <div className="text-sm text-gray-400 mt-2">{t.forVehicle} AED 75,000</div>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-gray-400">{t.loanAmount}</span>
                      <span className="font-medium">AED 60,000</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-gray-400">{t.tenure}</span>
                      <span className="font-medium">60 {t.months}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-gray-400">{t.interestRate}</span>
                      <span className="font-medium">3.99%</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-400">{t.totalPayable}</span>
                      <span className="font-medium">AED 75,000</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/${params.locale}/finance/calculator`}
                    className="btn-secondary w-full mt-6"
                  >
                    {t.customizeCalculation}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">{t.trustedPartners}</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            {t.partnersDesc}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bankPartners.map((bank, i) => (
              <div 
                key={i}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow border"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div className="font-semibold text-sm mb-1">{bank.name}</div>
                <div className="text-xs text-secondary font-medium">From {bank.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t.howItWorks}</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t.howItWorksDesc}
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-secondary to-secondary/20" />
                )}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                    <item.icon className="w-10 h-10 text-secondary" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t.whyFinanceWithUs}</h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            {t.whyFinanceDesc}
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Checker */}
      <section id="eligibility" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.eligibilityTitle}</h2>
              <p className="text-muted-foreground">{t.eligibilityDesc}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* UAE Residents */}
                <div className="border rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {t.uaeResidents}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t.req1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t.req2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t.req3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t.req4}</span>
                    </li>
                  </ul>
                </div>
                
                {/* Documents */}
                <div className="border rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {t.requiredDocs}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs text-primary font-bold">1</span>
                      </div>
                      <span>{t.doc1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs text-primary font-bold">2</span>
                      </div>
                      <span>{t.doc2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs text-primary font-bold">3</span>
                      </div>
                      <span>{t.doc3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs text-primary font-bold">4</span>
                      </div>
                      <span>{t.doc4}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-muted-foreground mb-4">{t.readyToApply}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href={`/${params.locale}/buy/cars`}
                    className="btn-secondary"
                  >
                    {t.browseCars}
                  </Link>
                  <Link 
                    href={`/${params.locale}/finance/calculator`}
                    className="btn-outline"
                  >
                    {t.calculateEMI}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">{t.faqTitle}</h2>
            <p className="text-muted-foreground text-center mb-12">{t.faqSubtitle}</p>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details 
                  key={i}
                  className="group bg-white rounded-xl shadow-sm border overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50">
                    <span className="font-semibold pr-4">{faq.q}</span>
                    <span className="text-2xl text-muted-foreground group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${params.locale}/buy/cars`}
              className="btn-primary bg-white text-secondary hover:bg-gray-100"
            >
              {t.browseCars}
            </Link>
            <Link 
              href={`/${params.locale}/tools/contact`}
              className="btn-outline text-white border-white hover:bg-white hover:text-secondary"
            >
              {t.talkToExpert}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const translations = {
  en: {
    tagline: 'Easy Car Financing',
    heroTitle: 'Drive Your Dream Car Today',
    heroSubtitle: 'Get pre-approved for car financing in minutes. Competitive rates from UAE\'s top banks with flexible payment plans.',
    calculateEMI: 'Calculate EMI',
    checkEligibility: 'Check Eligibility',
    startingFrom: 'Interest Rate',
    quickApproval: 'Quick Approval',
    bankPartners: 'Bank Partners',
    monthlyPayment: 'Monthly Payment',
    forVehicle: 'For vehicle worth',
    loanAmount: 'Loan Amount',
    tenure: 'Tenure',
    months: 'months',
    interestRate: 'Interest Rate',
    totalPayable: 'Total Payable',
    customizeCalculation: 'Customize Your Calculation',
    trustedPartners: 'Our Trusted Banking Partners',
    partnersDesc: 'We work with UAE\'s leading banks to offer you the best financing rates and terms.',
    howItWorks: 'How Car Financing Works',
    howItWorksDesc: 'Get your car financed in 4 simple steps. Our team handles the paperwork for you.',
    step1: 'Calculate EMI',
    step1Desc: 'Use our calculator to estimate your monthly payments based on your budget.',
    step2: 'Submit Application',
    step2Desc: 'Fill out a simple form with your details. We\'ll handle the bank submissions.',
    step3: 'Get Pre-Approval',
    step3Desc: 'Receive offers from multiple banks within 24 hours.',
    step4: 'Drive Away',
    step4Desc: 'Choose the best offer, complete documentation, and drive your new car home.',
    whyFinanceWithUs: 'Why Finance with Drive Tru?',
    whyFinanceDesc: 'Experience hassle-free car financing with competitive rates and expert guidance.',
    benefit1: 'Competitive Rates',
    benefit1Desc: 'Starting from 3.49% p.a. with our exclusive bank partnerships.',
    benefit2: '24-Hour Approval',
    benefit2Desc: 'Get pre-approved within 24 hours of submitting your application.',
    benefit3: 'Flexible Terms',
    benefit3Desc: 'Choose repayment terms from 12 to 84 months to suit your budget.',
    benefit4: 'Multiple Options',
    benefit4Desc: 'Compare offers from 6+ banks and choose the best deal for you.',
    eligibilityTitle: 'Check Your Eligibility',
    eligibilityDesc: 'See if you qualify for car financing with our partner banks.',
    uaeResidents: 'For UAE Residents',
    requiredDocs: 'Required Documents',
    req1: 'Minimum salary of AED 5,000/month',
    req2: 'Employment for at least 6 months',
    req3: 'Valid UAE residence visa',
    req4: 'Age between 21-65 years',
    doc1: 'Emirates ID (both sides)',
    doc2: 'Passport with valid visa page',
    doc3: 'Last 3 months bank statements',
    doc4: 'Salary certificate from employer',
    readyToApply: 'Meet the requirements? Start your application today!',
    browseCars: 'Browse Cars',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about car financing.',
    faq1Q: 'What is the minimum down payment required?',
    faq1A: 'The minimum down payment is typically 20% of the vehicle price. However, this may vary based on the bank and your credit profile. Some banks may offer lower down payment options for qualified buyers.',
    faq2Q: 'Can I finance a used car?',
    faq2A: 'Yes! We specialize in pre-owned car financing. All our certified pre-owned vehicles are eligible for financing with competitive rates similar to new car loans.',
    faq3Q: 'How long does the approval process take?',
    faq3A: 'Most applications receive pre-approval within 24 hours. Final approval and document processing typically takes 2-3 business days.',
    faq4Q: 'Can I pay off my loan early?',
    faq4A: 'Yes, early settlement is allowed with most of our partner banks. Some banks may charge a small early settlement fee, typically 1% of the outstanding amount.',
    ctaTitle: 'Ready to Get Started?',
    ctaDesc: 'Browse our certified pre-owned cars and get instant financing quotes.',
    talkToExpert: 'Talk to an Expert',
  },
  ar: {
    tagline: 'تمويل سيارات سهل',
    heroTitle: 'قُد سيارة أحلامك اليوم',
    heroSubtitle: 'احصل على موافقة مسبقة لتمويل السيارات في دقائق. أسعار تنافسية من أفضل بنوك الإمارات مع خطط دفع مرنة.',
    calculateEMI: 'احسب القسط الشهري',
    checkEligibility: 'تحقق من الأهلية',
    startingFrom: 'نسبة الفائدة',
    quickApproval: 'موافقة سريعة',
    bankPartners: 'شريك بنكي',
    monthlyPayment: 'القسط الشهري',
    forVehicle: 'لسيارة بقيمة',
    loanAmount: 'مبلغ القرض',
    tenure: 'المدة',
    months: 'شهر',
    interestRate: 'نسبة الفائدة',
    totalPayable: 'إجمالي المستحق',
    customizeCalculation: 'خصص حسابك',
    trustedPartners: 'شركاؤنا من البنوك الموثوقة',
    partnersDesc: 'نعمل مع أفضل البنوك في الإمارات لنقدم لك أفضل أسعار وشروط التمويل.',
    howItWorks: 'كيف يعمل تمويل السيارات',
    howItWorksDesc: 'احصل على تمويل سيارتك في 4 خطوات بسيطة. فريقنا يتولى الأوراق نيابة عنك.',
    step1: 'احسب القسط',
    step1Desc: 'استخدم حاسبتنا لتقدير أقساطك الشهرية بناءً على ميزانيتك.',
    step2: 'قدم الطلب',
    step2Desc: 'املأ استمارة بسيطة ببياناتك. سنتولى تقديمها للبنوك.',
    step3: 'احصل على الموافقة',
    step3Desc: 'استلم عروضاً من عدة بنوك خلال 24 ساعة.',
    step4: 'انطلق بسيارتك',
    step4Desc: 'اختر أفضل عرض، أكمل المستندات، وقُد سيارتك الجديدة إلى المنزل.',
    whyFinanceWithUs: 'لماذا التمويل مع درايف لايف؟',
    whyFinanceDesc: 'استمتع بتمويل سيارات خالٍ من المتاعب مع أسعار تنافسية وإرشاد خبير.',
    benefit1: 'أسعار تنافسية',
    benefit1Desc: 'تبدأ من 3.49% سنوياً مع شراكاتنا البنكية الحصرية.',
    benefit2: 'موافقة خلال 24 ساعة',
    benefit2Desc: 'احصل على موافقة مسبقة خلال 24 ساعة من تقديم طلبك.',
    benefit3: 'شروط مرنة',
    benefit3Desc: 'اختر فترة سداد من 12 إلى 84 شهراً لتناسب ميزانيتك.',
    benefit4: 'خيارات متعددة',
    benefit4Desc: 'قارن العروض من 6+ بنوك واختر أفضل صفقة لك.',
    eligibilityTitle: 'تحقق من أهليتك',
    eligibilityDesc: 'تعرف إذا كنت مؤهلاً لتمويل السيارات مع بنوكنا الشريكة.',
    uaeResidents: 'للمقيمين في الإمارات',
    requiredDocs: 'المستندات المطلوبة',
    req1: 'راتب لا يقل عن 5,000 درهم شهرياً',
    req2: 'توظيف لمدة 6 أشهر على الأقل',
    req3: 'تأشيرة إقامة إماراتية سارية',
    req4: 'العمر بين 21-65 سنة',
    doc1: 'الهوية الإماراتية (الوجهين)',
    doc2: 'جواز السفر مع صفحة التأشيرة السارية',
    doc3: 'كشف حساب بنكي لآخر 3 أشهر',
    doc4: 'شهادة راتب من صاحب العمل',
    readyToApply: 'تستوفي المتطلبات؟ ابدأ طلبك اليوم!',
    browseCars: 'تصفح السيارات',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'اعثر على إجابات للأسئلة الشائعة حول تمويل السيارات.',
    faq1Q: 'ما هي الدفعة المقدمة المطلوبة؟',
    faq1A: 'الدفعة المقدمة الدنيا عادة 20% من سعر السيارة. قد تختلف بناءً على البنك وملفك الائتماني. بعض البنوك قد تقدم خيارات دفعة أقل للمشترين المؤهلين.',
    faq2Q: 'هل يمكنني تمويل سيارة مستعملة؟',
    faq2A: 'نعم! نحن متخصصون في تمويل السيارات المستعملة. جميع سياراتنا المعتمدة مؤهلة للتمويل بأسعار تنافسية مماثلة لقروض السيارات الجديدة.',
    faq3Q: 'كم يستغرق الحصول على الموافقة؟',
    faq3A: 'معظم الطلبات تحصل على موافقة مسبقة خلال 24 ساعة. الموافقة النهائية ومعالجة المستندات تستغرق عادة 2-3 أيام عمل.',
    faq4Q: 'هل يمكنني سداد القرض مبكراً؟',
    faq4A: 'نعم، السداد المبكر مسموح به مع معظم بنوكنا الشريكة. قد تفرض بعض البنوك رسوم سداد مبكر صغيرة، عادة 1% من المبلغ المتبقي.',
    ctaTitle: 'مستعد للبدء؟',
    ctaDesc: 'تصفح سياراتنا المعتمدة واحصل على عروض تمويل فورية.',
    talkToExpert: 'تحدث مع خبير',
  }
}
