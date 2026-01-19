'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle, ChevronLeft, Car, Wrench, CreditCard, RefreshCw } from 'lucide-react'
import { getShowroomBySlug } from '@/data/locations'
import { getWhatsAppLink, getDirectionsLink } from '@/lib/utils'

const serviceIcons: Record<string, any> = {
  'Car Sales': Car,
  'Test Drives': Car,
  'Trade-in': RefreshCw,
  'Financing': CreditCard,
  'Service Center': Wrench,
  'Premium Lounge': Car,
}

export default function ShowroomDetailPage({ 
  params 
}: { 
  params: { locale: string; slug: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const showroom = getShowroomBySlug(params.slug)
  
  if (!showroom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold mb-2">{t.notFound}</h1>
          <p className="text-muted-foreground mb-6">{t.notFoundDesc}</p>
          <Link href={`/${params.locale}/locations`} className="text-secondary hover:underline">
            {t.backToLocations}
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link href={`/${params.locale}`} className="hover:text-primary">{t.home}</Link>
            <span>/</span>
            <Link href={`/${params.locale}/locations`} className="hover:text-primary">{t.locations}</Link>
            <span>/</span>
            <span className="text-primary">{isArabic ? showroom.nameAr : showroom.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Map */}
      <div className="h-[300px] md:h-[400px] relative">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${showroom.coordinates.lat},${showroom.coordinates.lng}&zoom=15`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={showroom.name}
        />
        
        {/* Back button overlay */}
        <Link
          href={`/${params.locale}/locations`}
          className="absolute top-4 left-4 bg-white shadow-lg px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t.backToLocations}
        </Link>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-3">
                    {showroom.emirate}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary">
                    {isArabic ? showroom.nameAr : showroom.name}
                  </h1>
                </div>
                <div className="bg-secondary p-4 rounded-full">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground">
                {isArabic ? showroom.addressAr : showroom.address}
              </p>
            </div>
            
            {/* Services */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">{t.services}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {showroom.services.map(service => {
                  const Icon = serviceIcons[service] || Car
                  return (
                    <div 
                      key={service}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{service}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Opening Hours */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                {t.openingHours}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">{t.satToThu}</span>
                  <span className="font-medium">{showroom.hours.weekdays}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">{t.friday}</span>
                  <span className="font-medium">{showroom.hours.friday}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">{t.saturday}</span>
                  <span className="font-medium">{showroom.hours.saturday}</span>
                </div>
              </div>
            </div>
            
            {/* Gallery Placeholder */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">{t.gallery}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div 
                    key={i}
                    className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-center text-gray-400">
                      <Car className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">{t.showroomPhoto}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {t.galleryNote}
              </p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">{t.contactUs}</h3>
              
              <div className="space-y-4 mb-6">
                <a 
                  href={`tel:${showroom.phone}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t.phone}</p>
                    <p className="font-medium">{showroom.phone}</p>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${showroom.email}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t.email}</p>
                    <p className="font-medium">{showroom.email}</p>
                  </div>
                </a>
              </div>
              
              <div className="space-y-3">
                <a
                  href={getWhatsAppLink(showroom.whatsapp, `Hi, I'd like to visit ${showroom.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.whatsapp}
                </a>
                
                <a
                  href={getDirectionsLink(showroom.coordinates.lat, showroom.coordinates.lng, showroom.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  {t.getDirections}
                </a>
                
                <Link
                  href={`/${params.locale}/buy/cars`}
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <Car className="w-5 h-5" />
                  {t.browseCars}
                </Link>
              </div>
            </div>
            
            {/* Quick Info */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white">
              <h3 className="font-bold mb-4">{t.whyVisit}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  {t.benefit1}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  {t.benefit2}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  {t.benefit3}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  {t.benefit4}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    home: 'Home',
    locations: 'Locations',
    notFound: 'Showroom Not Found',
    notFoundDesc: 'The showroom you\'re looking for doesn\'t exist.',
    backToLocations: '← All Locations',
    services: 'Available Services',
    openingHours: 'Opening Hours',
    satToThu: 'Saturday - Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    gallery: 'Showroom Gallery',
    showroomPhoto: 'Photo',
    galleryNote: 'Visit our showroom to experience our complete collection',
    contactUs: 'Contact This Location',
    phone: 'Phone',
    email: 'Email',
    whatsapp: 'WhatsApp',
    getDirections: 'Get Directions',
    browseCars: 'Browse Cars',
    whyVisit: 'Why Visit Us?',
    benefit1: 'Wide selection of certified pre-owned vehicles',
    benefit2: 'Expert sales consultants available',
    benefit3: 'Same-day test drive available',
    benefit4: 'On-site financing assistance',
  },
  ar: {
    home: 'الرئيسية',
    locations: 'الفروع',
    notFound: 'المعرض غير موجود',
    notFoundDesc: 'المعرض الذي تبحث عنه غير موجود.',
    backToLocations: '← جميع الفروع',
    services: 'الخدمات المتوفرة',
    openingHours: 'ساعات العمل',
    satToThu: 'السبت - الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    gallery: 'معرض الصور',
    showroomPhoto: 'صورة',
    galleryNote: 'قم بزيارة معرضنا لمشاهدة مجموعتنا الكاملة',
    contactUs: 'تواصل مع هذا الفرع',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    whatsapp: 'واتساب',
    getDirections: 'احصل على الاتجاهات',
    browseCars: 'تصفح السيارات',
    whyVisit: 'لماذا تزورنا؟',
    benefit1: 'مجموعة واسعة من السيارات المستعملة المعتمدة',
    benefit2: 'مستشارو مبيعات خبراء متوفرون',
    benefit3: 'تجربة قيادة في نفس اليوم متاحة',
    benefit4: 'مساعدة تمويلية في الموقع',
  }
}
