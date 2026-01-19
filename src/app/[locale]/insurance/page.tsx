'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Car, 
  CheckCircle, 
  Phone, 
  Mail,
  ArrowRight,
  Zap,
  Clock,
  FileText,
  AlertTriangle,
  Wrench,
  Truck,
  BadgeCheck,
  ChevronDown,
  Calculator
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuoteForm {
  vehicleValue: string
  vehicleAge: string
  coverageType: string
  driverAge: string
  claimsHistory: string
}

const initialQuoteForm: QuoteForm = {
  vehicleValue: '',
  vehicleAge: '0-2',
  coverageType: 'comprehensive',
  driverAge: '25-35',
  claimsHistory: 'none'
}

const insurancePartners = [
  { name: 'Oman Insurance', logo: '🛡️' },
  { name: 'AXA Gulf', logo: '🔵' },
  { name: 'RSA Insurance', logo: '🔴' },
  { name: 'Orient Insurance', logo: '🟠' },
  { name: 'Salama Insurance', logo: '🟢' },
  { name: 'Dubai Insurance', logo: '🔷' },
]

const coverageTypes = [
  { 
    id: 'comprehensive', 
    name: 'Comprehensive', 
    description: 'Full coverage including accidents, theft, fire, and third party',
    popular: true,
    multiplier: 1.0
  },
  { 
    id: 'thirdParty', 
    name: 'Third Party', 
    description: 'Covers damage to other vehicles and property only',
    popular: false,
    multiplier: 0.4
  },
  { 
    id: 'thirdPartyFire', 
    name: 'Third Party + Fire & Theft', 
    description: 'Third party coverage plus protection against fire and theft',
    popular: false,
    multiplier: 0.6
  },
]

const addOns = [
  { id: 'roadside', name: 'Roadside Assistance', price: 150, icon: Truck },
  { id: 'agency', name: 'Agency Repair', price: 500, icon: Wrench },
  { id: 'replacement', name: 'Replacement Car', price: 300, icon: Car },
  { id: 'personal', name: 'Personal Accident', price: 200, icon: Shield },
]

const benefits = [
  { 
    icon: Zap, 
    title: 'Instant Quotes', 
    description: 'Get multiple quotes from top insurers in seconds' 
  },
  { 
    icon: BadgeCheck, 
    title: 'Best Rates Guaranteed', 
    description: 'We compare prices to ensure you get the best deal' 
  },
  { 
    icon: Clock, 
    title: '24/7 Claims Support', 
    description: 'Round-the-clock assistance for all your claims' 
  },
  { 
    icon: FileText, 
    title: 'Hassle-Free Process', 
    description: 'We handle all paperwork and renewals for you' 
  },
]

const faqs = [
  {
    q: 'What documents do I need for car insurance?',
    a: 'You\'ll need your Emirates ID, vehicle registration card (Mulkiya), driving license, and for new cars, the invoice or purchase agreement.'
  },
  {
    q: 'What is the difference between comprehensive and third-party insurance?',
    a: 'Comprehensive insurance covers your car and third parties for accidents, theft, fire, and natural disasters. Third-party only covers damage you cause to others\' vehicles and property.'
  },
  {
    q: 'How long does it take to get insured?',
    a: 'Once you select a quote and provide documents, your policy can be issued within 30 minutes to 2 hours during business hours.'
  },
  {
    q: 'Can I transfer my No Claims Discount?',
    a: 'Yes, you can transfer your no-claims bonus from your previous insurer. Just provide a letter confirming your claims history.'
  },
]

