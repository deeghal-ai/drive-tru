// Body Types Page - Drive Tru
import Link from 'next/link'
import { cars } from '@/data/cars'
import { ArrowRight, Car } from 'lucide-react'

export default function BodyTypesPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  // Body type data with icons and images
  const bodyTypes = [
    { 
      type: 'SUV', 
      icon: '🚙', 
      description: t.suvDesc,
      image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=800',
      featured: true
    },
    { 
      type: 'Sedan', 
      icon: '🚗', 
      description: t.sedanDesc,
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
      featured: true
    },
    { 
      type: 'Hatchback', 
      icon: '🚘', 
      description: t.hatchbackDesc,
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
      featured: true
    },
    { 
      type: 'Crossover', 
      icon: '🚐', 
      description: t.crossoverDesc,
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      featured: true
    },
  ]
  
  // Get counts and price ranges
  const bodyTypeStats = bodyTypes.map(bt => {
    const typeCars = cars.filter(c => c.bodyType === bt.type)
    const availableCars = typeCars.filter(c => c.status === 'Available')
    return {
      ...bt,
      count: typeCars.length,
      available: availableCars.length,
      minPrice: typeCars.length > 0 ? Math.min(...typeCars.map(c => c.price)) : 0,
      maxPrice: typeCars.length > 0 ? Math.max(...typeCars.map(c => c.price)) : 0,
      samples: availableCars.slice(0, 3)
    }
  })
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center">
              <Car className="w-7 h-7" />
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
        {/* Featured Body Types Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {bodyTypeStats.filter(bt => bt.featured).map((bodyType) => (
            <Link 
              key={bodyType.type}
              href={`/${params.locale}/buy/cars?bodyType=${bodyType.type}`}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Background Image */}
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={bodyType.image}
                  alt={bodyType.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{bodyType.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{bodyType.type}</h2>
                    <p className="text-sm text-gray-300">{bodyType.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-sm text-gray-300">{bodyType.available} {t.available}</div>
                    <div className="font-semibold">
                      AED {bodyType.minPrice.toLocaleString()} - {bodyType.maxPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Detailed Sections */}
        {bodyTypeStats.map((bodyType) => (
          <div key={bodyType.type} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{bodyType.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{bodyType.type}</h2>
                  <p className="text-sm text-muted-foreground">{bodyType.count} {t.totalCars} • {bodyType.available} {t.available}</p>
                </div>
              </div>
              <Link 
                href={`/${params.locale}/buy/cars?bodyType=${bodyType.type}`}
                className="btn-secondary"
              >
                {t.viewAll} {bodyType.type} <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
            </div>
            
            {/* Sample Cars */}
            {bodyType.samples.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {bodyType.samples.map(car => (
                  <Link 
                    key={car.id}
                    href={`/${params.locale}/buy/cars/${car.id}`}
                    className="group bg-white rounded-xl border overflow-hidden hover:border-secondary hover:shadow-md transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={car.images[0]}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{car.year} {car.make} {car.model}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {car.mileage.toLocaleString()} km • {car.transmission}
                      </div>
                      <div className="text-lg font-bold text-secondary mt-2">
                        AED {car.price.toLocaleString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-xl p-8 text-center text-muted-foreground">
                {t.noCars}
              </div>
            )}
          </div>
        ))}
        
        {/* Comparison Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">{t.comparisonTitle}</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">{t.feature}</th>
                  {bodyTypeStats.map(bt => (
                    <th key={bt.type} className="text-center py-4 px-4">
                      <span className="text-2xl">{bt.icon}</span>
                      <div className="font-medium mt-1">{bt.type}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4 font-medium">{t.priceRange}</td>
                  {bodyTypeStats.map(bt => (
                    <td key={bt.type} className="text-center py-4 px-4 text-sm">
                      {bt.minPrice > 0 
                        ? `${(bt.minPrice / 1000).toFixed(0)}K - ${(bt.maxPrice / 1000).toFixed(0)}K`
                        : '-'
                      }
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-medium">{t.spaceComfort}</td>
                  <td className="text-center py-4 px-4">★★★★★</td>
                  <td className="text-center py-4 px-4">★★★★☆</td>
                  <td className="text-center py-4 px-4">★★★☆☆</td>
                  <td className="text-center py-4 px-4">★★★★☆</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-medium">{t.fuelEfficiency}</td>
                  <td className="text-center py-4 px-4">★★★☆☆</td>
                  <td className="text-center py-4 px-4">★★★★☆</td>
                  <td className="text-center py-4 px-4">★★★★★</td>
                  <td className="text-center py-4 px-4">★★★★☆</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-medium">{t.familyFriendly}</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">{t.cityDriving}</td>
                  <td className="text-center py-4 px-4">★★★☆☆</td>
                  <td className="text-center py-4 px-4">★★★★☆</td>
                  <td className="text-center py-4 px-4">★★★★★</td>
                  <td className="text-center py-4 px-4">★★★★☆</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-secondary to-pink-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${params.locale}/buy/cars`}
              className="btn-primary bg-white text-secondary hover:bg-gray-100"
            >
              {t.browseAll}
            </Link>
            <Link 
              href={`/${params.locale}/tools/contact`}
              className="btn-outline text-white border-white hover:bg-white hover:text-secondary"
            >
              {t.getHelp}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Browse by Body Type',
    pageSubtitle: 'Find the perfect style for your lifestyle',
    suvDesc: 'Spacious and powerful for any adventure',
    sedanDesc: 'Classic comfort and efficiency',
    hatchbackDesc: 'Compact and practical for city life',
    crossoverDesc: 'Versatile blend of SUV and sedan',
    available: 'available',
    totalCars: 'total cars',
    viewAll: 'View All',
    noCars: 'No cars available in this category',
    comparisonTitle: 'Body Type Comparison',
    feature: 'Feature',
    priceRange: 'Price Range (AED)',
    spaceComfort: 'Space & Comfort',
    fuelEfficiency: 'Fuel Efficiency',
    familyFriendly: 'Family Friendly',
    cityDriving: 'City Driving',
    ctaTitle: 'Need Help Choosing?',
    ctaDesc: 'Our team can help you find the perfect body type for your needs.',
    browseAll: 'Browse All Cars',
    getHelp: 'Get Expert Help',
  },
  ar: {
    pageTitle: 'تصفح حسب نوع الهيكل',
    pageSubtitle: 'اعثر على الطراز المثالي لأسلوب حياتك',
    suvDesc: 'فسيحة وقوية لأي مغامرة',
    sedanDesc: 'راحة كلاسيكية وكفاءة',
    hatchbackDesc: 'مدمجة وعملية للحياة في المدينة',
    crossoverDesc: 'مزيج متعدد الاستخدامات من SUV والسيدان',
    available: 'متوفر',
    totalCars: 'إجمالي السيارات',
    viewAll: 'عرض الكل',
    noCars: 'لا توجد سيارات متاحة في هذه الفئة',
    comparisonTitle: 'مقارنة أنواع الهيكل',
    feature: 'الميزة',
    priceRange: 'نطاق السعر (درهم)',
    spaceComfort: 'المساحة والراحة',
    fuelEfficiency: 'كفاءة الوقود',
    familyFriendly: 'مناسب للعائلة',
    cityDriving: 'القيادة في المدينة',
    ctaTitle: 'تحتاج مساعدة في الاختيار؟',
    ctaDesc: 'يمكن لفريقنا مساعدتك في العثور على نوع الهيكل المثالي لاحتياجاتك.',
    browseAll: 'تصفح جميع السيارات',
    getHelp: 'احصل على مساعدة خبير',
  }
}
