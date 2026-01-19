'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, GitCompare, Fuel, Gauge, Settings } from 'lucide-react'
import { cn, formatPrice, formatMileage, calculateEMI } from '@/lib/utils'
import type { Car } from '@/data/cars'

interface CarCardProps {
  car: Car
  locale: string
  onFavorite?: (id: string) => void
  onCompare?: (id: string) => void
  isFavorite?: boolean
  isComparing?: boolean
}

export function CarCard({ 
  car, 
  locale, 
  onFavorite, 
  onCompare,
  isFavorite = false,
  isComparing = false 
}: CarCardProps) {
  const monthlyEMI = calculateEMI(car.price * 0.8, 3.99, 60) // 20% down, 3.99%, 60 months
  
  const statusColors = {
    Available: 'badge-available',
    Reserved: 'badge-reserved',
    Sold: 'badge-sold',
  }
  
  const statusLabels = {
    Available: locale === 'ar' ? 'متاح' : 'Available',
    Reserved: locale === 'ar' ? 'محجوز' : 'Reserved',
    Sold: locale === 'ar' ? 'مباع' : 'Sold',
  }
  
  return (
    <div className="car-card group">
      {/* Image */}
      <div className="car-card-image relative">
        <Link href={`/${locale}/buy/cars/${car.id}`}>
          <Image
            src={car.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={`${car.year} ${car.make} ${car.model}`}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </Link>
        
        {/* Status badge */}
        <span className={cn('absolute top-3 left-3', statusColors[car.status])}>
          {statusLabels[car.status]}
        </span>
        
        {/* Certified badge */}
        {car.certified && (
          <span className="badge-certified absolute top-3 right-3">
            ✓ {locale === 'ar' ? 'معتمد' : 'Certified'}
          </span>
        )}
        
        {/* Action buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault()
              onFavorite?.(car.id)
            }}
            className={cn(
              'p-2 rounded-full bg-white shadow-md transition-colors',
              isFavorite ? 'text-secondary' : 'text-gray-600 hover:text-secondary'
            )}
          >
            <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              onCompare?.(car.id)
            }}
            className={cn(
              'p-2 rounded-full bg-white shadow-md transition-colors',
              isComparing ? 'text-secondary' : 'text-gray-600 hover:text-secondary'
            )}
          >
            <GitCompare className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/${locale}/buy/cars/${car.id}`}>
          <h3 className="font-semibold text-lg text-primary hover:text-secondary transition-colors">
            {car.year} {car.make} {car.model}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">{car.variant}</p>
        
        {/* Specs row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            {formatMileage(car.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            {car.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            {car.transmission}
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="price">{formatPrice(car.price)}</p>
            <p className="price-emi">
              {locale === 'ar' ? 'من' : 'From'} {formatPrice(monthlyEMI)}/{locale === 'ar' ? 'شهر' : 'mo'}
            </p>
          </div>
          <Link 
            href={`/${locale}/buy/cars/${car.id}`}
            className="text-sm font-medium text-secondary hover:underline"
          >
            {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'} →
          </Link>
        </div>
      </div>
    </div>
  )
}
