// Home Page - Drive Tru
// TODO: Generate sections from v0.dev using prompts in .ai/V0_PROMPTS.md

import Link from 'next/link'
import { cars } from '@/data/cars'
import { offers } from '@/data/offers'
import { CarCard } from '@/components/cars/CarCard'
import { Search, ChevronRight } from 'lucide-react'

export default function HomePage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  // Get featured cars (first 4 available)
  const featuredCars = cars.filter(c => c.status === 'Available').slice(0, 4)
  
  // Get active offers
  const activeOffers = offers.filter(o => o.featured)
  
  // Body types
  const bodyTypes = [
    { type: 'SUV', icon: '🚙', count: cars.filter(c => c.bodyType === 'SUV').length },
    { type: 'Sedan', icon: '🚗', count: cars.filter(c => c.bodyType === 'Sedan').length },
    { type: 'Hatchback', icon: '🚘', count: cars.filter(c => c.bodyType === 'Hatchback').length },
    { type: 'Crossover', icon: '🚐', count: cars.filter(c => c.bodyType === 'Crossover').length },
  ]
  
  // Brands
  const brands = [
    { name: 'Suzuki', logo: '/images/logos/suzuki.png' },
    { name: 'Citroen', logo: '/images/logos/citroen.png' },
    { name: 'Toyota', logo: '/images/logos/toyota.png' },
    { name: 'Nissan', logo: '/images/logos/nissan.png' },
    { name: 'Honda', logo: '/images/logos/honda.png' },
  ]
  
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
          
          {/* Quick Search */}
          <div className="bg-white rounded-xl p-4 max-w-3xl mx-auto shadow-2xl">
            <div className="flex flex-col md:flex-row gap-3">
              <select className="flex-1 px-4 py-3 border rounded-lg text-gray-700">
                <option value="">{t.selectMake}</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Citroen">Citroen</option>
                <option value="Toyota">Toyota</option>
                <option value="Nissan">Nissan</option>
              </select>
              <select className="flex-1 px-4 py-3 border rounded-lg text-gray-700">
                <option value="">{t.selectModel}</option>
                <option value="Swift">Swift</option>
                <option value="Jimny">Jimny</option>
                <option value="C3">C3</option>
              </select>
              <Link 
                href={`/${params.locale}/buy/cars`}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                {t.search}
              </Link>
            </div>
          </div>
          
          <Link 
            href={`/${params.locale}/buy/cars`}
            className="inline-block mt-6 text-gray-300 hover:text-white"
          >
            {t.browseAll} <ChevronRight className="w-4 h-4 inline" />
          </Link>
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">{t.featured}</h2>
            <Link 
              href={`/${params.locale}/buy/cars`}
              className="text-secondary font-medium hover:underline"
            >
              {t.viewAll} →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                locale={params.locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY BODY TYPE */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">{t.browseByType}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map(({ type, icon, count }) => (
              <Link 
                key={type}
                href={`/${params.locale}/buy/cars?bodyType=${type}`}
                className="bg-white border rounded-xl p-6 text-center hover:shadow-lg hover:border-secondary transition-all group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
                <span className="font-semibold text-lg block">{type}</span>
                <span className="text-sm text-muted-foreground">{count} {t.cars}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY BRAND */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">{t.browseByBrand}</h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {brands.map(({ name }) => (
              <Link 
                key={name}
                href={`/${params.locale}/buy/cars?make=${name}`}
                className="bg-white border rounded-xl p-6 w-32 h-32 flex flex-col items-center justify-center hover:shadow-lg hover:border-secondary transition-all"
              >
                <div className="text-3xl font-bold text-primary mb-2">{name.charAt(0)}</div>
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whyChooseUs}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '✓', title: t.usp1, desc: t.usp1Desc },
              { icon: '💰', title: t.usp2, desc: t.usp2Desc },
              { icon: '🔄', title: t.usp3, desc: t.usp3Desc },
              { icon: '🛡️', title: t.usp4, desc: t.usp4Desc },
            ].map((usp, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {usp.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{usp.title}</h3>
                <p className="text-gray-300 text-sm">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELL YOUR CAR CTA */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-pink-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.sellTitle}</h2>
              <p className="text-lg opacity-90 mb-6">{t.sellDesc}</p>
              <Link href={`/${params.locale}/sell/valuation`} className="btn-primary bg-white text-secondary hover:bg-gray-100">
                {t.getStarted}
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-white/20 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🚗💰</div>
                <p className="text-xl font-semibold">{t.instantVal}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT OFFERS */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">{t.offers}</h2>
            <Link 
              href={`/${params.locale}/offers`}
              className="text-secondary font-medium hover:underline"
            >
              {t.viewAll} →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeOffers.slice(0, 2).map(offer => (
              <div key={offer.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-primary to-accent h-48 flex items-center justify-center">
                  <span className="text-white text-xl font-bold px-8 text-center">
                    {isArabic ? offer.titleAr : offer.title}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {isArabic ? offer.descriptionAr : offer.description}
                  </p>
                  <Link 
                    href={offer.cta.link} 
                    className="text-secondary font-medium hover:underline"
                  >
                    {isArabic ? offer.cta.textAr : offer.cta.text} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const translations = {
  en: {
    heroTitle: 'Find Your Perfect Pre-Owned Car',
    heroSubtitle: 'Certified vehicles from trusted dealers in UAE',
    selectMake: 'Select Make',
    selectModel: 'Select Model',
    search: 'Search',
    browseAll: 'Or browse all cars',
    featured: 'Featured Vehicles',
    viewAll: 'View All',
    browseByType: 'Browse by Body Type',
    browseByBrand: 'Browse by Brand',
    cars: 'cars',
    whyChooseUs: 'Why Choose Drive Tru',
    usp1: 'Certified Quality',
    usp1Desc: '150+ point inspection on every vehicle',
    usp2: 'Easy Financing',
    usp2Desc: 'Flexible EMI options from leading banks',
    usp3: 'Trade-in Welcome',
    usp3Desc: 'Get instant valuation for your car',
    usp4: 'Warranty Included',
    usp4Desc: 'Comprehensive warranty coverage',
    sellTitle: 'Sell Your Car',
    sellDesc: 'Get an instant valuation and fair offer for your vehicle',
    getStarted: 'Get Started',
    instantVal: 'Instant Valuation',
    offers: 'Current Offers',
  },
  ar: {
    heroTitle: 'اعثر على سيارتك المثالية',
    heroSubtitle: 'سيارات معتمدة من وكلاء موثوقين في الإمارات',
    selectMake: 'اختر الماركة',
    selectModel: 'اختر الموديل',
    search: 'بحث',
    browseAll: 'أو تصفح جميع السيارات',
    featured: 'سيارات مميزة',
    viewAll: 'عرض الكل',
    browseByType: 'تصفح حسب نوع الهيكل',
    browseByBrand: 'تصفح حسب الماركة',
    cars: 'سيارة',
    whyChooseUs: 'لماذا درايف لايف',
    usp1: 'جودة معتمدة',
    usp1Desc: 'فحص 150 نقطة لكل سيارة',
    usp2: 'تمويل سهل',
    usp2Desc: 'خيارات أقساط مرنة من البنوك الرائدة',
    usp3: 'استبدال مرحب به',
    usp3Desc: 'احصل على تقييم فوري لسيارتك',
    usp4: 'ضمان شامل',
    usp4Desc: 'تغطية ضمان شاملة',
    sellTitle: 'بيع سيارتك',
    sellDesc: 'احصل على تقييم فوري وعرض عادل لسيارتك',
    getStarted: 'ابدأ الآن',
    instantVal: 'تقييم فوري',
    offers: 'العروض الحالية',
  }
}
