// Home Page - Drive Tru
// TODO: Generate sections from v0.dev using prompts in .ai/V0_PROMPTS.md

import Link from 'next/link'
import { cars } from '@/data/cars'
import { offers } from '@/data/offers'
import { FeaturedCarsSection } from '@/components/cars/FeaturedCarsSection'
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
  
  // Body types with images from inventory
  const bodyTypes = [
    { 
      type: 'SUV', 
      icon: '🚙', 
      count: cars.filter(c => c.bodyType === 'SUV').length,
      image: '/images/cars/suzuki/grand-vitara-1.jpg',
      description: 'Spacious and powerful for any adventure',
      priceRange: cars.filter(c => c.bodyType === 'SUV').length > 0 
        ? `AED ${Math.min(...cars.filter(c => c.bodyType === 'SUV').map(c => c.price)).toLocaleString()} - ${Math.max(...cars.filter(c => c.bodyType === 'SUV').map(c => c.price)).toLocaleString()}`
        : 'Coming soon'
    },
    { 
      type: 'Sedan', 
      icon: '🚗', 
      count: cars.filter(c => c.bodyType === 'Sedan').length,
      image: '/images/cars/suzuki/dzire-1.jpg',
      description: 'Classic comfort and efficiency',
      priceRange: cars.filter(c => c.bodyType === 'Sedan').length > 0
        ? `AED ${Math.min(...cars.filter(c => c.bodyType === 'Sedan').map(c => c.price)).toLocaleString()} - ${Math.max(...cars.filter(c => c.bodyType === 'Sedan').map(c => c.price)).toLocaleString()}`
        : 'Coming soon'
    },
    { 
      type: 'Hatchback', 
      icon: '🚘', 
      count: cars.filter(c => c.bodyType === 'Hatchback').length,
      image: '/images/cars/suzuki/swift-1.jpg',
      description: 'Compact and practical for city life',
      priceRange: cars.filter(c => c.bodyType === 'Hatchback').length > 0
        ? `AED ${Math.min(...cars.filter(c => c.bodyType === 'Hatchback').map(c => c.price)).toLocaleString()} - ${Math.max(...cars.filter(c => c.bodyType === 'Hatchback').map(c => c.price)).toLocaleString()}`
        : 'Coming soon'
    },
    { 
      type: 'Crossover', 
      icon: '🚐', 
      count: cars.filter(c => c.bodyType === 'Crossover').length,
      image: '/images/cars/citroen/c3-aircross-1.jpg',
      description: 'Versatile blend of SUV and sedan',
      priceRange: cars.filter(c => c.bodyType === 'Crossover').length > 0
        ? `AED ${Math.min(...cars.filter(c => c.bodyType === 'Crossover').map(c => c.price)).toLocaleString()} - ${Math.max(...cars.filter(c => c.bodyType === 'Crossover').map(c => c.price)).toLocaleString()}`
        : 'Coming soon'
    },
  ]
  
  // Brands (Suzuki and Citroen only)
  const brands = [
    { name: 'Suzuki', logo: '/images/logos/suzuki.png' },
    { name: 'Citroen', logo: '/images/logos/citroen.png' },
  ]
  
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative text-white py-20 md:py-32 min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        {/* Accent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent mix-blend-overlay" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
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
      <FeaturedCarsSection 
        cars={featuredCars} 
        locale={params.locale}
        title={t.featured}
        viewAllText={t.viewAll}
      />

      {/* BROWSE BY BODY TYPE */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">{t.browseByType}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bodyTypes.map(({ type, icon, count, image, description, priceRange }) => (
              <Link 
                key={type}
                href={`/${params.locale}/buy/cars?bodyType=${type}`}
                className="relative rounded-2xl overflow-hidden h-64 group"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${image}')` }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{type}</h3>
                      <p className="text-gray-300 text-sm">{description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                    <div>
                      <p className="text-sm text-gray-300">{count} {t.available}</p>
                      <p className="font-semibold">{priceRange}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-secondary transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
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
    available: 'available',
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
    available: 'متاح',
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
