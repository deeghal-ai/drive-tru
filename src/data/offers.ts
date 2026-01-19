// Mock offers/promotions data for Drive Tru prototype

export interface Offer {
  id: string
  slug: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  type: 'Financing' | 'Trade-in' | 'Seasonal' | 'Brand'
  image: string
  validFrom: string
  validUntil: string
  featured: boolean
  terms: string[]
  cta: {
    text: string
    textAr: string
    link: string
  }
}

export const offers: Offer[] = [
  {
    id: 'offer-001',
    slug: 'new-year-sale',
    title: 'New Year Sale - Up to 20% Off',
    titleAr: 'تخفيضات العام الجديد - خصم يصل إلى 20%',
    description: 'Start 2024 with your dream car! Get up to 20% off on selected pre-owned vehicles.',
    descriptionAr: 'ابدأ عام 2024 بسيارة أحلامك! احصل على خصم يصل إلى 20% على سيارات مختارة.',
    type: 'Seasonal',
    image: '/images/offers/new-year-sale.jpg',
    validFrom: '2024-01-01',
    validUntil: '2024-01-31',
    featured: true,
    terms: [
      'Valid on selected vehicles only',
      'Cannot be combined with other offers',
      'Subject to availability'
    ],
    cta: {
      text: 'Browse Sale Vehicles',
      textAr: 'تصفح سيارات التخفيضات',
      link: '/buy/cars?offer=new-year-sale'
    }
  },
  {
    id: 'offer-002',
    slug: 'zero-down-payment',
    title: '0% Down Payment on Suzuki',
    titleAr: 'دفعة أولى 0% على سوزوكي',
    description: 'Drive away today with zero down payment on all Suzuki models. Limited time offer!',
    descriptionAr: 'قد سيارتك اليوم بدون دفعة أولى على جميع موديلات سوزوكي. عرض لفترة محدودة!',
    type: 'Financing',
    image: '/images/offers/zero-down.jpg',
    validFrom: '2024-01-01',
    validUntil: '2024-02-28',
    featured: true,
    terms: [
      'Subject to bank approval',
      'Valid on Suzuki vehicles only',
      'Minimum salary AED 5,000 required'
    ],
    cta: {
      text: 'Check Eligibility',
      textAr: 'تحقق من الأهلية',
      link: '/finance/calculator'
    }
  },
  {
    id: 'offer-003',
    slug: 'trade-in-bonus',
    title: 'Trade-in Bonus - Extra AED 5,000',
    titleAr: 'مكافأة استبدال - 5,000 درهم إضافية',
    description: 'Get an extra AED 5,000 on top of your trade-in value when you upgrade to a certified pre-owned vehicle.',
    descriptionAr: 'احصل على 5,000 درهم إضافية فوق قيمة سيارتك عند الترقية إلى سيارة معتمدة.',
    type: 'Trade-in',
    image: '/images/offers/trade-in-bonus.jpg',
    validFrom: '2024-01-15',
    validUntil: '2024-03-31',
    featured: false,
    terms: [
      'Valid for certified pre-owned purchases only',
      'Trade-in must pass inspection',
      'One offer per customer'
    ],
    cta: {
      text: 'Value My Car',
      textAr: 'قيم سيارتي',
      link: '/sell/valuation'
    }
  },
  {
    id: 'offer-004',
    slug: 'citroen-special',
    title: 'Citroen Special - Free Service Package',
    titleAr: 'عرض سيتروين - باقة صيانة مجانية',
    description: 'Purchase any Citroen and receive 3 years free service package worth AED 8,000.',
    descriptionAr: 'اشترِ أي سيتروين واحصل على باقة صيانة مجانية لمدة 3 سنوات بقيمة 8,000 درهم.',
    type: 'Brand',
    image: '/images/offers/citroen-special.jpg',
    validFrom: '2024-01-01',
    validUntil: '2024-02-29',
    featured: false,
    terms: [
      'Valid on Citroen vehicles only',
      'Service package covers regular maintenance',
      'Valid at Drive Tru service centers'
    ],
    cta: {
      text: 'View Citroen Cars',
      textAr: 'عرض سيارات سيتروين',
      link: '/buy/cars?make=Citroen'
    }
  },
  {
    id: 'offer-005',
    slug: 'low-emi',
    title: 'EMI Starting from AED 799/month',
    titleAr: 'قسط شهري يبدأ من 799 درهم',
    description: 'Affordable monthly payments starting from just AED 799. Drive your dream car today!',
    descriptionAr: 'أقساط شهرية ميسرة تبدأ من 799 درهم فقط. قد سيارة أحلامك اليوم!',
    type: 'Financing',
    image: '/images/offers/low-emi.jpg',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    featured: false,
    terms: [
      'Based on selected vehicles',
      'Subject to bank approval',
      'Terms and conditions apply'
    ],
    cta: {
      text: 'Calculate EMI',
      textAr: 'احسب القسط',
      link: '/finance/calculator'
    }
  }
]

export const getActiveOffers = () => {
  const today = new Date().toISOString().split('T')[0]
  return offers.filter(o => o.validUntil >= today)
}

export const getFeaturedOffers = () => 
  offers.filter(o => o.featured)

export const getOfferBySlug = (slug: string) => 
  offers.find(o => o.slug === slug)

export const getOffersByType = (type: string) => 
  offers.filter(o => o.type === type)
