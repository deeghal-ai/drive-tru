'use client'

import { useState, useMemo } from 'react'
import { Calculator, Info, Shield } from 'lucide-react'
import { formatPrice, calculateEMI, calculateTotalInterest } from '@/lib/utils'

// Insurance coverage types with rate multipliers
const coverageTypes = [
  { 
    id: 'comprehensive', 
    name: { en: 'Comprehensive', ar: 'شامل' },
    description: { en: 'Full coverage including accidents, theft & fire', ar: 'تغطية كاملة تشمل الحوادث والسرقة والحريق' },
    rate: 0.025 
  },
  { 
    id: 'thirdParty', 
    name: { en: 'Third Party', ar: 'طرف ثالث' },
    description: { en: 'Covers damage to other vehicles only', ar: 'يغطي الأضرار للمركبات الأخرى فقط' },
    rate: 0.01 
  },
  { 
    id: 'thirdPartyFire', 
    name: { en: 'Third Party + Fire/Theft', ar: 'طرف ثالث + حريق/سرقة' },
    description: { en: 'Third party plus fire and theft protection', ar: 'طرف ثالث بالإضافة لحماية الحريق والسرقة' },
    rate: 0.015 
  },
]

interface EMICalculatorProps {
  locale: string
  defaultPrice?: number
  compact?: boolean
}

