import Link from 'next/link'
import { 
  Car, Calculator, Calendar, CheckCircle, Shield, Clock, 
  DollarSign, FileText, RefreshCw, ChevronRight, ChevronDown,
  Smartphone, MessageCircle
} from 'lucide-react'

export default function SellLandingPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const steps = [
    {
      icon: Car,
      title: t.step1Title,
      description: t.step1Desc,
    },
    {
      icon: Calculator,
      title: t.step2Title,
      description: t.step2Desc,
    },
    {
      icon: Calendar,
      title: t.step3Title,
      description: t.step3Desc,
    },
  ]
  
  const benefits = [
    {
      icon: DollarSign,
      title: t.benefit1Title,
      description: t.benefit1Desc,
    },
    {
      icon: Clock,
      title: t.benefit2Title,
      description: t.benefit2Desc,
    },
    {
      icon: Shield,
      title: t.benefit3Title,
      description: t.benefit3Desc,
    },
    {
      icon: FileText,
      title: t.benefit4Title,
      description: t.benefit4Desc,
    },
  ]
  
  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-accent to-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${params.locale}/sell/valuation`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-semibold text-lg hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
              >
                <Calculator className="w-6 h-6" />
                {t.getValuation}
              </Link>
              <Link
                href={`/${params.locale}/sell/trade-in`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold text-lg border border-white/30 hover:bg-white/20 transition-colors"
              >
                <RefreshCw className="w-6 h-6" />
                {t.tradeIn}
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                {t.badge1}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                {t.badge2}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                {t.badge3}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.howItWorksTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.howItWorksSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-secondary to-transparent z-0" style={{ width: 'calc(100% - 4rem)' }} />
                )}
                
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href={`/${params.locale}/sell/valuation`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
            >
              {t.startNow}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Sell With Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.whySellTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.whySellSubtitle}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-secondary to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.ctaTitle}</h2>
              <p className="text-lg opacity-90">{t.ctaSubtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/971501234567?text=Hi,%20I%20want%20to%20sell%20my%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t.whatsapp}
              </a>
              <a
                href="tel:+97143001234"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-secondary rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Smartphone className="w-5 h-5" />
                {t.callUs}
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.faqTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.faqSubtitle}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-primary pr-4">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.finalCtaTitle}</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t.finalCtaSubtitle}</p>
          <Link
            href={`/${params.locale}/sell/valuation`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-semibold text-lg hover:bg-secondary/90 transition-colors"
          >
            {t.getStarted}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

const translations = {
  en: {
    heroTitle: 'Sell Your Car the Easy Way',
    heroSubtitle: 'Get an instant valuation, fair offer, and hassle-free sale. We handle all the paperwork.',
    getValuation: 'Get Instant Valuation',
    tradeIn: 'Trade-in for New Car',
    badge1: 'Free Valuation',
    badge2: 'Same Day Payment',
    badge3: 'No Hidden Fees',
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Sell your car in three simple steps. It\'s fast, easy, and transparent.',
    step1Title: 'Enter Your Car Details',
    step1Desc: 'Provide your VIN number or enter vehicle details manually for an instant valuation.',
    step2Title: 'Get Your Valuation',
    step2Desc: 'Receive a competitive offer based on current market conditions and your car\'s condition.',
    step3Title: 'Schedule Inspection',
    step3Desc: 'Book a convenient time for inspection. Get paid the same day after verification.',
    startNow: 'Start Now',
    whySellTitle: 'Why Sell With Drive Tru?',
    whySellSubtitle: 'We make selling your car simple, fast, and profitable.',
    benefit1Title: 'Best Prices',
    benefit1Desc: 'We offer competitive prices based on real-time market data and fair valuations.',
    benefit2Title: 'Quick Process',
    benefit2Desc: 'From valuation to payment, the entire process can be completed within 24 hours.',
    benefit3Title: 'Safe & Secure',
    benefit3Desc: 'All transactions are secure. We handle registration transfer and paperwork.',
    benefit4Title: 'No Paperwork',
    benefit4Desc: 'We take care of all the documentation, transfer, and legal requirements.',
    ctaTitle: 'Have Questions?',
    ctaSubtitle: 'Our team is here to help you through the selling process.',
    whatsapp: 'WhatsApp Us',
    callUs: 'Call Us',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about selling your car',
    faq1Q: 'How long does the selling process take?',
    faq1A: 'The entire process can be completed in as little as 24 hours. Get an instant online valuation, schedule an inspection at your convenience, and receive payment the same day after verification.',
    faq2Q: 'What documents do I need to sell my car?',
    faq2A: 'You\'ll need your Emirates ID, vehicle registration card (Mulkiya), and the original car keys. If there\'s a bank loan on the car, we\'ll need the loan settlement letter.',
    faq3Q: 'How is my car\'s value determined?',
    faq3A: 'We use real-time market data, vehicle condition, mileage, service history, and demand factors to provide a fair and competitive valuation.',
    faq4Q: 'Can I sell a car with an outstanding loan?',
    faq4A: 'Yes! We can help you settle the loan as part of the transaction. The remaining balance will be deducted from the sale price, and you\'ll receive the difference.',
    faq5Q: 'Is there any fee for the valuation?',
    faq5A: 'No, our valuation service is completely free with no obligation. You\'re free to accept or decline our offer.',
    finalCtaTitle: 'Ready to Sell Your Car?',
    finalCtaSubtitle: 'Get your free valuation now and see how much your car is worth.',
    getStarted: 'Get Started',
  },
  ar: {
    heroTitle: 'بع سيارتك بالطريقة السهلة',
    heroSubtitle: 'احصل على تقييم فوري، عرض عادل، وبيع بدون متاعب. نحن نتولى جميع الأوراق.',
    getValuation: 'احصل على تقييم فوري',
    tradeIn: 'استبدل بسيارة جديدة',
    badge1: 'تقييم مجاني',
    badge2: 'دفع في نفس اليوم',
    badge3: 'بدون رسوم خفية',
    howItWorksTitle: 'كيف يعمل',
    howItWorksSubtitle: 'بع سيارتك في ثلاث خطوات بسيطة. سريع وسهل وشفاف.',
    step1Title: 'أدخل تفاصيل سيارتك',
    step1Desc: 'قدم رقم الهيكل أو أدخل تفاصيل السيارة يدوياً للحصول على تقييم فوري.',
    step2Title: 'احصل على تقييمك',
    step2Desc: 'استلم عرضاً تنافسياً بناءً على ظروف السوق الحالية وحالة سيارتك.',
    step3Title: 'حدد موعد الفحص',
    step3Desc: 'احجز موعداً مناسباً للفحص. احصل على الدفع في نفس اليوم بعد التحقق.',
    startNow: 'ابدأ الآن',
    whySellTitle: 'لماذا تبيع مع درايف لايف؟',
    whySellSubtitle: 'نجعل بيع سيارتك بسيطاً وسريعاً ومربحاً.',
    benefit1Title: 'أفضل الأسعار',
    benefit1Desc: 'نقدم أسعاراً تنافسية بناءً على بيانات السوق الحقيقية والتقييمات العادلة.',
    benefit2Title: 'عملية سريعة',
    benefit2Desc: 'من التقييم إلى الدفع، يمكن إتمام العملية بأكملها خلال 24 ساعة.',
    benefit3Title: 'آمن ومضمون',
    benefit3Desc: 'جميع المعاملات آمنة. نتولى نقل الملكية والأوراق.',
    benefit4Title: 'بدون أوراق',
    benefit4Desc: 'نتولى جميع التوثيق والنقل والمتطلبات القانونية.',
    ctaTitle: 'لديك أسئلة؟',
    ctaSubtitle: 'فريقنا هنا لمساعدتك خلال عملية البيع.',
    whatsapp: 'راسلنا على واتساب',
    callUs: 'اتصل بنا',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'كل ما تحتاج معرفته عن بيع سيارتك',
    faq1Q: 'كم تستغرق عملية البيع؟',
    faq1A: 'يمكن إتمام العملية بأكملها في أقل من 24 ساعة. احصل على تقييم فوري عبر الإنترنت، حدد موعداً للفحص في الوقت المناسب لك، واستلم الدفع في نفس اليوم بعد التحقق.',
    faq2Q: 'ما هي الوثائق التي أحتاجها لبيع سيارتي؟',
    faq2A: 'ستحتاج إلى هويتك الإماراتية، بطاقة تسجيل السيارة (الملكية)، ومفاتيح السيارة الأصلية. إذا كان هناك قرض بنكي على السيارة، سنحتاج خطاب تسوية القرض.',
    faq3Q: 'كيف يتم تحديد قيمة سيارتي؟',
    faq3A: 'نستخدم بيانات السوق في الوقت الحقيقي، حالة السيارة، المسافة المقطوعة، تاريخ الصيانة، وعوامل الطلب لتقديم تقييم عادل وتنافسي.',
    faq4Q: 'هل يمكنني بيع سيارة عليها قرض؟',
    faq4A: 'نعم! يمكننا مساعدتك في تسوية القرض كجزء من المعاملة. سيتم خصم الرصيد المتبقي من سعر البيع، وستستلم الفرق.',
    faq5Q: 'هل هناك رسوم للتقييم؟',
    faq5A: 'لا، خدمة التقييم لدينا مجانية تماماً بدون أي التزام. أنت حر في قبول أو رفض عرضنا.',
    finalCtaTitle: 'مستعد لبيع سيارتك؟',
    finalCtaSubtitle: 'احصل على تقييمك المجاني الآن واكتشف قيمة سيارتك.',
    getStarted: 'ابدأ الآن',
  }
}
