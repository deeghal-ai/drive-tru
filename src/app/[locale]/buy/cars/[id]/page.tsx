'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Heart, GitCompare, Share2, ChevronLeft, ChevronRight, 
  Fuel, Gauge, Settings, Calendar, MapPin, ShieldCheck,
  MessageCircle, CalendarCheck, Calculator
} from 'lucide-react'
import { cars, getCarById, getSimilarCars, Car } from '@/data/cars'
import { CarCard } from '@/components/cars/CarCard'
import { EMICalculator } from '@/components/forms/EMICalculator'
import { LeadCaptureModal } from '@/components/forms/LeadCaptureModal'
import { cn, formatPrice, formatMileage, calculateEMI, getWhatsAppLink, storage } from '@/lib/utils'

export default function CarDetailPage({ 
  params 
}: { 
  params: { locale: string; id: string } 
}) {
  const router = useRouter()
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const car = getCarById(params.id)
  const similarCars = car ? getSimilarCars(car, 4) : []
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showEMICalculator, setShowEMICalculator] = useState(false)
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty'>('specs')
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadModalType, setLeadModalType] = useState<'whatsapp' | 'test-drive'>('whatsapp')
  
  useEffect(() => {
    const favorites = storage.getFavorites()
    setIsFavorite(favorites.includes(params.id))
  }, [params.id])
  
  const toggleFavorite = () => {
    const favorites = storage.getFavorites()
    const updated = isFavorite 
      ? favorites.filter(f => f !== params.id)
      : [...favorites, params.id]
    storage.setFavorites(updated)
    setIsFavorite(!isFavorite)
  }
  
  const handleCompare = () => {
    const comparing = storage.getCompare()
    if (!comparing.includes(params.id) && comparing.length < 4) {
      storage.setCompare([...comparing, params.id])
      alert(t.addedToCompare)
    }
  }
  
  const openLeadModal = (type: 'whatsapp' | 'test-drive') => {
    setLeadModalType(type)
    setShowLeadModal(true)
  }
  
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
          <Link href={`/${params.locale}/buy/cars`} className="text-secondary hover:underline">
            {t.backToListing}
          </Link>
        </div>
      </div>
    )
  }
  
  const monthlyEMI = calculateEMI(car.price * 0.8, 3.99, 60)
  
  // Mock images array
  const images = car.images.length > 0 
    ? car.images 
    : Array(6).fill('https://via.placeholder.com/800x600?text=Car+Image')
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link href={`/${params.locale}`} className="hover:text-primary">{t.home}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${params.locale}/buy/cars`} className="hover:text-primary">{t.cars}</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{car.year} {car.make} {car.model}</span>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation arrows */}
                <button
                  onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : images.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(i => i < images.length - 1 ? i + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Status & Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    car.status === 'Available' ? 'bg-green-500 text-white' :
                    car.status === 'Reserved' ? 'bg-orange-500 text-white' :
                    'bg-red-500 text-white'
                  )}>
                    {car.status}
                  </span>
                  {car.certified && (
                    <span className="badge-certified">
                      <ShieldCheck className="w-4 h-4 inline mr-1" />
                      {t.certified}
                    </span>
                  )}
                </div>
                
                {/* 360° View Button (Mock) */}
                <button className="absolute bottom-4 left-4 px-4 py-2 bg-white/90 rounded-lg flex items-center gap-2 hover:bg-white">
                  <span className="text-xl">🔄</span>
                  <span className="font-medium">{t.view360}</span>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white rounded text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={cn(
                      'flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2',
                      currentImageIndex === i ? 'border-secondary' : 'border-transparent'
                    )}
                  >
                    <Image src={img} alt="" width={80} height={64} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Title & Quick Specs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <p className="text-lg text-muted-foreground">{car.variant}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    className={cn(
                      'p-3 rounded-full border',
                      isFavorite ? 'bg-red-50 border-red-200 text-secondary' : 'hover:bg-gray-50'
                    )}
                  >
                    <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
                  </button>
                  <button onClick={handleCompare} className="p-3 rounded-full border hover:bg-gray-50">
                    <GitCompare className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full border hover:bg-gray-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Quick specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Gauge className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t.mileage}</p>
                    <p className="font-semibold">{formatMileage(car.mileage)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t.fuel}</p>
                    <p className="font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t.transmission}</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t.year}</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs: Specs / Features / Warranty */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  {(['specs', 'features', 'warranty'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'flex-1 py-4 font-medium border-b-2 transition-colors',
                        activeTab === tab 
                          ? 'border-secondary text-secondary' 
                          : 'border-transparent text-muted-foreground hover:text-primary'
                      )}
                    >
                      {t[tab]}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'specs' && (
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.make}</span>
                      <span className="font-medium">{car.make}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.model}</span>
                      <span className="font-medium">{car.model}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.variant}</span>
                      <span className="font-medium">{car.variant}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.bodyType}</span>
                      <span className="font-medium">{car.bodyType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.engine}</span>
                      <span className="font-medium">{car.specs.engine}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.power}</span>
                      <span className="font-medium">{car.specs.power}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.color}</span>
                      <span className="font-medium">{car.color}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.seats}</span>
                      <span className="font-medium">{car.specs.seats}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">{t.regional}</span>
                      <span className="font-medium">{car.specs.regional}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">VIN</span>
                      <span className="font-medium font-mono text-sm">{car.vin}</span>
                    </div>
                  </div>
                )}
                
                {activeTab === 'features' && (
                  <div className="grid md:grid-cols-2 gap-3">
                    {car.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'warranty' && (
                  <div className="space-y-4">
                    {car.warranty ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">{t.warrantyIncluded}</span>
                        </div>
                        <p className="text-green-700">{car.warranty}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{t.noWarranty}</p>
                    )}
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">{t.extendedWarranty}</h4>
                      <p className="text-blue-700 text-sm">{t.extendedWarrantyDesc}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Location */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                {t.location}
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{car.showroom.name}</p>
                  <p className="text-muted-foreground text-sm">{car.showroom.address}</p>
                </div>
                <Link 
                  href={`/${params.locale}/locations/${car.showroom.slug}`}
                  className="text-secondary hover:underline text-sm"
                >
                  {t.getDirections} →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column - Price & Actions */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">{t.price}</p>
                <p className="text-3xl font-bold text-primary">{formatPrice(car.price)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.from} {formatPrice(monthlyEMI)}/{t.month}
                </p>
              </div>
              
              {/* Action buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => openLeadModal('whatsapp')}
                  className="btn-whatsapp w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.whatsapp}
                </button>
                
                <button 
                  onClick={() => openLeadModal('test-drive')}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-5 h-5" />
                  {t.bookTestDrive}
                </button>
              </div>
              
              {/* EMI Calculator Toggle */}
              <button
                onClick={() => setShowEMICalculator(!showEMICalculator)}
                className="w-full mt-4 p-4 border rounded-lg text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Calculator className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium">{t.calculateEMI}</p>
                    <p className="text-sm text-muted-foreground">{t.estimatePayments}</p>
                  </div>
                </div>
                <ChevronRight className={cn(
                  'w-5 h-5 transition-transform',
                  showEMICalculator && 'rotate-90'
                )} />
              </button>
              
              {showEMICalculator && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <EMICalculator locale={params.locale} defaultPrice={car.price} compact />
                </div>
              )}
              
              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t text-sm text-muted-foreground space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {t.freeInspection}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {t.freeDelivery}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {t.easyFinancing}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{t.similarCars}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.map(car => (
                <CarCard key={car.id} car={car} locale={params.locale} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        type={leadModalType}
        locale={params.locale}
        carInfo={{
          make: car.make,
          model: car.model,
          year: car.year,
          vin: car.vin
        }}
      />
    </div>
  )
}

const translations = {
  en: {
    home: 'Home',
    cars: 'Cars',
    notFound: 'Vehicle not found',
    backToListing: '← Back to listings',
    certified: 'Certified',
    view360: '360° View',
    mileage: 'Mileage',
    fuel: 'Fuel',
    transmission: 'Transmission',
    year: 'Year',
    specs: 'Specifications',
    features: 'Features',
    warranty: 'Warranty',
    make: 'Make',
    model: 'Model',
    variant: 'Variant',
    bodyType: 'Body Type',
    engine: 'Engine',
    power: 'Power',
    color: 'Color',
    seats: 'Seats',
    regional: 'Regional Specs',
    warrantyIncluded: 'Warranty Included',
    noWarranty: 'No warranty information available',
    extendedWarranty: 'Extended Warranty Available',
    extendedWarrantyDesc: 'Protect your investment with our comprehensive extended warranty packages.',
    location: 'Location',
    getDirections: 'Get Directions',
    price: 'Price',
    from: 'From',
    month: 'mo',
    whatsapp: 'WhatsApp',
    bookTestDrive: 'Book Test Drive',
    calculateEMI: 'Calculate EMI',
    estimatePayments: 'Estimate your monthly payments',
    freeInspection: 'Free inspection report',
    freeDelivery: 'Free delivery in UAE',
    easyFinancing: 'Easy financing options',
    similarCars: 'Similar Vehicles',
    addedToCompare: 'Added to compare list',
  },
  ar: {
    home: 'الرئيسية',
    cars: 'السيارات',
    notFound: 'السيارة غير موجودة',
    backToListing: '← العودة للقائمة',
    certified: 'معتمد',
    view360: 'عرض 360°',
    mileage: 'المسافة المقطوعة',
    fuel: 'الوقود',
    transmission: 'ناقل الحركة',
    year: 'السنة',
    specs: 'المواصفات',
    features: 'المميزات',
    warranty: 'الضمان',
    make: 'الماركة',
    model: 'الموديل',
    variant: 'الفئة',
    bodyType: 'نوع الهيكل',
    engine: 'المحرك',
    power: 'القوة',
    color: 'اللون',
    seats: 'المقاعد',
    regional: 'المواصفات الإقليمية',
    warrantyIncluded: 'الضمان متضمن',
    noWarranty: 'لا توجد معلومات عن الضمان',
    extendedWarranty: 'ضمان ممتد متاح',
    extendedWarrantyDesc: 'احمِ استثمارك مع باقات الضمان الممتد الشاملة.',
    location: 'الموقع',
    getDirections: 'احصل على الاتجاهات',
    price: 'السعر',
    from: 'من',
    month: 'شهرياً',
    whatsapp: 'واتساب',
    bookTestDrive: 'حجز تجربة قيادة',
    calculateEMI: 'حساب القسط',
    estimatePayments: 'قدّر أقساطك الشهرية',
    freeInspection: 'تقرير فحص مجاني',
    freeDelivery: 'توصيل مجاني في الإمارات',
    easyFinancing: 'خيارات تمويل سهلة',
    similarCars: 'سيارات مشابهة',
    addedToCompare: 'تمت الإضافة للمقارنة',
  }
}
