'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, GitCompare, Trash2, X, ChevronRight, Car, ShoppingBag } from 'lucide-react'
import { cars, Car as CarType } from '@/data/cars'
import { CarCard } from '@/components/cars/CarCard'
import { cn, formatPrice, formatMileage, storage } from '@/lib/utils'

type Tab = 'favorites' | 'compare'

function MyGarageContent({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const searchParams = useSearchParams()
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [activeTab, setActiveTab] = useState<Tab>(
    searchParams.get('tab') === 'compare' ? 'compare' : 'favorites'
  )
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [compareIds, setCompareIds] = useState<string[]>([])
  
  useEffect(() => {
    // Function to load data from storage
    const loadData = () => {
      setFavoriteIds(storage.getFavorites())
      setCompareIds(storage.getCompare())
    }
    
    // Initial load
    loadData()
    
    // Listen for custom events from other pages
    window.addEventListener('favorites-updated', loadData)
    window.addEventListener('compare-updated', loadData)
    window.addEventListener('storage', loadData)
    
    return () => {
      window.removeEventListener('favorites-updated', loadData)
      window.removeEventListener('compare-updated', loadData)
      window.removeEventListener('storage', loadData)
    }
  }, [])
  
  const favoriteCars = cars.filter(car => favoriteIds.includes(car.id))
  const compareCars = cars.filter(car => compareIds.includes(car.id))
  
  const removeFavorite = (id: string) => {
    const updated = favoriteIds.filter(f => f !== id)
    setFavoriteIds(updated)
    storage.setFavorites(updated)
    window.dispatchEvent(new CustomEvent('favorites-updated'))
  }
  
  const removeFromCompare = (id: string) => {
    const updated = compareIds.filter(c => c !== id)
    setCompareIds(updated)
    storage.setCompare(updated)
    window.dispatchEvent(new CustomEvent('compare-updated'))
  }
  
  const clearAllFavorites = () => {
    setFavoriteIds([])
    storage.setFavorites([])
    window.dispatchEvent(new CustomEvent('favorites-updated'))
  }
  
  const clearAllCompare = () => {
    setCompareIds([])
    storage.setCompare([])
    window.dispatchEvent(new CustomEvent('compare-updated'))
  }
  
  // Comparison specs to show
  const comparisonSpecs = [
    { key: 'price', label: t.price, format: (car: CarType) => formatPrice(car.price) },
    { key: 'year', label: t.year, format: (car: CarType) => car.year.toString() },
    { key: 'mileage', label: t.mileage, format: (car: CarType) => formatMileage(car.mileage) },
    { key: 'fuelType', label: t.fuelType, format: (car: CarType) => car.fuelType },
    { key: 'transmission', label: t.transmission, format: (car: CarType) => car.transmission },
    { key: 'bodyType', label: t.bodyType, format: (car: CarType) => car.bodyType },
    { key: 'engine', label: t.engine, format: (car: CarType) => car.specs.engine },
    { key: 'power', label: t.power, format: (car: CarType) => car.specs.power },
    { key: 'seats', label: t.seats, format: (car: CarType) => car.specs.seats.toString() },
    { key: 'color', label: t.color, format: (car: CarType) => car.color },
    { key: 'certified', label: t.certified, format: (car: CarType) => car.certified ? '✓ Yes' : '✗ No' },
    { key: 'warranty', label: t.warranty, format: (car: CarType) => car.warranty ? '✓ Yes' : '✗ No' },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.pageTitle}</h1>
          <p className="text-gray-300 text-lg">{t.pageSubtitle}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('favorites')}
              className={cn(
                'flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium border-b-2 transition-colors',
                activeTab === 'favorites' 
                  ? 'border-secondary text-secondary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <Heart className={cn('w-5 h-5', activeTab === 'favorites' && 'fill-current')} />
              {t.favorites}
              {favoriteIds.length > 0 && (
                <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-sm">
                  {favoriteIds.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={cn(
                'flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium border-b-2 transition-colors',
                activeTab === 'compare' 
                  ? 'border-secondary text-secondary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <GitCompare className="w-5 h-5" />
              {t.compare}
              {compareIds.length > 0 && (
                <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-sm">
                  {compareIds.length}/4
                </span>
              )}
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <>
                {favoriteCars.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-muted-foreground">
                        {favoriteCars.length} {t.savedVehicles}
                      </p>
                      <button
                        onClick={clearAllFavorites}
                        className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t.clearAll}
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {favoriteCars.map(car => (
                        <div key={car.id} className="relative">
                          <button
                            onClick={() => removeFavorite(car.id)}
                            className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                          <CarCard car={car} locale={params.locale} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <EmptyState
                    icon={Heart}
                    title={t.noFavorites}
                    description={t.noFavoritesDesc}
                    actionLabel={t.browseCars}
                    actionHref={`/${params.locale}/buy/cars`}
                  />
                )}
              </>
            )}
            
            {/* Compare Tab */}
            {activeTab === 'compare' && (
              <>
                {compareCars.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-muted-foreground">
                        {t.comparing} {compareCars.length} {t.vehicles}
                      </p>
                      <button
                        onClick={clearAllCompare}
                        className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t.clearAll}
                      </button>
                    </div>
                    
                    {/* Comparison Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr>
                            <th className="text-left p-4 bg-gray-50 font-medium text-muted-foreground w-40">
                              {t.specification}
                            </th>
                            {compareCars.map(car => (
                              <th key={car.id} className="p-4 bg-gray-50 min-w-[200px]">
                                <div className="relative">
                                  <button
                                    onClick={() => removeFromCompare(car.id)}
                                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow border hover:bg-red-50"
                                  >
                                    <X className="w-3 h-3 text-red-500" />
                                  </button>
                                  <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-3 overflow-hidden">
                                    {car.images[0] ? (
                                      <Image
                                        src={car.images[0]}
                                        alt={`${car.make} ${car.model}`}
                                        width={200}
                                        height={150}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Car className="w-8 h-8 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  <Link 
                                    href={`/${params.locale}/buy/cars/${car.id}`}
                                    className="font-semibold hover:text-secondary transition-colors"
                                  >
                                    {car.year} {car.make} {car.model}
                                  </Link>
                                  <p className="text-sm text-muted-foreground">{car.variant}</p>
                                </div>
                              </th>
                            ))}
                            {/* Empty slots */}
                            {Array.from({ length: 4 - compareCars.length }).map((_, i) => (
                              <th key={`empty-${i}`} className="p-4 bg-gray-50 min-w-[200px]">
                                <Link
                                  href={`/${params.locale}/buy/cars`}
                                  className="block aspect-[4/3] border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground hover:border-secondary hover:text-secondary transition-colors"
                                >
                                  <div className="text-center">
                                    <GitCompare className="w-8 h-8 mx-auto mb-2" />
                                    <span className="text-sm">{t.addCar}</span>
                                  </div>
                                </Link>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonSpecs.map((spec, index) => (
                            <tr key={spec.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="p-4 font-medium text-muted-foreground">
                                {spec.label}
                              </td>
                              {compareCars.map(car => (
                                <td key={car.id} className="p-4 text-center font-medium">
                                  {spec.format(car)}
                                </td>
                              ))}
                              {Array.from({ length: 4 - compareCars.length }).map((_, i) => (
                                <td key={`empty-${i}`} className="p-4 text-center text-gray-300">
                                  —
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <EmptyState
                    icon={GitCompare}
                    title={t.noCompare}
                    description={t.noCompareDesc}
                    actionLabel={t.browseCars}
                    actionHref={`/${params.locale}/buy/cars`}
                  />
                )}
              </>
            )}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-secondary to-pink-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <Link
            href={`/${params.locale}/buy/cars`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {t.exploreCars}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: any
  title: string
  description: string
  actionLabel: string
  actionHref: string
}) {
  return (
    <div className="py-16 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      <Link
        href={actionHref}
        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors"
      >
        {actionLabel}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'My Garage',
    pageSubtitle: 'Your saved vehicles and comparisons in one place',
    favorites: 'Favorites',
    compare: 'Compare',
    savedVehicles: 'saved vehicles',
    clearAll: 'Clear All',
    noFavorites: 'No Favorites Yet',
    noFavoritesDesc: 'Start adding vehicles to your favorites by clicking the heart icon on any car listing.',
    browseCars: 'Browse Cars',
    comparing: 'Comparing',
    vehicles: 'vehicles',
    noCompare: 'No Cars to Compare',
    noCompareDesc: 'Add up to 4 vehicles to compare their specifications side by side.',
    specification: 'Specification',
    addCar: 'Add Car',
    price: 'Price',
    year: 'Year',
    mileage: 'Mileage',
    fuelType: 'Fuel Type',
    transmission: 'Transmission',
    bodyType: 'Body Type',
    engine: 'Engine',
    power: 'Power',
    seats: 'Seats',
    color: 'Color',
    certified: 'Certified',
    warranty: 'Warranty',
    ctaTitle: 'Find Your Next Car',
    ctaSubtitle: 'Discover our wide selection of certified pre-owned vehicles at competitive prices.',
    exploreCars: 'Explore All Cars',
  },
  ar: {
    pageTitle: 'مرآبي',
    pageSubtitle: 'سياراتك المحفوظة والمقارنات في مكان واحد',
    favorites: 'المفضلة',
    compare: 'مقارنة',
    savedVehicles: 'سيارات محفوظة',
    clearAll: 'مسح الكل',
    noFavorites: 'لا توجد مفضلات بعد',
    noFavoritesDesc: 'ابدأ بإضافة السيارات إلى مفضلاتك بالنقر على أيقونة القلب في أي قائمة سيارات.',
    browseCars: 'تصفح السيارات',
    comparing: 'مقارنة',
    vehicles: 'سيارات',
    noCompare: 'لا توجد سيارات للمقارنة',
    noCompareDesc: 'أضف حتى 4 سيارات لمقارنة مواصفاتها جنباً إلى جنب.',
    specification: 'المواصفة',
    addCar: 'أضف سيارة',
    price: 'السعر',
    year: 'السنة',
    mileage: 'المسافة المقطوعة',
    fuelType: 'نوع الوقود',
    transmission: 'ناقل الحركة',
    bodyType: 'نوع الهيكل',
    engine: 'المحرك',
    power: 'القوة',
    seats: 'المقاعد',
    color: 'اللون',
    certified: 'معتمد',
    warranty: 'الضمان',
    ctaTitle: 'اعثر على سيارتك القادمة',
    ctaSubtitle: 'اكتشف مجموعتنا الواسعة من السيارات المستعملة المعتمدة بأسعار تنافسية.',
    exploreCars: 'استكشف جميع السيارات',
  }
}

export default function MyGaragePage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>}>
      <MyGarageContent params={params} />
    </Suspense>
  )
}
