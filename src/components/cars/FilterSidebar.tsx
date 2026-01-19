'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { filterOptions } from '@/data/cars'

export interface Filters {
  make?: string[]
  bodyType?: string[]
  fuelType?: string[]
  transmission?: string[]
  specs?: string[]
  yearMin?: number
  yearMax?: number
  priceMin?: number
  priceMax?: number
  mileageMin?: number
  mileageMax?: number
  certified?: boolean
}

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  locale: string
}

export function FilterSidebar({ filters, onChange, locale }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['make', 'price', 'bodyType'])
  
  const t = locale === 'ar' ? translations.ar : translations.en
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }
  
  const toggleArrayFilter = (key: keyof Filters, value: string) => {
    const current = (filters[key] as string[]) || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: updated.length > 0 ? updated : undefined })
  }
  
  const updateRangeFilter = (minKey: keyof Filters, maxKey: keyof Filters, min?: number, max?: number) => {
    onChange({ 
      ...filters, 
      [minKey]: min,
      [maxKey]: max 
    })
  }
  
  const clearFilters = () => {
    onChange({})
  }
  
  const activeFilterCount = Object.values(filters).filter(v => 
    v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
  ).length
  
  return (
    <div className="w-full lg:w-72 flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">
          {t.filters}
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-secondary text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button 
            onClick={clearFilters}
            className="text-sm text-secondary hover:underline"
          >
            {t.clearAll}
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {/* Make filter */}
        <FilterSection
          title={t.make}
          expanded={expandedSections.includes('make')}
          onToggle={() => toggleSection('make')}
        >
          <div className="space-y-2">
            {filterOptions.makes.map(make => (
              <label key={make} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.make || []).includes(make)}
                  onChange={() => toggleArrayFilter('make', make)}
                  className="rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <span className="text-sm">{make}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        
        {/* Body Type filter */}
        <FilterSection
          title={t.bodyType}
          expanded={expandedSections.includes('bodyType')}
          onToggle={() => toggleSection('bodyType')}
        >
          <div className="space-y-2">
            {filterOptions.bodyTypes.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.bodyType || []).includes(type)}
                  onChange={() => toggleArrayFilter('bodyType', type)}
                  className="rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        
        {/* Price Range */}
        <FilterSection
          title={t.price}
          expanded={expandedSections.includes('price')}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={t.min}
                value={filters.priceMin || ''}
                onChange={(e) => updateRangeFilter('priceMin', 'priceMax', Number(e.target.value) || undefined, filters.priceMax)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <input
                type="number"
                placeholder={t.max}
                value={filters.priceMax || ''}
                onChange={(e) => updateRangeFilter('priceMin', 'priceMax', filters.priceMin, Number(e.target.value) || undefined)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {t.range}: AED {filterOptions.prices.min.toLocaleString()} - {filterOptions.prices.max.toLocaleString()}
            </p>
          </div>
        </FilterSection>
        
        {/* Year Range */}
        <FilterSection
          title={t.year}
          expanded={expandedSections.includes('year')}
          onToggle={() => toggleSection('year')}
        >
          <div className="flex gap-2">
            <select
              value={filters.yearMin || ''}
              onChange={(e) => updateRangeFilter('yearMin', 'yearMax', Number(e.target.value) || undefined, filters.yearMax)}
              className="w-full px-3 py-2 border rounded text-sm"
            >
              <option value="">{t.min}</option>
              {Array.from({ length: filterOptions.years.max - filterOptions.years.min + 1 }, (_, i) => filterOptions.years.min + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={filters.yearMax || ''}
              onChange={(e) => updateRangeFilter('yearMin', 'yearMax', filters.yearMin, Number(e.target.value) || undefined)}
              className="w-full px-3 py-2 border rounded text-sm"
            >
              <option value="">{t.max}</option>
              {Array.from({ length: filterOptions.years.max - filterOptions.years.min + 1 }, (_, i) => filterOptions.years.min + i).reverse().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </FilterSection>
        
        {/* Fuel Type */}
        <FilterSection
          title={t.fuelType}
          expanded={expandedSections.includes('fuelType')}
          onToggle={() => toggleSection('fuelType')}
        >
          <div className="space-y-2">
            {filterOptions.fuelTypes.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.fuelType || []).includes(type)}
                  onChange={() => toggleArrayFilter('fuelType', type)}
                  className="rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        
        {/* Transmission */}
        <FilterSection
          title={t.transmission}
          expanded={expandedSections.includes('transmission')}
          onToggle={() => toggleSection('transmission')}
        >
          <div className="space-y-2">
            {filterOptions.transmissions.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.transmission || []).includes(type)}
                  onChange={() => toggleArrayFilter('transmission', type)}
                  className="rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        
        {/* Certified Only */}
        <div className="filter-section">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.certified || false}
              onChange={() => onChange({ ...filters, certified: !filters.certified || undefined })}
              className="rounded border-gray-300 text-secondary focus:ring-secondary"
            />
            <span className="font-medium">{t.certifiedOnly}</span>
          </label>
        </div>
      </div>
    </div>
  )
}

// Filter section component
function FilterSection({ 
  title, 
  expanded, 
  onToggle, 
  children 
}: { 
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode 
}) {
  return (
    <div className="filter-section">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full"
      >
        <span className="filter-title mb-0">{title}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expanded && <div className="mt-3">{children}</div>}
    </div>
  )
}

const translations = {
  en: {
    filters: 'Filters',
    clearAll: 'Clear All',
    make: 'Make',
    bodyType: 'Body Type',
    price: 'Price (AED)',
    year: 'Year',
    fuelType: 'Fuel Type',
    transmission: 'Transmission',
    certifiedOnly: 'Certified Only',
    min: 'Min',
    max: 'Max',
    range: 'Range',
  },
  ar: {
    filters: 'الفلاتر',
    clearAll: 'مسح الكل',
    make: 'الماركة',
    bodyType: 'نوع الهيكل',
    price: 'السعر (درهم)',
    year: 'السنة',
    fuelType: 'نوع الوقود',
    transmission: 'ناقل الحركة',
    certifiedOnly: 'معتمد فقط',
    min: 'الحد الأدنى',
    max: 'الحد الأقصى',
    range: 'النطاق',
  }
}
