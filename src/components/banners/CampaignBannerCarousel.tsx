'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CampaignBanner } from '@/data/banners'
import { cn } from '@/lib/utils'

interface CampaignBannerCarouselProps {
  banners: CampaignBanner[]
  locale: string
  autoPlayInterval?: number
}

export function CampaignBannerCarousel({ 
  banners, 
  locale,
  autoPlayInterval = 5000 
}: CampaignBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isArabic = locale === 'ar'
  
  // Auto-advance slides
  useEffect(() => {
    if (isPaused || banners.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, autoPlayInterval)
    
    return () => clearInterval(interval)
  }, [isPaused, banners.length, autoPlayInterval])
  
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])
  
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [banners.length])
  
  if (banners.length === 0) {
    return null
  }
  
  const currentBanner = banners[currentIndex]
  
  return (
    <section 
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              'absolute inset-0 w-full h-full transition-opacity duration-700',
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${banner.image}')` }}
            />
            
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className={cn(
                'max-w-2xl text-white space-y-4',
                isArabic ? 'text-right mr-auto' : 'text-left'
              )}>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight animate-fade-in">
                  {isArabic ? banner.titleAr : banner.titleEn}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 animate-fade-in animation-delay-200">
                  {isArabic ? banner.subtitleAr : banner.subtitleEn}
                </p>
                <Link
                  href={banner.ctaLink}
                  className="inline-block px-8 py-3 md:px-10 md:py-4 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg animate-fade-in animation-delay-400"
                >
                  {isArabic ? banner.ctaTextAr : banner.ctaTextEn}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all transform hover:scale-110',
              isArabic ? 'right-4' : 'left-4'
            )}
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all transform hover:scale-110',
              isArabic ? 'left-4' : 'right-4'
            )}
            aria-label="Next banner"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}
      
      {/* Dot Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all',
                index === currentIndex 
                  ? 'bg-white w-8 md:w-12' 
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