export function EMICalculator({ locale, defaultPrice = 75000, compact = false }: EMICalculatorProps) {
  const isArabic = locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [price, setPrice] = useState(defaultPrice)
  const [downPaymentType, setDownPaymentType] = useState<'amount' | 'percent'>('percent')
  const [downPaymentValue, setDownPaymentValue] = useState(20)
  const [tenure, setTenure] = useState(60)
  const [rate, setRate] = useState(3.99)
  
  // Insurance state
  const [includeInsurance, setIncludeInsurance] = useState(false)
  const [coverageType, setCoverageType] = useState('comprehensive')
  
  const calculations = useMemo(() => {
    const downPayment = downPaymentType === 'percent' 
      ? (price * downPaymentValue / 100)
      : downPaymentValue
    
    // Calculate insurance premium based on vehicle price and coverage type
    const selectedCoverage = coverageTypes.find(c => c.id === coverageType)
    const insurancePremium = includeInsurance && selectedCoverage 
      ? Math.round(price * selectedCoverage.rate)
      : 0
    
    // Add insurance premium to loan amount if included
    const baseLoanAmount = price - downPayment
    const loanAmount = baseLoanAmount + insurancePremium
    
    const emi = calculateEMI(loanAmount, rate, tenure)
    const totalInterest = calculateTotalInterest(loanAmount, rate, tenure)
    const totalAmount = loanAmount + totalInterest
    
    return {
      downPayment,
      baseLoanAmount,
      insurancePremium,
      loanAmount,
      emi,
      totalInterest,
      totalAmount,
      principalPercent: Math.round((loanAmount / totalAmount) * 100),
      interestPercent: Math.round((totalInterest / totalAmount) * 100),
    }
  }, [price, downPaymentType, downPaymentValue, tenure, rate, includeInsurance, coverageType])
  
  if (compact) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-secondary" />
          <span className="font-semibold">{t.quickCalc}</span>
        </div>
        <div className="text-2xl font-bold text-primary mb-1">
          {formatPrice(calculations.emi)}<span className="text-sm font-normal text-muted-foreground">/{t.month}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t.downPayment}: {formatPrice(calculations.downPayment)} ({downPaymentValue}%)
        </p>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{t.title}</h2>
          <p className="text-muted-foreground text-sm">{t.subtitle}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Vehicle Price */}
          <div>
            <label className="form-label">{t.vehiclePrice}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">AED</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-input pl-14"
              />
            </div>
          </div>
          
          {/* Down Payment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="form-label mb-0">{t.downPayment}</label>
              <div className="flex border rounded overflow-hidden text-sm">
                <button
                  onClick={() => setDownPaymentType('percent')}
                  className={`px-3 py-1 ${downPaymentType === 'percent' ? 'bg-primary text-white' : ''}`}
                >
                  %
                </button>
                <button
                  onClick={() => setDownPaymentType('amount')}
                  className={`px-3 py-1 ${downPaymentType === 'amount' ? 'bg-primary text-white' : ''}`}
                >
                  AED
                </button>
              </div>
            </div>
            <input
              type="number"
              value={downPaymentValue}
              onChange={(e) => setDownPaymentValue(Number(e.target.value))}
              className="form-input"
            />
            {downPaymentType === 'percent' && (
              <input
                type="range"
                min={0}
                max={50}
                value={downPaymentValue}
                onChange={(e) => setDownPaymentValue(Number(e.target.value))}
                className="w-full mt-2"
              />
            )}
          </div>
          
          {/* Loan Tenure */}
          <div>
            <label className="form-label">{t.loanTenure}: {tenure} {t.months}</label>
            <input
              type="range"
              min={12}
              max={84}
              step={12}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>12</span>
              <span>24</span>
              <span>36</span>
              <span>48</span>
              <span>60</span>
              <span>72</span>
              <span>84</span>
            </div>
          </div>
          
          {/* Interest Rate */}
          <div>
            <label className="form-label">{t.interestRate}</label>
            <div className="relative">
              <input
                type="number"
                step={0.01}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="form-input pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Info className="w-3 h-3" />
              {t.rateNote}
            </p>
          </div>
          
          {/* Insurance Option */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">{t.includeInsurance}</span>
              </div>
              <button
                type="button"
                onClick={() => setIncludeInsurance(!includeInsurance)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  includeInsurance ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    includeInsurance ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {/* Coverage Type Selection - Always visible when insurance is enabled */}
            <div 
              className="space-y-3 overflow-hidden transition-all duration-300"
              style={{ 
                maxHeight: includeInsurance ? '500px' : '0px',
                opacity: includeInsurance ? 1 : 0 
              }}
            >
              <p className="text-sm font-semibold text-gray-700 mb-2">Select Coverage Type:</p>
              
              {coverageTypes.map((coverage) => (
                <label
                  key={coverage.id}
                  className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    coverageType === coverage.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="insuranceCoverage"
                    value={coverage.id}
                    checked={coverageType === coverage.id}
                    onChange={(e) => setCoverageType(e.target.value)}
                    className="w-4 h-4 mt-0.5 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm">
                        {isArabic ? coverage.name.ar : coverage.name.en}
                      </span>
                      <span className="text-xs text-emerald-600 font-medium whitespace-nowrap">
                        {(coverage.rate * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isArabic ? coverage.description.ar : coverage.description.en}
                    </p>
                  </div>
                </label>
              ))}
              
              {/* Insurance Premium Preview */}
              <div className="bg-emerald-50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm text-emerald-800">{t.estimatedPremium}</span>
                <span className="font-semibold text-emerald-700">{formatPrice(calculations.insurancePremium)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div>
          {/* EMI Result */}
          <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white mb-6">
            <p className="text-sm opacity-80 mb-1">{t.monthlyEMI}</p>
            <p className="text-4xl font-bold">{formatPrice(calculations.emi)}</p>
            <p className="text-sm opacity-80 mt-1">{t.perMonth}</p>
          </div>
          
          {/* Donut Chart Visualization */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1a1a2e"
                  strokeWidth="3"
                  strokeDasharray={`${calculations.principalPercent}, 100`}
                />
              </svg>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span className="text-sm">{t.principal}: {calculations.principalPercent}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded" />
                <span className="text-sm">{t.interest}: {calculations.interestPercent}%</span>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">{t.vehicleLoan}</span>
              <span className="font-semibold">{formatPrice(calculations.baseLoanAmount)}</span>
            </div>
            {includeInsurance && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  {t.insurancePremium}
                </span>
                <span className="font-semibold text-emerald-600">{formatPrice(calculations.insurancePremium)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">{t.totalLoanAmount}</span>
              <span className="font-semibold">{formatPrice(calculations.loanAmount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">{t.totalInterest}</span>
              <span className="font-semibold">{formatPrice(calculations.totalInterest)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">{t.totalAmount}</span>
              <span className="font-bold text-lg">{formatPrice(calculations.totalAmount)}</span>
            </div>
          </div>
          
          {/* CTA */}
          <button className="btn-secondary w-full mt-6">
            {t.applyNow}
          </button>
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    title: 'EMI Calculator',
    subtitle: 'Calculate your monthly payments',
    quickCalc: 'Quick EMI',
    month: 'mo',
    vehiclePrice: 'Vehicle Price (AED)',
    downPayment: 'Down Payment',
    loanTenure: 'Loan Tenure',
    months: 'months',
    interestRate: 'Interest Rate (% p.a.)',
    rateNote: 'Rate varies based on bank and eligibility',
    monthlyEMI: 'Your Monthly EMI',
    perMonth: 'per month',
    principal: 'Principal',
    interest: 'Interest',
    vehicleLoan: 'Vehicle Loan',
    insurancePremium: 'Insurance Premium',
    totalLoanAmount: 'Total Loan Amount',
    totalInterest: 'Total Interest',
    totalAmount: 'Total Amount Payable',
    applyNow: 'Apply for Financing',
    includeInsurance: 'Include Insurance in Financing',
    estimatedPremium: 'Estimated Annual Premium',
  },
  ar: {
    title: 'حاسبة القسط',
    subtitle: 'احسب أقساطك الشهرية',
    quickCalc: 'حساب سريع',
    month: 'شهر',
    vehiclePrice: 'سعر السيارة (درهم)',
    downPayment: 'الدفعة الأولى',
    loanTenure: 'مدة القرض',
    months: 'شهر',
    interestRate: 'نسبة الفائدة (% سنوياً)',
    rateNote: 'تختلف النسبة حسب البنك والأهلية',
    monthlyEMI: 'القسط الشهري',
    perMonth: 'شهرياً',
    principal: 'المبلغ الأساسي',
    interest: 'الفائدة',
    vehicleLoan: 'قرض السيارة',
    insurancePremium: 'قسط التأمين',
    totalLoanAmount: 'إجمالي مبلغ القرض',
    totalInterest: 'إجمالي الفائدة',
    totalAmount: 'إجمالي المبلغ المستحق',
    applyNow: 'تقديم طلب التمويل',
    includeInsurance: 'تضمين التأمين في التمويل',
    estimatedPremium: 'قسط التأمين السنوي التقديري',
  }
}
