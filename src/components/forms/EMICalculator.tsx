'use client'

import { useState, useMemo } from 'react'
import { Calculator, Info } from 'lucide-react'
import { formatPrice, calculateEMI, calculateTotalInterest } from '@/lib/utils'

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
  
  const calculations = useMemo(() => {
    const downPayment = downPaymentType === 'percent' 
      ? (price * downPaymentValue / 100)
      : downPaymentValue
    
    const loanAmount = price - downPayment
    const emi = calculateEMI(loanAmount, rate, tenure)
    const totalInterest = calculateTotalInterest(loanAmount, rate, tenure)
    const totalAmount = loanAmount + totalInterest
    
    return {
      downPayment,
      loanAmount,
      emi,
      totalInterest,
      totalAmount,
      principalPercent: Math.round((loanAmount / totalAmount) * 100),
      interestPercent: Math.round((totalInterest / totalAmount) * 100),
    }
  }, [price, downPaymentType, downPaymentValue, tenure, rate])
  
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
              <span className="text-muted-foreground">{t.loanAmount}</span>
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
    loanAmount: 'Loan Amount',
    totalInterest: 'Total Interest',
    totalAmount: 'Total Amount Payable',
    applyNow: 'Apply for Financing',
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
    loanAmount: 'مبلغ القرض',
    totalInterest: 'إجمالي الفائدة',
    totalAmount: 'إجمالي المبلغ المستحق',
    applyNow: 'تقديم طلب التمويل',
  }
}
