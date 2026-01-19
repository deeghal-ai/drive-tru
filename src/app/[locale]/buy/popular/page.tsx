// Popular Models Page - Drive Tru
import Link from 'next/link'
import { cars } from '@/data/cars'
import { ArrowRight, Star, TrendingUp } from 'lucide-react'

export default function PopularModelsPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  // Aggregate cars by model
  const modelCounts = cars.reduce((acc, car) => {
    const key = `${car.make}-${car.model}`
    if (!acc[key]) {
      acc[key] = {
        make: car.make,
        model: car.model,
        count: 0,
        minPrice: car.price,
        maxPrice: car.price,
        image: car.images[0],
        available: 0
      }
    }
    acc[key].count++
    if (car.status === 'Available') acc[key].available++
    acc[key].minPrice = Math.min(acc[key].minPrice, car.price)
    acc[key].maxPrice = Math.max(acc[key].maxPrice, car.price)
    return acc
  }, {} as Record<string, { make: string; model: string; count: number; minPrice: number; maxPrice: number; image: string; available: number }>)
  
  const popularModels = Object.values(modelCounts).sort((a, b) => b.count - a.count)
  
  // Separate by brand
  const suzukiModels = popularModels.filter(m => m.make === 'Suzuki')
  const citroenModels = popularModels.filter(m => m.make === 'Citroen')
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{t.pageTitle}</h1>
              <p className="text-gray-300 mt-1">{t.pageSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Top Picks */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold">{t.topPicks}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularModels.slice(0, 4).map((model, i) => (
              <Link 
                key={`${model.make}-${model.model}`}
                href={`/${params.locale}/buy/cars?make=${model.make}&model=${model.model}`}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-10 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                  #{i + 1}
                </div>
                
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={model.image}
                    alt={`${model.make} ${model.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-5">
                  <div className="text-xs text-secondary font-semibold mb-1">{model.make}</div>
                  <h3 className="text-xl font-bold mb-2">{model.model}</h3>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {model.available} {t.available}
                    </span>
                    <span className="font-semibold text-primary">
                      {t.from} AED {model.minPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex items-center text-secondary font-medium group-hover:gap-2 transition-all">
                    <span>{t.viewCars}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Suzuki Models */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">S</span>
              </div>
              <h2 className="text-2xl font-bold">{t.suzukiModels}</h2>
            </div>
            <Link 
              href={`/${params.locale}/buy/cars?make=Suzuki`}
              className="text-secondary font-medium hover:underline flex items-center gap-1"
            >
              {t.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suzukiModels.map(model => (
              <Link 
                key={`${model.make}-${model.model}`}
                href={`/${params.locale}/buy/cars?make=${model.make}&model=${model.model}`}
                className="group bg-white rounded-xl border p-4 flex gap-4 hover:border-secondary hover:shadow-md transition-all"
              >
                <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={model.image}
                    alt={`${model.make} ${model.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{model.model}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {model.count} {t.cars} • {model.available} {t.available}
                  </div>
                  <div className="text-sm font-semibold text-secondary mt-2">
                    AED {model.minPrice.toLocaleString()} - {model.maxPrice.toLocaleString()}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary mt-2 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
        
        {/* Citroen Models */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">C</span>
              </div>
              <h2 className="text-2xl font-bold">{t.citroenModels}</h2>
            </div>
            <Link 
              href={`/${params.locale}/buy/cars?make=Citroen`}
              className="text-secondary font-medium hover:underline flex items-center gap-1"
            >
              {t.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citroenModels.map(model => (
              <Link 
                key={`${model.make}-${model.model}`}
                href={`/${params.locale}/buy/cars?make=${model.make}&model=${model.model}`}
                className="group bg-white rounded-xl border p-4 flex gap-4 hover:border-secondary hover:shadow-md transition-all"
              >
                <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={model.image}
                    alt={`${model.make} ${model.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{model.model}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {model.count} {t.cars} • {model.available} {t.available}
                  </div>
                  <div className="text-sm font-semibold text-secondary mt-2">
                    AED {model.minPrice.toLocaleString()} - {model.maxPrice.toLocaleString()}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary mt-2 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">{t.ctaDesc}</p>
          <Link 
            href={`/${params.locale}/buy/cars`}
            className="btn-secondary inline-flex items-center gap-2"
          >
            {t.browseAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Popular Models',
    pageSubtitle: 'Browse our most sought-after pre-owned vehicles',
    topPicks: 'Top Picks This Month',
    available: 'available',
    from: 'From',
    viewCars: 'View Cars',
    suzukiModels: 'Suzuki Models',
    citroenModels: 'Citroën Models',
    viewAll: 'View All',
    cars: 'cars',
    ctaTitle: 'Can\'t Find What You\'re Looking For?',
    ctaDesc: 'Browse our complete inventory with advanced filters to find your perfect match.',
    browseAll: 'Browse All Cars',
  },
  ar: {
    pageTitle: 'الموديلات الشائعة',
    pageSubtitle: 'تصفح أكثر السيارات المستعملة طلباً',
    topPicks: 'أفضل الاختيارات هذا الشهر',
    available: 'متوفر',
    from: 'من',
    viewCars: 'عرض السيارات',
    suzukiModels: 'موديلات سوزوكي',
    citroenModels: 'موديلات سيتروين',
    viewAll: 'عرض الكل',
    cars: 'سيارة',
    ctaTitle: 'لم تجد ما تبحث عنه؟',
    ctaDesc: 'تصفح مخزوننا الكامل مع فلاتر متقدمة للعثور على سيارتك المثالية.',
    browseAll: 'تصفح جميع السيارات',
  }
}
