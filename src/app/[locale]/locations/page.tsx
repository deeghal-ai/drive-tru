'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Clock, Navigation, MessageCircle, ChevronRight } from 'lucide-react'
import { showrooms, Showroom } from '@/data/locations'
import { cn, getWhatsAppLink, getDirectionsLink } from '@/lib/utils'

export default function LocationsPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [selectedEmirate, setSelectedEmirate] = useState<string | null>(null)
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom | null>(showrooms[0])
  
  const emirates = [...new Set(showrooms.map(s => s.emirate))]
  
  const filteredShowrooms = selectedEmirate 
    ? showrooms.filter(s => s.emirate === selectedEmirate)
    : showrooms
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.pageTitle}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t.pageSubtitle}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Emirate Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedEmirate(null)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedEmirate === null 
                ? 'bg-primary text-white' 
                : 'bg-white border hover:border-primary'
            )}
          >
            {t.allLocations}
          </button>
          {emirates.map(emirate => (
            <button
              key={emirate}
              onClick={() => setSelectedEmirate(emirate)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                selectedEmirate === emirate 
                  ? 'bg-primary text-white' 
                  : 'bg-white border hover:border-primary'
              )}
            >
              {emirate}
            </button>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[500px] lg:sticky lg:top-24">
            {selectedShowroom ? (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${selectedShowroom.coordinates.lat},${selectedShowroom.coordinates.lng}&zoom=14`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={selectedShowroom.name}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>{t.selectLocation}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Showroom Cards */}
          <div className="space-y-4">
            {filteredShowrooms.map(showroom => (
              <div 
                key={showroom.id}
                onClick={() => setSelectedShowroom(showroom)}
                className={cn(
                  'bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all',
                  selectedShowroom?.id === showroom.id 
                    ? 'ring-2 ring-secondary' 
                    : 'hover:shadow-md'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {isArabic ? showroom.nameAr : showroom.name}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {showroom.emirate}
                    </span>
                  </div>
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{isArabic ? showroom.addressAr : showroom.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <a href={`tel:${showroom.phone}`} className="hover:text-primary">
                      {showroom.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{t.weekdays}: {showroom.hours.weekdays}</p>
                      <p>{t.friday}: {showroom.hours.friday}</p>
                      <p>{t.saturday}: {showroom.hours.saturday}</p>
                    </div>
                  </div>
                </div>
                
                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {showroom.services.map(service => (
                    <span 
                      key={service}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <a
                    href={getDirectionsLink(showroom.coordinates.lat, showroom.coordinates.lng, showroom.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    {t.getDirections}
                  </a>
                  <a
                    href={getWhatsAppLink(showroom.whatsapp, `Hi, I'd like to visit ${showroom.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.whatsapp}
                  </a>
                  <Link
                    href={`/${params.locale}/locations/${showroom.slug}`}
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    {t.viewDetails}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
            
            {filteredShowrooms.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t.noLocations}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${params.locale}/buy/cars`}
              className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {t.browseCars}
            </Link>
            <Link
              href={`/${params.locale}/tools/contact`}
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Our Showrooms',
    pageSubtitle: 'Visit us at one of our convenient locations across the UAE. Our team is ready to help you find your perfect car.',
    allLocations: 'All Locations',
    selectLocation: 'Select a location to view on map',
    weekdays: 'Sat-Thu',
    friday: 'Friday',
    saturday: 'Saturday',
    getDirections: 'Get Directions',
    whatsapp: 'WhatsApp',
    viewDetails: 'View Details',
    noLocations: 'No locations found in this area',
    ctaTitle: 'Ready to Find Your Dream Car?',
    ctaSubtitle: 'Browse our extensive collection of certified pre-owned vehicles or contact us for personalized assistance.',
    browseCars: 'Browse Cars',
    contactUs: 'Contact Us',
  },
  ar: {
    pageTitle: 'فروعنا',
    pageSubtitle: 'قم بزيارتنا في أحد فروعنا المنتشرة في الإمارات. فريقنا جاهز لمساعدتك في إيجاد سيارتك المثالية.',
    allLocations: 'جميع الفروع',
    selectLocation: 'اختر موقعاً لعرضه على الخريطة',
    weekdays: 'السبت-الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    getDirections: 'احصل على الاتجاهات',
    whatsapp: 'واتساب',
    viewDetails: 'عرض التفاصيل',
    noLocations: 'لا توجد فروع في هذه المنطقة',
    ctaTitle: 'مستعد لإيجاد سيارة أحلامك؟',
    ctaSubtitle: 'تصفح مجموعتنا الواسعة من السيارات المستعملة المعتمدة أو تواصل معنا للحصول على مساعدة شخصية.',
    browseCars: 'تصفح السيارات',
    contactUs: 'اتصل بنا',
  }
}