export default function InsurancePage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const [quoteForm, setQuoteForm] = useState<QuoteForm>(initialQuoteForm)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['roadside'])
  const [showQuote, setShowQuote] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const isArabic = params.locale === 'ar'
  
  const updateField = (field: keyof QuoteForm, value: string) => {
    setQuoteForm(prev => ({ ...prev, [field]: value }))
    setShowQuote(false)
  }
  
  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }
  
  const calculateQuote = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setIsCalculating(false)
      setShowQuote(true)
    }, 1500)
  }
  
  // Calculate premium based on form values
  const getQuote = () => {
    const vehicleValue = parseInt(quoteForm.vehicleValue) || 0
    const coverage = coverageTypes.find(c => c.id === quoteForm.coverageType)
    
    // Base rate: 2.5% for comprehensive
    let baseRate = 0.025 * (coverage?.multiplier || 1)
    
    // Adjust for vehicle age
    if (quoteForm.vehicleAge === '2-5') baseRate *= 1.1
    if (quoteForm.vehicleAge === '5+') baseRate *= 1.25
    
    // Adjust for driver age
    if (quoteForm.driverAge === 'under25') baseRate *= 1.3
    if (quoteForm.driverAge === '35+') baseRate *= 0.9
    
    // Adjust for claims history
    if (quoteForm.claimsHistory === '1claim') baseRate *= 1.2
    if (quoteForm.claimsHistory === '2+claims') baseRate *= 1.5
    
    const basePremium = Math.round(vehicleValue * baseRate)
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find(a => a.id === id)
      return sum + (addOn?.price || 0)
    }, 0)
    
    return {
      basePremium,
      addOnTotal,
      total: basePremium + addOnTotal,
      monthly: Math.round((basePremium + addOnTotal) / 12)
    }
  }
  
  const quote = getQuote()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
                🛡️ Car Insurance Made Easy
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Protect Your Drive with the Best Coverage
              </h1>
              <p className="text-xl text-emerald-100 mb-8 max-w-lg">
                Compare quotes from UAE's top insurers and save up to 25% on your car insurance. Get covered in minutes, not days.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#quote-calculator"
                  className="btn-primary bg-white text-emerald-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Get Instant Quote
                </a>
                <a 
                  href="tel:+97143001234"
                  className="btn-outline text-white border-white hover:bg-white hover:text-emerald-700 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">25%</div>
                  <div className="text-sm text-emerald-200">Avg. Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">6+</div>
                  <div className="text-sm text-emerald-200">Insurance Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-emerald-200">Policies Issued</div>
                </div>
              </div>
            </div>
            
            {/* Insurance Partners */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-lg font-semibold mb-6 text-center">Our Insurance Partners</h3>
                <div className="grid grid-cols-3 gap-4">
                  {insurancePartners.map((partner, i) => (
                    <div 
                      key={i}
                      className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors"
                    >
                      <div className="text-3xl mb-2">{partner.logo}</div>
                      <div className="text-xs">{partner.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Calculator */}
      <section id="quote-calculator" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Get Your Instant Quote</h2>
              <p className="text-muted-foreground">
                Answer a few questions and get competitive quotes in seconds
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Vehicle Value */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Value (AED)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        AED
                      </span>
                      <input
                        type="number"
                        value={quoteForm.vehicleValue}
                        onChange={(e) => updateField('vehicleValue', e.target.value)}
                        placeholder="e.g., 100000"
                        className="w-full pl-14 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Vehicle Age */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Age</label>
                    <select
                      value={quoteForm.vehicleAge}
                      onChange={(e) => updateField('vehicleAge', e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="0-2">Brand New - 2 Years</option>
                      <option value="2-5">2 - 5 Years</option>
                      <option value="5+">Over 5 Years</option>
                    </select>
                  </div>
                  
                  {/* Driver Age */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Driver Age</label>
                    <select
                      value={quoteForm.driverAge}
                      onChange={(e) => updateField('driverAge', e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="under25">Under 25</option>
                      <option value="25-35">25 - 35</option>
                      <option value="35+">Over 35</option>
                    </select>
                  </div>
                  
                  {/* Claims History */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Claims in Last 3 Years</label>
                    <select
                      value={quoteForm.claimsHistory}
                      onChange={(e) => updateField('claimsHistory', e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="none">No Claims</option>
                      <option value="1claim">1 Claim</option>
                      <option value="2+claims">2+ Claims</option>
                    </select>
                  </div>
                </div>
                
                {/* Coverage Type */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-3">Coverage Type</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {coverageTypes.map(coverage => (
                      <label
                        key={coverage.id}
                        className={cn(
                          'relative p-4 border-2 rounded-xl cursor-pointer transition-all',
                          quoteForm.coverageType === coverage.id 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="radio"
                          name="coverage"
                          value={coverage.id}
                          checked={quoteForm.coverageType === coverage.id}
                          onChange={(e) => updateField('coverageType', e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-semibold">{coverage.name}</span>
                          {coverage.popular && (
                            <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{coverage.description}</p>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Add-ons */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-3">Optional Add-ons</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {addOns.map(addOn => (
                      <label
                        key={addOn.id}
                        className={cn(
                          'p-3 border-2 rounded-xl cursor-pointer transition-all text-center',
                          selectedAddOns.includes(addOn.id)
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={() => toggleAddOn(addOn.id)}
                          className="sr-only"
                        />
                        <addOn.icon className={cn(
                          'w-6 h-6 mx-auto mb-2',
                          selectedAddOns.includes(addOn.id) ? 'text-emerald-600' : 'text-gray-400'
                        )} />
                        <p className="text-xs font-medium">{addOn.name}</p>
                        <p className="text-xs text-muted-foreground">+AED {addOn.price}</p>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Calculate Button */}
                <button
                  onClick={calculateQuote}
                  disabled={!quoteForm.vehicleValue || isCalculating}
                  className="w-full mt-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCalculating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      Calculate Quote
                    </>
                  )}
                </button>
              </div>
              
              {/* Quote Result */}
              {showQuote && quoteForm.vehicleValue && (
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Your Estimated Premium</h3>
                      <p className="text-emerald-100 text-sm">Based on the information provided</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">AED {quote.total.toLocaleString()}</div>
                      <div className="text-emerald-100 text-sm">per year</div>
                      <div className="text-emerald-200 text-sm mt-1">
                        or AED {quote.monthly.toLocaleString()}/month
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-emerald-200">Base Premium</p>
                      <p className="font-semibold">AED {quote.basePremium.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-emerald-200">Add-ons</p>
                      <p className="font-semibold">AED {quote.addOnTotal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-emerald-200">Coverage</p>
                      <p className="font-semibold capitalize">{quoteForm.coverageType}</p>
                    </div>
                    <div>
                      <p className="text-emerald-200">You Save</p>
                      <p className="font-semibold">Up to AED {Math.round(quote.total * 0.25).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                      Get Final Quote
                    </button>
                    <button className="flex-1 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                      Compare Plans
                    </button>
                  </div>
                  
                  <p className="text-xs text-emerald-200 mt-4 text-center">
                    * This is an estimate. Final premium may vary based on detailed vehicle inspection and policy terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Drive Tru Insurance?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make car insurance simple, affordable, and hassle-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Coverage Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Coverage Comparison</h2>
            <p className="text-muted-foreground">Understand what each plan covers</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left font-semibold">Coverage</th>
                    <th className="px-6 py-4 text-center font-semibold">Third Party</th>
                    <th className="px-6 py-4 text-center font-semibold">TP + Fire/Theft</th>
                    <th className="px-6 py-4 text-center font-semibold bg-emerald-50 text-emerald-700">Comprehensive</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: 'Third Party Liability', tp: true, tpft: true, comp: true },
                    { feature: 'Fire Damage', tp: false, tpft: true, comp: true },
                    { feature: 'Theft Protection', tp: false, tpft: true, comp: true },
                    { feature: 'Own Damage/Accident', tp: false, tpft: false, comp: true },
                    { feature: 'Natural Disasters', tp: false, tpft: false, comp: true },
                    { feature: 'Windscreen Cover', tp: false, tpft: false, comp: true },
                    { feature: 'Personal Accident', tp: false, tpft: false, comp: true },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.tp ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.tpft ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-emerald-50/50">
                        {row.comp ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about car insurance</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details 
                  key={i}
                  className="group bg-white rounded-xl shadow-sm border overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50">
                    <span className="font-semibold pr-4">{faq.q}</span>
                    <span className="text-2xl text-muted-foreground group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Insured?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get your free quote now and drive with confidence. Our team is here to help you find the perfect coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#quote-calculator"
              className="btn-primary bg-white text-emerald-700 hover:bg-gray-100"
            >
              Get Instant Quote
            </a>
            <Link 
              href={`/${params.locale}/tools/contact`}
              className="btn-outline text-white border-white hover:bg-white hover:text-emerald-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      {/* Prototype Note */}
      <div className="bg-blue-50 border-t border-blue-100 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-blue-800">
          <strong>Prototype Note:</strong> This is a demo. In production, quotes would be fetched from actual insurance partner APIs.
        </div>
      </div>
    </div>
  )
}
