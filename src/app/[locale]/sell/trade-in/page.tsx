// Trade-in Page - Drive Life
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cars, Car } from '@/data/cars'
import { 
  ArrowRight, 
  ArrowLeft,
  Car as CarIcon, 
  RefreshCw, 
  DollarSign, 
  CheckCircle,
  Search,
  X
} from 'lucide-react'

export default function TradeInPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [step, setStep] = useState(1)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [tradeInDetails, setTradeInDetails] = useState({
    make: '',
    model: '',
    year: '2020',
    mileage: '',
    condition: 'Good'
  })
  const [showResult, setShowResult] = useState(false)
  
  const availableCars = cars.filter(c => c.status === 'Available')
  
  const filteredCars = availableCars.filter(car => 
    car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    if (step === 2) {
      setShowResult(true)
    }
  }
  
  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    setShowResult(false)
  }
  
  // Mock valuation based on inputs
  const tradeInValue = {
    min: 35000,
    max: 42000
  }
  
  const netPayable = selectedCar 
    ? selectedCar.price - tradeInValue.max 
    : 0
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{t.pageTitle}</h1>
              <p className="text-gray-300">{t.pageSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { num: 1, label: t.step1 },
              { num: 2, label: t.step2 },
              { num: 3, label: t.step3 }
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 md:gap-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${step >= s.num ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                </div>
                <span className={`hidden md:block text-sm ${step >= s.num ? 'text-primary font-medium' : 'text-gray-500'}`}>
                  {s.label}
                </span>
                {i < 2 && (
                  <div className={`w-12 md:w-24 h-1 rounded ${step > s.num ? 'bg-secondary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Step 1: Select Car to Buy */}
        {step === 1 && (
          <div>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">{t.selectCarTitle}</h2>
              <p className="text-muted-foreground mb-6">{t.selectCarDesc}</p>
              
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              
              {/* Selected Car Preview */}
              {selectedCar && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedCar.images[0]} 
                      alt={`${selectedCar.make} ${selectedCar.model}`}
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-semibold">{selectedCar.year} {selectedCar.make} {selectedCar.model}</div>
                      <div className="text-green-600 font-bold">AED {selectedCar.price.toLocaleString()}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCar(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              
              {/* Car Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredCars.slice(0, 9).map(car => (
                  <div 
                    key={car.id}
                    onClick={() => setSelectedCar(car)}
                    className={`
                      border rounded-xl p-4 cursor-pointer transition-all
                      ${selectedCar?.id === car.id 
                        ? 'border-secondary bg-secondary/5 ring-2 ring-secondary' 
                        : 'hover:border-secondary hover:shadow-md'
                      }
                    `}
                  >
                    <img 
                      src={car.images[0]} 
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <div className="font-semibold text-sm">{car.year} {car.make} {car.model}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {car.mileage.toLocaleString()} km • {car.transmission}
                    </div>
                    <div className="text-secondary font-bold mt-2">
                      AED {car.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Link 
                  href={`/${params.locale}/buy/cars`}
                  className="btn-outline"
                >
                  {t.viewAllCars}
                </Link>
                <button 
                  onClick={handleNext}
                  disabled={!selectedCar}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {t.continueBtn}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Enter Trade-in Details */}
        {step === 2 && !showResult && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{t.tradeInTitle}</h2>
            <p className="text-muted-foreground mb-6">{t.tradeInDesc}</p>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.make}</label>
                    <select 
                      value={tradeInDetails.make}
                      onChange={(e) => setTradeInDetails({...tradeInDetails, make: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary"
                    >
                      <option value="">{t.selectMake}</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="Citroen">Citroen</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Honda">Honda</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Kia">Kia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.model}</label>
                    <input 
                      type="text"
                      value={tradeInDetails.model}
                      onChange={(e) => setTradeInDetails({...tradeInDetails, model: e.target.value})}
                      placeholder={t.enterModel}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.year}</label>
                    <select 
                      value={tradeInDetails.year}
                      onChange={(e) => setTradeInDetails({...tradeInDetails, year: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary"
                    >
                      {Array.from({length: 15}, (_, i) => 2024 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.mileage}</label>
                    <input 
                      type="number"
                      value={tradeInDetails.mileage}
                      onChange={(e) => setTradeInDetails({...tradeInDetails, mileage: e.target.value})}
                      placeholder={t.enterMileage}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t.condition}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Excellent', 'Good', 'Fair', 'Poor'].map(cond => (
                      <button
                        key={cond}
                        onClick={() => setTradeInDetails({...tradeInDetails, condition: cond})}
                        className={`
                          py-3 px-4 border rounded-lg text-sm font-medium transition-all
                          ${tradeInDetails.condition === cond 
                            ? 'border-secondary bg-secondary text-white' 
                            : 'hover:border-secondary'
                          }
                        `}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t flex justify-between">
                <button onClick={handleBack} className="btn-outline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {t.backBtn}
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!tradeInDetails.make || !tradeInDetails.model}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {t.getValuation}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Results */}
        {(step === 2 && showResult) || step === 3 ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t.resultTitle}</h2>
              <p className="text-muted-foreground">{t.resultDesc}</p>
            </div>
            
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {/* Your Car Value */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium">{t.yourCar}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {tradeInDetails.year} {tradeInDetails.make} {tradeInDetails.model}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  AED {tradeInValue.min.toLocaleString()} - {tradeInValue.max.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{t.estimatedValue}</div>
              </div>
              
              {/* New Car */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CarIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium">{t.newCar}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {selectedCar?.year} {selectedCar?.make} {selectedCar?.model}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  AED {selectedCar?.price.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{t.carPrice}</div>
              </div>
              
              {/* You Pay */}
              <div className="bg-gradient-to-br from-secondary to-pink-600 text-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{t.youPay}</span>
                </div>
                <div className="text-sm opacity-80 mb-1">{t.afterTradeIn}</div>
                <div className="text-3xl font-bold">
                  AED {netPayable.toLocaleString()}
                </div>
                <div className="text-xs opacity-80 mt-1">{t.savingsNote}</div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-bold text-lg mb-4">{t.nextSteps}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-secondary">1</span>
                  </div>
                  <p className="text-sm">{t.nextStep1}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-secondary">2</span>
                  </div>
                  <p className="text-sm">{t.nextStep2}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-secondary">3</span>
                  </div>
                  <p className="text-sm">{t.nextStep3}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/971501234567?text=I'm interested in trading in my ${tradeInDetails.year} ${tradeInDetails.make} ${tradeInDetails.model} for ${selectedCar?.make} ${selectedCar?.model}`}
                  target="_blank"
                  className="btn-secondary flex items-center justify-center gap-2 flex-1"
                >
                  📱 {t.whatsappCTA}
                </a>
                <Link 
                  href={`/${params.locale}/tools/contact`}
                  className="btn-outline flex items-center justify-center gap-2 flex-1"
                >
                  {t.scheduleVisit}
                </Link>
              </div>
            </div>
            
            {/* Start Over */}
            <div className="text-center mt-6">
              <button 
                onClick={() => {
                  setStep(1)
                  setSelectedCar(null)
                  setShowResult(false)
                }}
                className="text-muted-foreground hover:text-primary text-sm"
              >
                ← {t.startOver}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Trade-in Your Car',
    pageSubtitle: 'Upgrade to a better car with instant trade-in value',
    step1: 'Choose New Car',
    step2: 'Your Trade-in',
    step3: 'Get Quote',
    selectCarTitle: 'Select the car you want to buy',
    selectCarDesc: 'Choose from our certified pre-owned inventory',
    searchPlaceholder: 'Search by make or model...',
    viewAllCars: 'View All Cars',
    continueBtn: 'Continue',
    backBtn: 'Back',
    tradeInTitle: 'Tell us about your car',
    tradeInDesc: 'Enter your current vehicle details for an instant valuation',
    make: 'Make',
    selectMake: 'Select Make',
    model: 'Model',
    enterModel: 'Enter model name',
    year: 'Year',
    mileage: 'Mileage (km)',
    enterMileage: 'Enter mileage',
    condition: 'Condition',
    getValuation: 'Get Valuation',
    resultTitle: 'Your Trade-in Summary',
    resultDesc: 'Here\'s what your upgrade looks like',
    yourCar: 'Your Car Value',
    estimatedValue: 'Estimated trade-in value',
    newCar: 'New Car',
    carPrice: 'Listed price',
    youPay: 'You Pay',
    afterTradeIn: 'After trade-in',
    savingsNote: 'Save up to AED 42,000!',
    nextSteps: 'Next Steps',
    nextStep1: 'Schedule a visit to our showroom for vehicle inspection',
    nextStep2: 'Get your final trade-in value after inspection',
    nextStep3: 'Complete the purchase with financing options if needed',
    whatsappCTA: 'WhatsApp Us',
    scheduleVisit: 'Schedule a Visit',
    startOver: 'Start Over',
  },
  ar: {
    pageTitle: 'استبدل سيارتك',
    pageSubtitle: 'قم بالترقية إلى سيارة أفضل مع قيمة استبدال فورية',
    step1: 'اختر السيارة الجديدة',
    step2: 'سيارتك للاستبدال',
    step3: 'احصل على عرض',
    selectCarTitle: 'اختر السيارة التي تريد شراءها',
    selectCarDesc: 'اختر من مخزوننا المعتمد من السيارات المستعملة',
    searchPlaceholder: 'ابحث بالماركة أو الموديل...',
    viewAllCars: 'عرض جميع السيارات',
    continueBtn: 'متابعة',
    backBtn: 'رجوع',
    tradeInTitle: 'أخبرنا عن سيارتك',
    tradeInDesc: 'أدخل تفاصيل سيارتك الحالية للحصول على تقييم فوري',
    make: 'الماركة',
    selectMake: 'اختر الماركة',
    model: 'الموديل',
    enterModel: 'أدخل اسم الموديل',
    year: 'السنة',
    mileage: 'عداد الكيلومترات',
    enterMileage: 'أدخل عداد الكيلومترات',
    condition: 'الحالة',
    getValuation: 'احصل على التقييم',
    resultTitle: 'ملخص الاستبدال',
    resultDesc: 'هكذا تبدو صفقة الترقية الخاصة بك',
    yourCar: 'قيمة سيارتك',
    estimatedValue: 'قيمة الاستبدال التقديرية',
    newCar: 'السيارة الجديدة',
    carPrice: 'السعر المدرج',
    youPay: 'تدفع',
    afterTradeIn: 'بعد الاستبدال',
    savingsNote: 'وفر حتى 42,000 درهم!',
    nextSteps: 'الخطوات التالية',
    nextStep1: 'جدول زيارة لمعرضنا لفحص السيارة',
    nextStep2: 'احصل على قيمة الاستبدال النهائية بعد الفحص',
    nextStep3: 'أكمل الشراء مع خيارات التمويل إذا لزم الأمر',
    whatsappCTA: 'واتساب',
    scheduleVisit: 'جدول زيارة',
    startOver: 'ابدأ من جديد',
  }
}
