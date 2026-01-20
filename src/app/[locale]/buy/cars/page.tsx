'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Grid, List, SlidersHorizontal, X } from 'lucide-react'
import { cars } from '@/data/cars'
import { CarGrid } from '@/components/cars/CarGrid'
import { FilterSidebar, Filters } from '@/components/cars/FilterSidebar'
import { cn, storage } from '@/lib/utils'

function CarsListingContent({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  // Parse filters from URL
  const initialFilters: Filters = {
    make: searchParams.get('make')?.split(',').filter(Boolean),
    bodyType: searchParams.get('bodyType')?.split(',').filter(Boolean),
    fuelType: searchParams.get('fuelType')?.split(',').filter(Boolean),
    transmission: searchParams.get('transmission')?.split(',').filter(Boolean),
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    yearMin: searchParams.get('yearMin') ? Number(searchParams.get('yearMin')) : undefined,
    yearMax: searchParams.get('yearMax') ? Number(searchParams.get('yearMax')) : undefined,
    certified: searchParams.get('certified') === 'true',
  }
  
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [comparing, setComparing] = useState<string[]>([])
  
  // Load favorites from localStorage
  useEffect(() => {
    setFavorites(storage.getFavorites())
    setComparing(storage.getCompare())
  }, [])
  
  // Update URL when filters change
  useEffect(() => {
    const urlParams = new URLSearchParams()
    
    if (filters.make?.length) urlParams.set('make', filters.make.join(','))
    if (filters.bodyType?.length) urlParams.set('bodyType', filters.bodyType.join(','))
    if (filters.fuelType?.length) urlParams.set('fuelType', filters.fuelType.join(','))
    if (filters.transmission?.length) urlParams.set('transmission', filters.transmission.join(','))
    if (filters.priceMin) urlParams.set('priceMin', String(filters.priceMin))
    if (filters.priceMax) urlParams.set('priceMax', String(filters.priceMax))
    if (filters.yearMin) urlParams.set('yearMin', String(filters.yearMin))
    if (filters.yearMax) urlParams.set('yearMax', String(filters.yearMax))
    if (filters.certified) urlParams.set('certified', 'true')
    if (sortBy !== 'newest') urlParams.set('sort', sortBy)
    
    const queryString = urlParams.toString()
    router.replace(`/${params.locale}/buy/cars${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }, [filters, sortBy, params.locale, router])
  
  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let result = cars.filter(car => car.status !== 'Sold')
    
    // Apply filters
    if (filters.make?.length) {
      result = result.filter(car => filters.make!.includes(car.make))
    }
    if (filters.bodyType?.length) {
      result = result.filter(car => filters.bodyType!.includes(car.bodyType))
    }
    if (filters.fuelType?.length) {
      result = result.filter(car => filters.fuelType!.includes(car.fuelType))
    }
    if (filters.transmission?.length) {
      result = result.filter(car => filters.transmission!.includes(car.transmission))
    }
    if (filters.priceMin) {
      result = result.filter(car => car.price >= filters.priceMin!)
    }
    if (filters.priceMax) {
      result = result.filter(car => car.price <= filters.priceMax!)
    }
    if (filters.yearMin) {
      result = result.filter(car => car.year >= filters.yearMin!)
    }
    if (filters.yearMax) {
      result = result.filter(car => car.year <= filters.yearMax!)
    }
    if (filters.certified) {
      result = result.filter(car => car.certified)
    }
    
    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'year-desc':
        result.sort((a, b) => b.year - a.year)
        break
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage)
        break
      default: // newest
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    
    return result
  }, [filters, sortBy])
  
  const handleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
    setFavorites(updated)
    storage.setFavorites(updated)
    // Dispatch custom event to notify Header
    window.dispatchEvent(new CustomEvent('favorites-updated'))
  }
  
  const handleCompare = (id: string) => {
    const updated = comparing.includes(id)
      ? comparing.filter(c => c !== id)
      : comparing.length < 4 ? [...comparing, id] : comparing
    setComparing(updated)
    storage.setCompare(updated)
    // Dispatch custom event to notify Header
    window.dispatchEvent(new CustomEvent('compare-updated'))
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-gray-300 mt-2">
            {filteredCars.length} {t.carsFound}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <FilterSidebar 
              filters={filters} 
              onChange={setFilters} 
              locale={params.locale} 
            />
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Mobile filter button */}
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 text-primary"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {t.filters}
              </button>
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">{t.sortBy}:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                >
                  <option value="newest">{t.newest}</option>
                  <option value="price-asc">{t.priceLow}</option>
                  <option value="price-desc">{t.priceHigh}</option>
                  <option value="year-desc">{t.yearNew}</option>
                  <option value="mileage-asc">{t.mileageLow}</option>
                </select>
              </div>
              
              {/* View toggle */}
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2',
                    viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2',
                    viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Car Grid */}
            <CarGrid 
              cars={filteredCars} 
              locale={params.locale}
              favorites={favorites}
              comparing={comparing}
              onFavorite={handleFavorite}
              onCompare={handleCompare}
            />
            
            {/* Pagination placeholder */}
            {filteredCars.length > 12 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border rounded hover:bg-gray-100">Previous</button>
                  <span className="px-4 py-2">1 of {Math.ceil(filteredCars.length / 12)}</span>
                  <button className="px-4 py-2 border rounded hover:bg-gray-100">Next</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">{t.filters}</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar 
                filters={filters} 
                onChange={setFilters} 
                locale={params.locale} 
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Compare bar */}
      {comparing.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary text-white py-4 shadow-lg animate-slide-up">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>{t.compare} ({comparing.length}/4)</span>
              <div className="flex gap-2">
                {comparing.map(id => {
                  const car = cars.find(c => c.id === id)
                  return (
                    <div key={id} className="bg-white/20 px-3 py-1 rounded text-sm flex items-center gap-2">
                      {car?.make} {car?.model}
                      <button onClick={() => handleCompare(id)}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
            <Link href={`/${params.locale}/tools/my-garage?tab=compare`} className="btn-secondary">
              {t.compareNow}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

const translations = {
  en: {
    title: 'Browse Cars',
    carsFound: 'cars found',
    filters: 'Filters',
    sortBy: 'Sort by',
    newest: 'Newest First',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    yearNew: 'Year: Newest',
    mileageLow: 'Mileage: Lowest',
    compare: 'Compare',
    compareNow: 'Compare Now',
  },
  ar: {
    title: 'تصفح السيارات',
    carsFound: 'سيارة متوفرة',
    filters: 'الفلاتر',
    sortBy: 'ترتيب حسب',
    newest: 'الأحدث',
    priceLow: 'السعر: من الأقل',
    priceHigh: 'السعر: من الأعلى',
    yearNew: 'السنة: الأحدث',
    mileageLow: 'المسافة: الأقل',
    compare: 'مقارنة',
    compareNow: 'قارن الآن',
  }
}

export default function CarsListingPage({ 
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
      <CarsListingContent params={params} />
    </Suspense>
  )
}
