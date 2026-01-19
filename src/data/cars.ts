// Mock car inventory for Drive Tru prototype
// Realistic UAE pre-owned car data - Suzuki & Citroen only

export interface CarSpecs {
  engine: string
  power: string
  seats: number
  regional: 'GCC' | 'American' | 'European' | 'Japanese'
}

export interface CarShowroom {
  name: string
  nameAr: string
  address: string
  addressAr: string
  slug: string
}

export interface Car {
  id: string
  vin: string
  make: 'Suzuki' | 'Citroen'
  model: string
  variant: string
  year: number
  price: number
  mileage: number
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
  transmission: 'Automatic' | 'Manual'
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Crossover' | 'Coupe' | 'Pickup'
  color: string
  interiorColor: string
  specs: CarSpecs
  status: 'Available' | 'Reserved' | 'Sold'
  certified: boolean
  warranty: string | null
  features: string[]
  images: string[]
  showroom: CarShowroom
  createdAt: string
}

// Showroom data for cars
const showrooms: Record<string, CarShowroom> = {
  deira: {
    name: 'Deira Showroom',
    nameAr: 'معرض ديرة',
    address: 'Salahuddin Road, Deira, Dubai, UAE',
    addressAr: 'شارع صلاح الدين، ديرة، دبي، الإمارات',
    slug: 'deira-showroom'
  },
  szr: {
    name: 'Sheikh Zayed Road Showroom',
    nameAr: 'معرض شارع الشيخ زايد',
    address: 'Sheikh Zayed Road, Al Quoz, Dubai, UAE',
    addressAr: 'شارع الشيخ زايد، القوز، دبي، الإمارات',
    slug: 'szr-showroom'
  },
  abudhabi: {
    name: 'Abu Dhabi Showroom',
    nameAr: 'معرض أبوظبي',
    address: 'Mussafah Industrial Area, Abu Dhabi, UAE',
    addressAr: 'منطقة مصفح الصناعية، أبوظبي، الإمارات',
    slug: 'abu-dhabi-showroom'
  }
}

