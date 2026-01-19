// Mock showroom/location data for Drive Tru prototype

export interface Showroom {
  id: string
  slug: string
  name: string
  nameAr: string
  address: string
  addressAr: string
  emirate: 'Dubai' | 'Abu Dhabi' | 'Sharjah'
  phone: string
  whatsapp: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  hours: {
    weekdays: string
    friday: string
    saturday: string
  }
  services: string[]
  images: string[]
}

export const showrooms: Showroom[] = [
  {
    id: 'loc-001',
    slug: 'deira-showroom',
    name: 'Deira Showroom',
    nameAr: 'معرض ديرة',
    address: 'Salahuddin Road, Deira, Dubai, UAE',
    addressAr: 'شارع صلاح الدين، ديرة، دبي، الإمارات',
    emirate: 'Dubai',
    phone: '+971 4 300 1234',
    whatsapp: '+971501234567',
    email: 'deira@drivetru.ae',
    coordinates: {
      lat: 25.2654,
      lng: 55.3088
    },
    hours: {
      weekdays: '9:00 AM - 9:00 PM',
      friday: '2:00 PM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM'
    },
    services: ['Car Sales', 'Test Drives', 'Trade-in', 'Financing', 'Service Center'],
    images: ['/images/showrooms/deira-1.jpg', '/images/showrooms/deira-2.jpg']
  },
  {
    id: 'loc-002',
    slug: 'szr-showroom',
    name: 'Sheikh Zayed Road Showroom',
    nameAr: 'معرض شارع الشيخ زايد',
    address: 'Sheikh Zayed Road, Al Quoz, Dubai, UAE',
    addressAr: 'شارع الشيخ زايد، القوز، دبي، الإمارات',
    emirate: 'Dubai',
    phone: '+971 4 300 5678',
    whatsapp: '+971505678901',
    email: 'szr@drivetru.ae',
    coordinates: {
      lat: 25.1185,
      lng: 55.2006
    },
    hours: {
      weekdays: '9:00 AM - 10:00 PM',
      friday: '2:00 PM - 10:00 PM',
      saturday: '9:00 AM - 10:00 PM'
    },
    services: ['Car Sales', 'Test Drives', 'Trade-in', 'Financing', 'Premium Lounge'],
    images: ['/images/showrooms/szr-1.jpg', '/images/showrooms/szr-2.jpg']
  },
  {
    id: 'loc-003',
    slug: 'abu-dhabi-showroom',
    name: 'Abu Dhabi Showroom',
    nameAr: 'معرض أبوظبي',
    address: 'Mussafah Industrial Area, Abu Dhabi, UAE',
    addressAr: 'منطقة مصفح الصناعية، أبوظبي، الإمارات',
    emirate: 'Abu Dhabi',
    phone: '+971 2 500 9012',
    whatsapp: '+971509012345',
    email: 'abudhabi@drivetru.ae',
    coordinates: {
      lat: 24.3658,
      lng: 54.5011
    },
    hours: {
      weekdays: '9:00 AM - 9:00 PM',
      friday: '2:00 PM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM'
    },
    services: ['Car Sales', 'Test Drives', 'Trade-in', 'Financing', 'Service Center'],
    images: ['/images/showrooms/abudhabi-1.jpg', '/images/showrooms/abudhabi-2.jpg']
  }
]

export const getShowroomBySlug = (slug: string) => 
  showrooms.find(s => s.slug === slug)

export const getShowroomsByEmirate = (emirate: string) => 
  showrooms.filter(s => s.emirate === emirate)
