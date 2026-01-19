import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combine class names with Tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price in AED
export function formatPrice(price: number): string {
  return `AED ${price.toLocaleString()}`
}

// Format mileage
export function formatMileage(km: number): string {
  return `${km.toLocaleString()} km`
}

// Calculate EMI
export function calculateEMI(
  principal: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) return principal / months
  
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  
  return Math.round(emi)
}

// Calculate total interest
export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  months: number
): number {
  const emi = calculateEMI(principal, annualRate, months)
  return emi * months - principal
}

// Format VIN for display
export function formatVIN(vin: string): string {
  return vin.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

// Validate VIN (basic check - 17 characters)
export function isValidVIN(vin: string): boolean {
  const cleaned = formatVIN(vin)
  return cleaned.length === 17
}

// Generate WhatsApp link
export function getWhatsAppLink(
  phone: string,
  message?: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const encodedMessage = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

// Generate phone link
export function getPhoneLink(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`
}

// Generate Google Maps directions link
export function getDirectionsLink(
  lat: number,
  lng: number,
  placeName?: string
): string {
  const destination = placeName
    ? encodeURIComponent(placeName)
    : `${lat},${lng}`
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

// Get relative time (simple version)
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

// Storage helpers for favorites and compare
export const storage = {
  getFavorites: (): string[] => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('drivelife_favorites')
    return saved ? JSON.parse(saved) : []
  },
  
  setFavorites: (ids: string[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('drivelife_favorites', JSON.stringify(ids))
  },
  
  getCompare: (): string[] => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('drivelife_compare')
    return saved ? JSON.parse(saved) : []
  },
  
  setCompare: (ids: string[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('drivelife_compare', JSON.stringify(ids))
  },
}
