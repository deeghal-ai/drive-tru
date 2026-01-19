'use client'

import { CarCard } from './CarCard'
import type { Car } from '@/data/cars'

interface CarGridProps {
  cars: Car[]
  locale: string
  favorites?: string[]
  comparing?: string[]
  onFavorite?: (id: string) => void
  onCompare?: (id: string) => void
}

export function CarGrid({ 
  cars, 
  locale, 
  favorites = [], 
  comparing = [],
  onFavorite,
  onCompare 
}: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {locale === 'ar' ? 'لا توجد سيارات مطابقة' : 'No cars found matching your criteria'}
        </p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          locale={locale}
          isFavorite={favorites.includes(car.id)}
          isComparing={comparing.includes(car.id)}
          onFavorite={onFavorite}
          onCompare={onCompare}
        />
      ))}
    </div>
  )
}
