import Link from 'next/link'
import { 
  Target, Eye, Heart, Award, Users, Building2, 
  Shield, Clock, CheckCircle, ChevronRight, Star
} from 'lucide-react'

export default function AboutPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const values = [
    { icon: Shield, title: t.value1Title, description: t.value1Desc },
    { icon: Heart, title: t.value2Title, description: t.value2Desc },
    { icon: Award, title: t.value3Title, description: t.value3Desc },
    { icon: Clock, title: t.value4Title, description: t.value4Desc },
  ]
  
  const stats = [
    { value: '5000+', label: t.stat1 },
    { value: '98%', label: t.stat2 },
    { value: '3', label: t.stat3 },
    { value: '15+', label: t.stat4 },
  ]
  
  const partners = [
    'Suzuki UAE',
    'Citroen UAE', 
    'Emirates NBD',
    'Dubai Islamic Bank',
    'Carsome',
    'AGMC'
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-6">
              {t.tagline}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-secondary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                {t.storyTitle}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t.storyP1}</p>
                <p>{t.storyP2}</p>
                <p>{t.storyP3}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Building2 className="w-16 h-16 mx-auto mb-4" />
                <p>{t.showroomImage}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t.visionTitle}</h3>
              <p className="text-muted-foreground">{t.visionDesc}</p>
            </div>
            
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t.missionTitle}</h3>
              <p className="text-muted-foreground">{t.missionDesc}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.valuesTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.valuesSubtitle}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.whyChooseTitle}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t.whyChooseSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: t.usp1Title, desc: t.usp1Desc },
              { title: t.usp2Title, desc: t.usp2Desc },
              { title: t.usp3Title, desc: t.usp3Desc },
              { title: t.usp4Title, desc: t.usp4Desc },
              { title: t.usp5Title, desc: t.usp5Desc },
              { title: t.usp6Title, desc: t.usp6Desc },
            ].map((usp, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{usp.title}</h3>
                  <p className="text-gray-300 text-sm">{usp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners & Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">{t.partnersTitle}</h2>
            <p className="text-muted-foreground">{t.partnersSubtitle}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {partners.map((partner, i) => (
              <div 
                key={i}
                className="w-40 h-24 bg-gray-100 rounded-xl flex items-center justify-center px-4"
              >
                <span className="text-center font-medium text-gray-600">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.testimonialsTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.testimonialsSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Ahmed Al-Maktoum', role: t.customer, text: t.testimonial1 },
              { name: 'Sarah Johnson', role: t.customer, text: t.testimonial2 },
              { name: 'Mohammed Al-Rashid', role: t.customer, text: t.testimonial3 },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${params.locale}/buy/cars`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              {t.browseCars}
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${params.locale}/locations`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              {t.visitShowroom}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const translations = {
  en: {
    tagline: 'Al Rostamani Trading Company',
    heroTitle: 'Driving Dreams, Delivering Trust',
    heroSubtitle: 'Drive Life is the pre-owned vehicle division of Al Rostamani Trading Company, bringing you certified quality vehicles with complete peace of mind.',
    stat1: 'Happy Customers',
    stat2: 'Satisfaction Rate',
    stat3: 'Showrooms in UAE',
    stat4: 'Years of Excellence',
    storyTitle: 'Our Story',
    storyP1: 'Drive Life was born from a simple vision: to transform the pre-owned car buying experience in the UAE. As part of the Al Rostamani Group, we bring decades of automotive expertise and a commitment to excellence.',
    storyP2: 'Our journey began with the understanding that buying a used car shouldn\'t be stressful. We set out to create a transparent, trustworthy marketplace where every vehicle is thoroughly inspected and certified.',
    storyP3: 'Today, Drive Life stands as the premier destination for quality pre-owned Suzuki, Citroen, and select multi-brand vehicles in the UAE, with showrooms across Dubai and Abu Dhabi.',
    showroomImage: 'Showroom Image',
    visionTitle: 'Our Vision',
    visionDesc: 'To be the most trusted and customer-centric pre-owned automotive marketplace in the UAE, setting new standards for quality, transparency, and service excellence.',
    missionTitle: 'Our Mission',
    missionDesc: 'To provide every customer with a seamless, transparent, and enjoyable car buying and selling experience, backed by certified quality and exceptional after-sales support.',
    valuesTitle: 'Our Values',
    valuesSubtitle: 'The principles that guide everything we do',
    value1Title: 'Integrity',
    value1Desc: 'Complete transparency in every transaction and interaction',
    value2Title: 'Customer First',
    value2Desc: 'Your satisfaction is our ultimate measure of success',
    value3Title: 'Quality',
    value3Desc: 'Every vehicle meets our rigorous 150-point inspection',
    value4Title: 'Efficiency',
    value4Desc: 'Fast, streamlined processes that respect your time',
    whyChooseTitle: 'Why Choose Drive Life?',
    whyChooseSubtitle: 'Experience the difference of a trusted automotive partner',
    usp1Title: '150-Point Inspection',
    usp1Desc: 'Every vehicle undergoes rigorous quality checks',
    usp2Title: 'Certified Pre-Owned',
    usp2Desc: 'Only the best vehicles earn our certification',
    usp3Title: 'Easy Financing',
    usp3Desc: 'Flexible payment plans with leading banks',
    usp4Title: 'Free Warranty',
    usp4Desc: 'Comprehensive coverage for peace of mind',
    usp5Title: 'Trade-in Welcome',
    usp5Desc: 'Get fair value for your current vehicle',
    usp6Title: 'After-Sales Support',
    usp6Desc: 'Dedicated service centers across UAE',
    partnersTitle: 'Our Partners',
    partnersSubtitle: 'Trusted by leading automotive and financial brands',
    testimonialsTitle: 'What Our Customers Say',
    testimonialsSubtitle: 'Real experiences from real customers',
    customer: 'Verified Customer',
    testimonial1: 'The entire process was smooth and transparent. I found my dream car and the financing was arranged within a day!',
    testimonial2: 'Excellent service! The team went above and beyond to help me find the perfect family SUV. Highly recommend Drive Life.',
    testimonial3: 'I was impressed by the quality of vehicles and the professionalism of the staff. Fair pricing and no hidden fees.',
    ctaTitle: 'Ready to Find Your Perfect Car?',
    ctaSubtitle: 'Browse our collection of certified pre-owned vehicles or visit one of our showrooms today.',
    browseCars: 'Browse Cars',
    visitShowroom: 'Visit Showroom',
  },
  ar: {
    tagline: 'شركة الرستماني للتجارة',
    heroTitle: 'نقود الأحلام، نوفر الثقة',
    heroSubtitle: 'درايف لايف هي قسم السيارات المستعملة في شركة الرستماني للتجارة، نقدم لك سيارات معتمدة بجودة عالية مع راحة بال تامة.',
    stat1: 'عميل سعيد',
    stat2: 'معدل الرضا',
    stat3: 'معارض في الإمارات',
    stat4: 'سنوات من التميز',
    storyTitle: 'قصتنا',
    storyP1: 'ولدت درايف لايف من رؤية بسيطة: تحويل تجربة شراء السيارات المستعملة في الإمارات. كجزء من مجموعة الرستماني، نجلب عقوداً من الخبرة في مجال السيارات والتزاماً بالتميز.',
    storyP2: 'بدأت رحلتنا مع فهم أن شراء سيارة مستعملة لا يجب أن يكون مرهقاً. سعينا لإنشاء سوق شفاف وموثوق حيث يتم فحص واعتماد كل سيارة بدقة.',
    storyP3: 'اليوم، تقف درايف لايف كوجهة رئيسية لسيارات سوزوكي وسيتروين المستعملة عالية الجودة والعلامات التجارية المتعددة المختارة في الإمارات، مع معارض في دبي وأبوظبي.',
    showroomImage: 'صورة المعرض',
    visionTitle: 'رؤيتنا',
    visionDesc: 'أن نكون السوق الأكثر موثوقية والأكثر تركيزاً على العملاء للسيارات المستعملة في الإمارات، مع وضع معايير جديدة للجودة والشفافية والتميز في الخدمة.',
    missionTitle: 'مهمتنا',
    missionDesc: 'توفير تجربة شراء وبيع سيارات سلسة وشفافة وممتعة لكل عميل، مدعومة بجودة معتمدة ودعم استثنائي بعد البيع.',
    valuesTitle: 'قيمنا',
    valuesSubtitle: 'المبادئ التي توجه كل ما نقوم به',
    value1Title: 'النزاهة',
    value1Desc: 'شفافية كاملة في كل معاملة وتفاعل',
    value2Title: 'العميل أولاً',
    value2Desc: 'رضاك هو مقياسنا النهائي للنجاح',
    value3Title: 'الجودة',
    value3Desc: 'كل سيارة تلبي فحصنا الدقيق من 150 نقطة',
    value4Title: 'الكفاءة',
    value4Desc: 'عمليات سريعة ومبسطة تحترم وقتك',
    whyChooseTitle: 'لماذا تختار درايف لايف؟',
    whyChooseSubtitle: 'اختبر الفرق مع شريك سيارات موثوق',
    usp1Title: 'فحص 150 نقطة',
    usp1Desc: 'تخضع كل سيارة لفحوصات جودة صارمة',
    usp2Title: 'معتمدة مسبقاً',
    usp2Desc: 'فقط أفضل السيارات تحصل على شهادتنا',
    usp3Title: 'تمويل سهل',
    usp3Desc: 'خطط دفع مرنة مع البنوك الرائدة',
    usp4Title: 'ضمان مجاني',
    usp4Desc: 'تغطية شاملة لراحة بالك',
    usp5Title: 'استبدال مرحب به',
    usp5Desc: 'احصل على قيمة عادلة لسيارتك الحالية',
    usp6Title: 'دعم ما بعد البيع',
    usp6Desc: 'مراكز خدمة مخصصة في جميع أنحاء الإمارات',
    partnersTitle: 'شركاؤنا',
    partnersSubtitle: 'موثوق به من قبل العلامات التجارية الرائدة في السيارات والمالية',
    testimonialsTitle: 'ماذا يقول عملاؤنا',
    testimonialsSubtitle: 'تجارب حقيقية من عملاء حقيقيين',
    customer: 'عميل موثق',
    testimonial1: 'كانت العملية بأكملها سلسة وشفافة. وجدت سيارة أحلامي وتم ترتيب التمويل في يوم واحد!',
    testimonial2: 'خدمة ممتازة! ذهب الفريق إلى أبعد الحدود لمساعدتي في إيجاد SUV العائلية المثالية. أوصي بشدة بدرايف لايف.',
    testimonial3: 'أعجبت بجودة السيارات واحترافية الموظفين. أسعار عادلة وبدون رسوم خفية.',
    ctaTitle: 'مستعد لإيجاد سيارتك المثالية؟',
    ctaSubtitle: 'تصفح مجموعتنا من السيارات المستعملة المعتمدة أو قم بزيارة أحد معارضنا اليوم.',
    browseCars: 'تصفح السيارات',
    visitShowroom: 'زيارة المعرض',
  }
}
