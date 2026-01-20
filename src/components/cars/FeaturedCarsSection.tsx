'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CarCard } from './CarCard'
import { storage } from '@/lib/utils'
import type { Car } from '@/data/cars'

interface FeaturedCarsSectionProps {
  cars: Car[]
  locale: string
  title: string
  viewAllText: string
}

export function FeaturedCarsSection({ 
  cars, 
  locale, 
  title, 
  viewAllText 
}: FeaturedCarsSectionProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [comparing, setComparing] = useState<string[]>([])
  
  useEffect(() => {
    setFavorites(storage.getFavorites())
    setComparing(storage.getCompare())
    
    // Listen for updates from other components
    const handleFavoritesUpdate = () => setFavorites(storage.getFavorites())
    const handleCompareUpdate = () => setComparing(storage.getCompare())
    
    window.addEventListener('favorites-updated', handleFavoritesUpdate)
    window.addEventListener('compare-updated', handleCompareUpdate)
    
    return () => {
      window.removeEventListener('favorites-updated', handleFavoritesUpdate)
      window.removeEventListener('compare-updated', handleCompareUpdate)
    }
  }, [])
  
  const handleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
    setFavorites(updated)
    storage.setFavorites(updated)
    window.dispatchEvent(new CustomEvent('favorites-updated'))
  }
  
  const handleCompare = (id: string) => {
    const updated = comparing.includes(id)
      ? comparing.filter(c => c !== id)
      : comparing.length < 4 ? [...comparing, id] : comparing
    setComparing(updated)
    storage.setCompare(updated)
    window.dispatchEvent(new CustomEvent('compare-updated'))
  }
  
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title mb-0">{title}</h2>
          <Link 
            href={`/${locale}/buy/cars`}
            className="text-secondary font-medium hover:underline"
          >
            {viewAllText} →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              locale={locale}
              isFavorite={favorites.includes(car.id)}
              isComparing={comparing.includes(car.id)}
              onFavorite={handleFavorite}
              onCompare={handleCompare}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
