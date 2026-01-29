// Mock campaign banners data for Drive Tru prototype
// TODO: Production - Replace with real database and file uploads

export interface CampaignBanner {
  id: string
  titleEn: string
  titleAr: string
  subtitleEn: string
  subtitleAr: string
  image: string
  ctaTextEn: string
  ctaTextAr: string
  ctaLink: string
  active: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export const campaignBanners: CampaignBanner[] = [
  {
    id: 'banner-001',
    titleEn: 'Limited Time Offer',
    titleAr: 'عرض لفترة محدودة',
    subtitleEn: 'Get 0% financing on all certified pre-owned vehicles',
    subtitleAr: 'احصل على تمويل بفائدة 0% على جميع السيارات المعتمدة',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaTextEn: 'Shop Now',
    ctaTextAr: 'تسوق الآن',
    ctaLink: '/buy/cars',
    active: true,
    displayOrder: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'banner-002',
    titleEn: 'Trade-In Bonus',
    titleAr: 'مكافأة الاستبدال',
    subtitleEn: 'Get up to AED 10,000 extra on your trade-in',
    subtitleAr: 'احصل على 10,000 درهم إضافية عند استبدال سيارتك',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaTextEn: 'Value My Car',
    ctaTextAr: 'قيّم سيارتي',
    ctaLink: '/sell/valuation',
    active: true,
    displayOrder: 2,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'banner-003',
    titleEn: 'New Arrivals',
    titleAr: 'وصل حديثاً',
    subtitleEn: 'Discover the latest certified Suzuki and Citroen models',
    subtitleAr: 'اكتشف أحدث موديلات سوزوكي وسيتروين المعتمدة',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaTextEn: 'View Inventory',
    ctaTextAr: 'عرض المخزون',
    ctaLink: '/buy/cars?sort=newest',
    active: true,
    displayOrder: 3,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: 'banner-004',
    titleEn: 'Special Winter Offer',
    titleAr: 'عرض الشتاء الخاص',
    subtitleEn: 'Save big on SUVs and crossovers - Perfect for adventure',
    subtitleAr: 'وفر الكثير على سيارات الدفع الرباعي - مثالية للمغامرة',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaTextEn: 'Browse SUVs',
    ctaTextAr: 'تصفح سيارات SUV',
    ctaLink: '/buy/cars?bodyType=SUV',
    active: false,
    displayOrder: 4,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
]

// Helper functions
export const getActiveBanners = (): CampaignBanner[] => {
  return campaignBanners
    .filter(banner => banner.active)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

export const getBannerById = (id: string): CampaignBanner | undefined => {
  return campaignBanners.find(banner => banner.id === id)
}

export const getAllBanners = (): CampaignBanner[] => {
  return [...campaignBanners].sort((a, b) => a.displayOrder - b.displayOrder)
}
