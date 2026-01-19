'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check, Camera, Car, AlertCircle } from 'lucide-react'
import { cn, formatVIN, isValidVIN, formatPrice } from '@/lib/utils'

type Step = 'vin' | 'confirm' | 'details' | 'photos' | 'damage' | 'result'

export default function SellValuationPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [currentStep, setCurrentStep] = useState<Step>('vin')
  const [vin, setVin] = useState('')
  const [mileage, setMileage] = useState('')
  const [condition, setCondition] = useState('')
  const [damages, setDamages] = useState<string[]>([])
  
  const steps: Step[] = ['vin', 'confirm', 'details', 'photos', 'damage', 'result']
  const stepIndex = steps.indexOf(currentStep)
  
  // Mock decoded vehicle data
  const decodedVehicle = {
    make: 'Suzuki',
    model: 'Swift',
    year: 2021,
    variant: 'GL',
    engine: '1.2L Petrol',
    transmission: 'Automatic',
  }
  
  // Mock valuation result
  const valuation = {
    low: 42000,
    mid: 47000,
    high: 52000,
  }
  
  const goNext = () => {
    const nextIndex = stepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex])
    }
  }
  
  const goBack = () => {
    const prevIndex = stepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex])
    }
  }
  
  const toggleDamage = (area: string) => {
    setDamages(prev => 
      prev.includes(area) 
        ? prev.filter(d => d !== area)
        : [...prev, area]
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{t.pageTitle}</h1>
          <p className="text-gray-300">{t.pageSubtitle}</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  i < stepIndex ? 'bg-green-500 text-white' : 
                  i === stepIndex ? 'bg-secondary text-white' : 
                  'bg-gray-200 text-gray-500'
                )}>
                  {i < stepIndex ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={cn(
                    'w-8 md:w-16 h-1 mx-1',
                    i < stepIndex ? 'bg-green-500' : 'bg-gray-200'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Step Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: VIN Input */}
          {currentStep === 'vin' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-2">{t.vinTitle}</h2>
              <p className="text-muted-foreground mb-6">{t.vinSubtitle}</p>
              
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(formatVIN(e.target.value).slice(0, 17))}
                placeholder="JSAAZC83S00123456"
                className="form-input text-lg tracking-wider font-mono"
                maxLength={17}
              />
              
              <p className="text-sm text-muted-foreground mt-2">
                {vin.length}/17 {t.characters}
              </p>
              
              {/* VIN location help */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-2">{t.whereVin}</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t.vinLocation1}</li>
                  <li>• {t.vinLocation2}</li>
                  <li>• {t.vinLocation3}</li>
                </ul>
              </div>
              
              <button 
                onClick={goNext}
                disabled={!isValidVIN(vin)}
                className="btn-secondary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.continue} <ChevronRight className="w-5 h-5 inline ml-1" />
              </button>
            </div>
          )}
          
          {/* Step 2: Confirm Vehicle */}
          {currentStep === 'confirm' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">{t.confirmTitle}</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Car className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {decodedVehicle.year} {decodedVehicle.make} {decodedVehicle.model}
                    </h3>
                    <p className="text-muted-foreground">{decodedVehicle.variant}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {decodedVehicle.engine} • {decodedVehicle.transmission}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-muted-foreground mb-6">{t.isThisYourCar}</p>
              
              <div className="flex gap-4">
                <button onClick={goBack} className="btn-outline flex-1">
                  {t.noEdit}
                </button>
                <button onClick={goNext} className="btn-secondary flex-1">
                  {t.yesContinue}
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Mileage & Condition */}
          {currentStep === 'details' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">{t.detailsTitle}</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="form-label">{t.mileage}</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      placeholder="45000"
                      className="form-input pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">km</span>
                  </div>
                </div>
                
                <div>
                  <label className="form-label">{t.condition}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Excellent', 'Good', 'Fair', 'Poor'].map(cond => (
                      <button
                        key={cond}
                        onClick={() => setCondition(cond)}
                        className={cn(
                          'p-4 border rounded-lg text-center transition-colors',
                          condition === cond 
                            ? 'border-secondary bg-secondary/10 text-secondary' 
                            : 'hover:border-gray-300'
                        )}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button onClick={goBack} className="btn-outline flex-1">
                  <ChevronLeft className="w-5 h-5 inline mr-1" /> {t.back}
                </button>
                <button 
                  onClick={goNext} 
                  disabled={!mileage || !condition}
                  className="btn-secondary flex-1 disabled:opacity-50"
                >
                  {t.continue} <ChevronRight className="w-5 h-5 inline ml-1" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 4: Photos */}
          {currentStep === 'photos' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-2">{t.photosTitle}</h2>
              <p className="text-muted-foreground mb-6">{t.photosSubtitle}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Front', 'Rear', 'Left Side', 'Right Side', 'Interior', 'Dashboard'].map(angle => (
                  <button
                    key={angle}
                    className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 hover:border-secondary hover:bg-secondary/5 transition-colors"
                  >
                    <Camera className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-muted-foreground">{angle}</span>
                  </button>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {t.photosNote}
              </p>
              
              <div className="flex gap-4 mt-8">
                <button onClick={goBack} className="btn-outline flex-1">
                  <ChevronLeft className="w-5 h-5 inline mr-1" /> {t.back}
                </button>
                <button onClick={goNext} className="btn-secondary flex-1">
                  {t.continue} <ChevronRight className="w-5 h-5 inline ml-1" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 5: Damage Marking */}
          {currentStep === 'damage' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-2">{t.damageTitle}</h2>
              <p className="text-muted-foreground mb-6">{t.damageSubtitle}</p>
              
              {/* Simple damage stencil */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  {[
                    'Front Bumper', 'Hood', 'Roof',
                    'Left Fender', 'Windshield', 'Right Fender',
                    'Left Door', 'Rear Window', 'Right Door',
                    'Left Rear', 'Trunk', 'Right Rear',
                    'Rear Bumper', 'Undercarriage', 'Wheels'
                  ].map(area => (
                    <button
                      key={area}
                      onClick={() => toggleDamage(area)}
                      className={cn(
                        'p-3 rounded border text-xs font-medium transition-colors',
                        damages.includes(area)
                          ? 'bg-red-100 border-red-300 text-red-700'
                          : 'bg-white hover:border-gray-300'
                      )}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
              
              {damages.length > 0 && (
                <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg mb-6">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">{t.damagesMarked}: {damages.length}</p>
                    <p className="text-sm text-yellow-700">{damages.join(', ')}</p>
                  </div>
                </div>
              )}
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={damages.length === 0}
                  onChange={() => setDamages([])}
                  className="rounded"
                />
                <span>{t.noDamage}</span>
              </label>
              
              <div className="flex gap-4 mt-8">
                <button onClick={goBack} className="btn-outline flex-1">
                  <ChevronLeft className="w-5 h-5 inline mr-1" /> {t.back}
                </button>
                <button onClick={goNext} className="btn-secondary flex-1">
                  {t.getValuation} <ChevronRight className="w-5 h-5 inline ml-1" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 6: Result */}
          {currentStep === 'result' && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{t.resultTitle}</h2>
              <p className="text-muted-foreground mb-8">{t.resultSubtitle}</p>
              
              <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-8 text-white mb-8">
                <p className="text-sm opacity-80 mb-2">{t.estimatedValue}</p>
                <p className="text-4xl font-bold">
                  {formatPrice(valuation.low)} - {formatPrice(valuation.high)}
                </p>
                <p className="text-sm opacity-80 mt-2">{t.basedOnMarket}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
                <h3 className="font-semibold mb-3">{t.vehicleSummary}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">{t.vehicle}:</span>
                  <span>{decodedVehicle.year} {decodedVehicle.make} {decodedVehicle.model}</span>
                  <span className="text-muted-foreground">{t.mileage}:</span>
                  <span>{mileage} km</span>
                  <span className="text-muted-foreground">{t.condition}:</span>
                  <span>{condition}</span>
                  <span className="text-muted-foreground">{t.damages}:</span>
                  <span>{damages.length > 0 ? damages.length + ' areas' : 'None'}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">{t.finalNote}</p>
              
              <div className="flex gap-4">
                <button className="btn-outline flex-1">
                  {t.scheduleInspection}
                </button>
                <button className="btn-secondary flex-1">
                  {t.getInstantOffer}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Sell Your Car',
    pageSubtitle: 'Get an instant valuation in just a few steps',
    vinTitle: 'Enter Your VIN',
    vinSubtitle: 'Your 17-character Vehicle Identification Number',
    characters: 'characters',
    whereVin: 'Where to find your VIN?',
    vinLocation1: 'Dashboard (visible through windshield)',
    vinLocation2: 'Driver\'s side door jamb',
    vinLocation3: 'Vehicle registration card',
    continue: 'Continue',
    back: 'Back',
    confirmTitle: 'Confirm Your Vehicle',
    isThisYourCar: 'Is this your car?',
    noEdit: 'No, Edit Details',
    yesContinue: 'Yes, Continue',
    detailsTitle: 'Vehicle Details',
    mileage: 'Current Mileage',
    condition: 'Overall Condition',
    photosTitle: 'Upload Photos',
    photosSubtitle: 'Take clear photos from these angles',
    photosNote: 'Photos are optional but help us give a more accurate valuation',
    damageTitle: 'Mark Any Damage',
    damageSubtitle: 'Tap areas with visible damage',
    damagesMarked: 'Damages marked',
    noDamage: 'No visible damage',
    getValuation: 'Get Valuation',
    resultTitle: 'Your Valuation is Ready!',
    resultSubtitle: 'Based on current market conditions',
    estimatedValue: 'Estimated Value',
    basedOnMarket: 'Based on current UAE market data',
    vehicleSummary: 'Vehicle Summary',
    vehicle: 'Vehicle',
    damages: 'Damages',
    finalNote: 'Final price will be confirmed after physical inspection',
    scheduleInspection: 'Schedule Inspection',
    getInstantOffer: 'Get Instant Offer',
  },
  ar: {
    pageTitle: 'بيع سيارتك',
    pageSubtitle: 'احصل على تقييم فوري في خطوات بسيطة',
    vinTitle: 'أدخل رقم الهيكل',
    vinSubtitle: 'رقم تعريف السيارة المكون من 17 حرفاً',
    characters: 'حرف',
    whereVin: 'أين تجد رقم الهيكل؟',
    vinLocation1: 'لوحة القيادة (مرئي من الزجاج الأمامي)',
    vinLocation2: 'إطار باب السائق',
    vinLocation3: 'بطاقة تسجيل السيارة',
    continue: 'استمرار',
    back: 'رجوع',
    confirmTitle: 'تأكيد سيارتك',
    isThisYourCar: 'هل هذه سيارتك؟',
    noEdit: 'لا، تعديل التفاصيل',
    yesContinue: 'نعم، استمرار',
    detailsTitle: 'تفاصيل السيارة',
    mileage: 'المسافة المقطوعة الحالية',
    condition: 'الحالة العامة',
    photosTitle: 'رفع الصور',
    photosSubtitle: 'التقط صور واضحة من هذه الزوايا',
    photosNote: 'الصور اختيارية لكنها تساعد في إعطاء تقييم أدق',
    damageTitle: 'حدد أي ضرر',
    damageSubtitle: 'اضغط على المناطق التي بها ضرر مرئي',
    damagesMarked: 'الأضرار المحددة',
    noDamage: 'لا يوجد ضرر مرئي',
    getValuation: 'احصل على التقييم',
    resultTitle: 'تقييمك جاهز!',
    resultSubtitle: 'بناءً على ظروف السوق الحالية',
    estimatedValue: 'القيمة التقديرية',
    basedOnMarket: 'بناءً على بيانات سوق الإمارات الحالية',
    vehicleSummary: 'ملخص السيارة',
    vehicle: 'السيارة',
    damages: 'الأضرار',
    finalNote: 'سيتم تأكيد السعر النهائي بعد الفحص الفعلي',
    scheduleInspection: 'حجز موعد الفحص',
    getInstantOffer: 'احصل على عرض فوري',
  }
}
