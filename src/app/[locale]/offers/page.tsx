'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tag, Calendar, ChevronRight, Percent, RefreshCw, Sparkles, Car, Filter } from 'lucide-react'
import { offers, Offer } from '@/data/offers'
import { cn } from '@/lib/utils'

type OfferType = 'All' | 'Financing' | 'Trade-in' | 'Seasonal' | 'Brand'

const typeIcons: Record<string, any> = {
  'Financing': Percent,
  'Trade-in': RefreshCw,
  'Seasonal': Sparkles,
  'Brand': Car,
}

const typeColors: Record<string, string> = {
  'Financing': 'bg-blue-100 text-blue-700',
  'Trade-in': 'bg-green-100 text-green-700',
  'Seasonal': 'bg-orange-100 text-orange-700',
  'Brand': 'bg-purple-100 text-purple-700',
}

export default function OffersPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [activeFilter, setActiveFilter] = useState<OfferType>('All')
  
  const filterTypes: OfferType[] = ['All', 'Financing', 'Trade-in', 'Seasonal', 'Brand']
  
  const filteredOffers = activeFilter === 'All' 
    ? offers 
    : offers.filter(o => o.type === activeFilter)
  
  const featuredOffers = offers.filter(o => o.featured)
  const regularOffers = filteredOffers.filter(o => !o.featured)
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(isArabic ? 'ar-AE' : 'en-AE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-pink-600 to-secondary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-xl opacity-90 mb-8">
              {t.pageSubtitle}
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Offers */}
      {featuredOffers.length > 0 && (
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-secondary" />
              {t.featuredOffers}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {featuredOffers.map(offer => (
                <OfferCard 
                  key={offer.id} 
                  offer={offer} 
                  locale={params.locale}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Offers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {filterTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeFilter === type 
                    ? 'bg-primary text-white' 
                    : 'bg-white border hover:border-primary'
                )}
              >
                {type === 'All' ? t.all : type}
              </button>
            ))}
          </div>
          
          {/* Offers Grid */}
          {regularOffers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularOffers.map(offer => (
                <OfferCard 
                  key={offer.id} 
                  offer={offer} 
                  locale={params.locale}
                />
              ))}
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center">
              <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">{t.noOffers}</h3>
              <p className="text-muted-foreground mb-6">{t.noOffersDesc}</p>
              <button 
                onClick={() => setActiveFilter('All')}
                className="text-secondary hover:underline"
              >
                {t.viewAll}
              </button>
            </div>
          ) : null}
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.newsletterTitle}</h2>
            <p className="text-gray-300 mb-8">{t.newsletterSubtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                {t.subscribe}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">{t.privacyNote}</p>
          </div>
        </div>
      </section>
      
      {/* Browse CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{t.ctaTitle}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaSubtitle}</p>
          <Link
            href={`/${params.locale}/buy/cars`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
          >
            {t.browseCars}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function OfferCard({ 
  offer, 
  locale, 
  featured = false 
}: { 
  offer: Offer
  locale: string
  featured?: boolean 
}) {
  const isArabic = locale === 'ar'
  const Icon = typeIcons[offer.type] || Tag
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(isArabic ? 'ar-AE' : 'en-AE', {
      day: 'numeric',
      month: 'short'
    })
  }
  
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow',
      featured && 'ring-2 ring-secondary'
    )}>
      {/* Image/Banner */}
      <div className={cn(
        'relative h-48 flex items-center justify-center',
        offer.type === 'Financing' && 'bg-gradient-to-br from-blue-500 to-blue-700',
        offer.type === 'Trade-in' && 'bg-gradient-to-br from-green-500 to-green-700',
        offer.type === 'Seasonal' && 'bg-gradient-to-br from-orange-500 to-red-600',
        offer.type === 'Brand' && 'bg-gradient-to-br from-purple-500 to-purple-700',
      )}>
        <Icon className="w-16 h-16 text-white/30 absolute" />
        <div className="relative text-center text-white px-6">
          <h3 className="text-xl font-bold">
            {isArabic ? offer.titleAr : offer.title}
          </h3>
        </div>
        
        {featured && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        )}
        
        <div className={cn(
          'absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium',
          typeColors[offer.type]
        )}>
          {offer.type}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-muted-foreground mb-4">
          {isArabic ? offer.descriptionAr : offer.description}
        </p>
        
        {/* Validity */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span>
            {isArabic ? 'صالح حتى' : 'Valid until'} {formatDate(offer.validUntil)}
          </span>
        </div>
        
        {/* Terms Preview */}
        {offer.terms.length > 0 && (
          <div className="text-xs text-muted-foreground mb-4 space-y-1">
            {offer.terms.slice(0, 2).map((term, i) => (
              <p key={i}>• {term}</p>
            ))}
          </div>
        )}
        
        {/* CTA */}
        <Link
          href={`/${locale}${offer.cta.link}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
        >
          {isArabic ? offer.cta.textAr : offer.cta.text}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Special Offers & Promotions',
    pageSubtitle: 'Discover exclusive deals on certified pre-owned vehicles, financing options, and trade-in bonuses.',
    featuredOffers: 'Featured Offers',
    all: 'All Offers',
    noOffers: 'No Offers Found',
    noOffersDesc: 'There are no offers in this category at the moment.',
    viewAll: 'View All Offers',
    newsletterTitle: 'Never Miss a Deal',
    newsletterSubtitle: 'Subscribe to get exclusive offers and updates delivered to your inbox.',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    privacyNote: 'We respect your privacy. Unsubscribe at any time.',
    ctaTitle: 'Ready to Find Your Perfect Car?',
    ctaSubtitle: 'Browse our collection of certified pre-owned vehicles and take advantage of our special offers.',
    browseCars: 'Browse Cars',
  },
  ar: {
    pageTitle: 'العروض والترويجات الخاصة',
    pageSubtitle: 'اكتشف صفقات حصرية على السيارات المستعملة المعتمدة وخيارات التمويل ومكافآت الاستبدال.',
    featuredOffers: 'العروض المميزة',
    all: 'جميع العروض',
    noOffers: 'لا توجد عروض',
    noOffersDesc: 'لا توجد عروض في هذه الفئة حالياً.',
    viewAll: 'عرض جميع العروض',
    newsletterTitle: 'لا تفوت أي صفقة',
    newsletterSubtitle: 'اشترك للحصول على عروض حصرية وتحديثات في بريدك الإلكتروني.',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشترك',
    privacyNote: 'نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
    ctaTitle: 'مستعد لإيجاد سيارتك المثالية؟',
    ctaSubtitle: 'تصفح مجموعتنا من السيارات المستعملة المعتمدة واستفد من عروضنا الخاصة.',
    browseCars: 'تصفح السيارات',
  }
}