export const cars: Car[] = [
  // ========== SUZUKI VEHICLES ==========
  {
    id: 'DL-001',
    vin: 'JSAAZC83S00123456',
    make: 'Suzuki',
    model: 'Swift',
    variant: 'GL',
    year: 2023,
    price: 72000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Pearl White',
    interiorColor: 'Black',
    specs: {
      engine: '1.2L 4-Cylinder',
      power: '82 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '2-year / 50,000 km comprehensive warranty',
    features: ['Apple CarPlay', 'Android Auto', 'Rear Camera', 'Cruise Control', 'LED Headlights', 'Alloy Wheels'],
    images: [
      '/images/cars/suzuki/swift-1.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-10'
  },
  {
    id: 'DL-002',
    vin: 'JSAAZC83S00123457',
    make: 'Suzuki',
    model: 'Swift',
    variant: 'GLX',
    year: 2022,
    price: 65000,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Metallic Grey',
    interiorColor: 'Grey',
    specs: {
      engine: '1.2L 4-Cylinder',
      power: '82 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: null,
    features: ['Touchscreen', 'Bluetooth', 'USB', 'ABS', 'Airbags', 'Keyless Entry'],
    images: [
      '/images/cars/suzuki/swift-2.jpg',
    ],
    showroom: showrooms.szr,
    createdAt: '2024-01-08'
  },
  {
    id: 'DL-003',
    vin: 'JSAFJB33V00234567',
    make: 'Suzuki',
    model: 'Jimny',
    variant: 'GLX',
    year: 2023,
    price: 115000,
    mileage: 8000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Kinetic Yellow',
    interiorColor: 'Black',
    specs: {
      engine: '1.5L 4-Cylinder',
      power: '102 HP',
      seats: 4,
      regional: 'GCC'
    },
    status: 'Reserved',
    certified: true,
    warranty: '3-year / 100,000 km warranty',
    features: ['4WD', 'Hill Descent', 'Touchscreen', 'Bluetooth', 'Off-road Mode'],
    images: [
      '/images/cars/suzuki/jimny-1.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-12'
  },
  {
    id: 'DL-004',
    vin: 'JSAFJB33V00234568',
    make: 'Suzuki',
    model: 'Grand Vitara',
    variant: 'GLX',
    year: 2024,
    price: 135000,
    mileage: 5000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Celestial Blue',
    interiorColor: 'Beige',
    specs: {
      engine: '1.5L Hybrid',
      power: '115 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '5-year / 150,000 km hybrid warranty',
    features: ['Hybrid System', 'Panoramic Sunroof', 'Wireless Charging', 'ADAS', '360 Camera'],
    images: [
      '/images/cars/suzuki/grand-vitara-1.jpg',
    ],
    showroom: showrooms.abudhabi,
    createdAt: '2024-01-14'
  },
  {
    id: 'DL-005',
    vin: 'JSAEZC11S00345678',
    make: 'Suzuki',
    model: 'Dzire',
    variant: 'GL',
    year: 2023,
    price: 58000,
    mileage: 22000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Silky Silver',
    interiorColor: 'Beige',
    specs: {
      engine: '1.2L 4-Cylinder',
      power: '82 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: false,
    warranty: null,
    features: ['Touchscreen', 'Rear AC Vents', 'ABS', 'Airbags'],
    images: [
      '/images/cars/suzuki/dzire-1.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-05'
  },
  {
    id: 'DL-006',
    vin: 'JSAAZC83S00456789',
    make: 'Suzuki',
    model: 'Baleno',
    variant: 'GL',
    year: 2022,
    price: 52000,
    mileage: 35000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Arctic White',
    interiorColor: 'Grey',
    specs: {
      engine: '1.5L 4-Cylinder',
      power: '104 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: false,
    warranty: null,
    features: ['Touchscreen', 'Rear Camera', 'ABS', 'Dual Airbags'],
    images: [
      '/images/cars/suzuki/baleno-1.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-03'
  },
  {
    id: 'DL-007',
    vin: 'JSAFJB33V00567890',
    make: 'Suzuki',
    model: 'Jimny',
    variant: 'GL',
    year: 2022,
    price: 105000,
    mileage: 25000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'SUV',
    color: 'Jungle Green',
    interiorColor: 'Black',
    specs: {
      engine: '1.5L 4-Cylinder',
      power: '102 HP',
      seats: 4,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: null,
    features: ['4WD', 'Off-road Capable', 'Hill Descent', 'Basic Infotainment'],
    images: [
      '/images/cars/suzuki/jimny-2.jpg',
    ],
    showroom: showrooms.abudhabi,
    createdAt: '2024-01-01'
  },
  {
    id: 'DL-008',
    vin: 'JSAEZC11S00678901',
    make: 'Suzuki',
    model: 'Ertiga',
    variant: 'GL',
    year: 2023,
    price: 82000,
    mileage: 20000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Magma Grey',
    interiorColor: 'Beige',
    specs: {
      engine: '1.5L 4-Cylinder',
      power: '104 HP',
      seats: 7,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '2-year warranty',
    features: ['7 Seater', 'Rear AC', 'Touchscreen', 'Rear Camera', 'ABS'],
    images: [
      '/images/cars/suzuki/ertiga-1.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-08'
  },
  {
    id: 'DL-009',
    vin: 'JSAAZC83S00789012',
    make: 'Suzuki',
    model: 'Swift',
    variant: 'Sport',
    year: 2023,
    price: 89000,
    mileage: 10000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Champion Yellow',
    interiorColor: 'Black',
    specs: {
      engine: '1.4L Turbo',
      power: '140 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '3-year warranty',
    features: ['Sport Mode', 'Paddle Shifters', 'Sport Suspension', 'LED Lights', 'Sport Seats'],
    images: [
      '/images/cars/suzuki/swift-3.jpg',
    ],
    showroom: showrooms.szr,
    createdAt: '2024-01-11'
  },
  {
    id: 'DL-010',
    vin: 'JSAFJB33V00890123',
    make: 'Suzuki',
    model: 'Grand Vitara',
    variant: 'Alpha',
    year: 2023,
    price: 125000,
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Pearl White',
    interiorColor: 'Black',
    specs: {
      engine: '1.5L 4-Cylinder',
      power: '103 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '2-year warranty',
    features: ['Sunroof', 'LED Headlights', 'Touchscreen', 'Apple CarPlay', 'Rear Camera'],
    images: [
      '/images/cars/suzuki/grand-vitara-2.jpg',
    ],
    showroom: showrooms.szr,
    createdAt: '2024-01-09'
  },
  {
    id: 'DL-011',
    vin: 'JSAEZC11S00901234',
    make: 'Suzuki',
    model: 'Dzire',
    variant: 'GLX',
    year: 2024,
    price: 68000,
    mileage: 8000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Oxford Blue',
    interiorColor: 'Beige',
    specs: {
      engine: '1.2L 4-Cylinder',
      power: '82 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '3-year warranty',
    features: ['Touchscreen', 'Wireless Charging', 'Cruise Control', 'LED DRLs', 'ABS'],
    images: [
      '/images/cars/suzuki/dzire-2.jpg',
    ],
    showroom: showrooms.abudhabi,
    createdAt: '2024-01-13'
  },
  
  // ========== CITROEN VEHICLES ==========
  {
    id: 'DL-012',
    vin: 'VF7SAHMZ6MW123456',
    make: 'Citroen',
    model: 'C3',
    variant: 'Shine',
    year: 2023,
    price: 78000,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Polar White',
    interiorColor: 'Black',
    specs: {
      engine: '1.2L Turbo',
      power: '110 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '3-year manufacturer warranty',
    features: ['10" Touchscreen', 'Apple CarPlay', 'Wireless Charging', 'Rear Camera'],
    images: [
      '/images/cars/citroen/c3-1.jpg',
    ],
    showroom: showrooms.szr,
    createdAt: '2024-01-11'
  },
  {
    id: 'DL-013',
    vin: 'VF7SAHMZ6MW123457',
    make: 'Citroen',
    model: 'C3 Aircross',
    variant: 'Feel',
    year: 2023,
    price: 95000,
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Crossover',
    color: 'Volcanic Red',
    interiorColor: 'Grey',
    specs: {
      engine: '1.2L Turbo',
      power: '130 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '2-year extended warranty',
    features: ['Panoramic Roof', 'Grip Control', 'Blind Spot', 'Lane Assist'],
    images: [
      '/images/cars/citroen/c3-aircross-1.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-09'
  },
  {
    id: 'DL-014',
    vin: 'VF7NCBHY6PW234567',
    make: 'Citroen',
    model: 'C5 Aircross',
    variant: 'Shine',
    year: 2022,
    price: 125000,
    mileage: 35000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Pearl White',
    interiorColor: 'Brown',
    specs: {
      engine: '1.6L Turbo',
      power: '165 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: null,
    features: ['Advanced Comfort Seats', 'Highway Assist', 'Electric Tailgate', 'Premium Audio'],
    images: [
      '/images/cars/citroen/c5-aircross-1.jpg',
    ],
    showroom: showrooms.abudhabi,
    createdAt: '2024-01-06'
  },
  {
    id: 'DL-015',
    vin: 'VF7NCBHY6PW345678',
    make: 'Citroen',
    model: 'C4',
    variant: 'Shine',
    year: 2023,
    price: 108000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Crossover',
    color: 'Elixir Red',
    interiorColor: 'Black',
    specs: {
      engine: '1.2L Turbo',
      power: '130 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '3-year manufacturer warranty',
    features: ['Extended Head-Up Display', 'Highway Assist', 'Advanced Comfort Seats'],
    images: [
      '/images/cars/citroen/c4-1.jpg',
    ],
    showroom: showrooms.szr,
    createdAt: '2024-01-12'
  },
  {
    id: 'DL-016',
    vin: 'VF7SAHMZ6MW456789',
    make: 'Citroen',
    model: 'C3',
    variant: 'Feel',
    year: 2022,
    price: 68000,
    mileage: 30000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Spring Blue',
    interiorColor: 'Grey',
    specs: {
      engine: '1.2L Turbo',
      power: '110 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: false,
    warranty: null,
    features: ['7" Touchscreen', 'Bluetooth', 'USB', 'ABS'],
    images: [
      '/images/cars/citroen/c3-2.jpg',
    ],
    showroom: showrooms.abudhabi,
    createdAt: '2024-01-05'
  },
  {
    id: 'DL-017',
    vin: 'VF7SAHMZ6MW567890',
    make: 'Citroen',
    model: 'C3 Aircross',
    variant: 'Shine',
    year: 2024,
    price: 105000,
    mileage: 5000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Crossover',
    color: 'Perla Nera Black',
    interiorColor: 'Black',
    specs: {
      engine: '1.2L Turbo',
      power: '130 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: true,
    warranty: '5-year manufacturer warranty',
    features: ['Panoramic Roof', 'ADAS', 'Wireless Charging', '360 Camera', 'Apple CarPlay'],
    images: [
      '/images/cars/citroen/c3-aircross-2.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-14'
  },
  {
    id: 'DL-018',
    vin: 'VF7NCBHY6PW456789',
    make: 'Citroen',
    model: 'C5 Aircross',
    variant: 'Feel',
    year: 2023,
    price: 115000,
    mileage: 22000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Cumulus Grey',
    interiorColor: 'Grey',
    specs: {
      engine: '1.6L Turbo',
      power: '165 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Reserved',
    certified: true,
    warranty: '2-year warranty',
    features: ['Comfort Seats', 'Rear Camera', 'Parking Sensors', 'LED Headlights'],
    images: [
      '/images/cars/citroen/c5-aircross-2.jpg',
    ],
    showroom: showrooms.szr,
    createdAt: '2024-01-07'
  },
  {
    id: 'DL-019',
    vin: 'VF7NCBHY6PW567890',
    make: 'Citroen',
    model: 'C4',
    variant: 'Feel',
    year: 2022,
    price: 92000,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Crossover',
    color: 'Platinum Grey',
    interiorColor: 'Black',
    specs: {
      engine: '1.2L Turbo',
      power: '130 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Sold',
    certified: true,
    warranty: null,
    features: ['Touchscreen', 'Comfort Seats', 'ABS', 'Airbags', 'Cruise Control'],
    images: [
      '/images/cars/citroen/c4-2.jpg',
    ],
    showroom: showrooms.deira,
    createdAt: '2024-01-04'
  },
  {
    id: 'DL-020',
    vin: 'VF7SAHMZ6MW678901',
    make: 'Citroen',
    model: 'C3',
    variant: 'Live',
    year: 2023,
    price: 72000,
    mileage: 16000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    color: 'Zest Yellow',
    interiorColor: 'Black',
    specs: {
      engine: '1.2L Turbo',
      power: '110 HP',
      seats: 5,
      regional: 'GCC'
    },
    status: 'Available',
    certified: false,
    warranty: '1-year warranty',
    features: ['Touchscreen', 'Bluetooth', 'ABS', 'Airbags'],
    images: [
      '/images/cars/citroen/c3-3.jpg',
    ],
    showroom: showrooms.abudhabi,
    createdAt: '2024-01-02'
  }
]

// Helper functions
export const getCarById = (id: string) => cars.find(car => car.id === id)

export const getCarsByMake = (make: string) => cars.filter(car => car.make === make)

export const getAvailableCars = () => cars.filter(car => car.status === 'Available')

export const getCertifiedCars = () => cars.filter(car => car.certified)

export const getCarsByBodyType = (bodyType: string) => 
  cars.filter(car => car.bodyType === bodyType)

export const getSimilarCars = (car: Car, limit = 4) => 
  cars
    .filter(c => c.id !== car.id && c.status !== 'Sold' && (c.make === car.make || c.bodyType === car.bodyType))
    .slice(0, limit)

// Filter options derived from data
export const filterOptions = {
  makes: ['Suzuki', 'Citroen'] as const,
  bodyTypes: [...new Set(cars.map(c => c.bodyType))],
  fuelTypes: [...new Set(cars.map(c => c.fuelType))],
  transmissions: [...new Set(cars.map(c => c.transmission))],
  specs: [...new Set(cars.map(c => c.specs.regional))],
  years: {
    min: Math.min(...cars.map(c => c.year)),
    max: Math.max(...cars.map(c => c.year))
  },
  prices: {
    min: Math.min(...cars.map(c => c.price)),
    max: Math.max(...cars.map(c => c.price))
  },
  mileages: {
    min: Math.min(...cars.map(c => c.mileage)),
    max: Math.max(...cars.map(c => c.mileage))
  }
}
