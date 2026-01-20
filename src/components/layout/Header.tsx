'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, GitCompare, Search, Phone, ChevronDown } from 'lucide-react'
import { cn, storage } from '@/lib/utils'

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [compareCount, setCompareCount] = useState(0)
  
  // Load counts from localStorage and listen for updates
  useEffect(() => {
    const updateCounts = () => {
      setFavoritesCount(storage.getFavorites().length)
      setCompareCount(storage.getCompare().length)
    }
    
    // Initial load
    updateCounts()
    
    // Listen for custom events
    const handleFavoritesUpdate = () => updateCounts()
    const handleCompareUpdate = () => updateCounts()
    
    window.addEventListener('favorites-updated', handleFavoritesUpdate)
    window.addEventListener('compare-updated', handleCompareUpdate)
    
    // Also listen for storage events (for cross-tab sync)
    window.addEventListener('storage', updateCounts)
    
    return () => {
      window.removeEventListener('favorites-updated', handleFavoritesUpdate)
      window.removeEventListener('compare-updated', handleCompareUpdate)
      window.removeEventListener('storage', updateCounts)
    }
  }, [])
  
  const isArabic = locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const navItems = [
    { label: t.home, href: `/${locale}` },
    { 
      label: t.buy, 
      href: `/${locale}/buy/cars`,
      dropdown: [
        { label: t.carsListing, href: `/${locale}/buy/cars` },
        { label: t.popularModels, href: `/${locale}/buy/popular` },
        { label: t.bodyTypes, href: `/${locale}/buy/body-types` },
      ]
    },
    { 
      label: t.sell, 
      href: `/${locale}/sell`,
      dropdown: [
        { label: t.sellMyCar, href: `/${locale}/sell/valuation` },
        { label: t.tradeIn, href: `/${locale}/sell/trade-in` },
      ]
    },
    { 
      label: t.finance, 
      href: `/${locale}/finance`,
      dropdown: [
        { label: t.financeOverview, href: `/${locale}/finance` },
        { label: t.emiCalculator, href: `/${locale}/finance/calculator` },
        { label: t.checkEligibility, href: `/${locale}/finance/eligibility` },
      ]
    },
    { label: t.insurance, href: `/${locale}/insurance` },
    { label: t.offers, href: `/${locale}/offers` },
    { label: t.locations, href: `/${locale}/locations` },
  ]
  
  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+97143001234" className="flex items-center gap-1 hover:text-secondary">
              <Phone className="w-4 h-4" />
              <span>+971 4 300 1234</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 border border-white/20 rounded">
              <Link 
                href={`/en${typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(en|ar)/, '') : ''}`}
                className={cn(
                  'px-2 py-1 text-xs',
                  !isArabic && 'bg-white text-primary'
                )}
              >
                EN
              </Link>
              <Link 
                href={`/ar${typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(en|ar)/, '') : ''}`}
                className={cn(
                  'px-2 py-1 text-xs',
                  isArabic && 'bg-white text-primary'
                )}
              >
                العربية
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main nav */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-xl">
              DL
            </div>
            <span className="font-bold text-xl hidden sm:block">Drive Tru</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={item.href}
                  className="flex items-center gap-1 py-4 hover:text-secondary transition-colors"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white text-primary rounded-lg shadow-xl py-2 min-w-48 animate-fade-in">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            <Link href={`/${locale}/tools/my-garage`} className="p-2 hover:bg-white/10 rounded-lg relative">
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full text-xs flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link href={`/${locale}/tools/my-garage?tab=compare`} className="p-2 hover:bg-white/10 rounded-lg relative">
              <GitCompare className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full text-xs flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10">
          <nav className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 last:border-0">
                <Link 
                  href={item.href}
                  className="block py-3 hover:text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 pb-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-2 text-sm text-gray-300 hover:text-secondary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

// Inline translations for prototype simplicity
const translations = {
  en: {
    home: 'Home',
    buy: 'Buy',
    sell: 'Sell',
    finance: 'Finance',
    insurance: 'Insurance',
    offers: 'Offers',
    locations: 'Locations',
    carsListing: 'Browse All Cars',
    popularModels: 'Popular Models',
    bodyTypes: 'Body Types',
    sellMyCar: 'Sell My Car',
    tradeIn: 'Trade-in',
    financeOverview: 'Finance Overview',
    emiCalculator: 'EMI Calculator',
    checkEligibility: 'Check Eligibility',
  },
  ar: {
    home: 'الرئيسية',
    buy: 'شراء',
    sell: 'بيع',
    finance: 'تمويل',
    insurance: 'تأمين',
    offers: 'العروض',
    locations: 'الفروع',
    carsListing: 'تصفح السيارات',
    popularModels: 'الموديلات الشائعة',
    bodyTypes: 'أنواع الهيكل',
    sellMyCar: 'بيع سيارتي',
    tradeIn: 'استبدال',
    financeOverview: 'نظرة عامة على التمويل',
    emiCalculator: 'حاسبة القسط',
    checkEligibility: 'تحقق من الأهلية',
  }
}
