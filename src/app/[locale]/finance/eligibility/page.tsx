'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Briefcase, 
  DollarSign, 
  Phone,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  // Step 1: Personal
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  emiratesId: string
  dateOfBirth: string
  
  // Step 2: Employment
  employmentType: string
  employerName: string
  jobTitle: string
  employmentDuration: string
  workAddress: string
  
  // Step 3: Income
  monthlySalary: string
  additionalIncome: string
  existingLoans: string
  creditCardDebt: string
  
  // Step 4: Loan Details
  vehiclePrice: string
  downPayment: string
  loanTenure: string
  preferredBank: string
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  emiratesId: '',
  dateOfBirth: '',
  employmentType: '',
  employerName: '',
  jobTitle: '',
  employmentDuration: '',
  workAddress: '',
  monthlySalary: '',
  additionalIncome: '',
  existingLoans: '',
  creditCardDebt: '',
  vehiclePrice: '',
  downPayment: '',
  loanTenure: '48',
  preferredBank: '',
}

const steps = [
  { id: 1, title: 'Personal Details', icon: User },
  { id: 2, title: 'Employment', icon: Briefcase },
  { id: 3, title: 'Income & Liabilities', icon: DollarSign },
  { id: 4, title: 'Loan Requirements', icon: CreditCard },
]

const nationalities = [
  'UAE National', 'Indian', 'Pakistani', 'Filipino', 'Egyptian', 
  'Jordanian', 'Lebanese', 'British', 'American', 'Other'
]

const employmentTypes = [
  'Salaried - Private Sector',
  'Salaried - Government',
  'Self-Employed',
  'Business Owner',
  'Freelancer'
]

const banks = [
  'No Preference',
  'Emirates NBD',
  'Dubai Islamic Bank',
  'ADCB',
  'Mashreq Bank',
  'RAK Bank',
  'HSBC',
  'Standard Chartered'
]

export default function FinanceEligibilityPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  
  const isArabic = params.locale === 'ar'
  
  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }
  
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'Required'
        if (!formData.lastName) newErrors.lastName = 'Required'
        if (!formData.email) newErrors.email = 'Required'
        if (!formData.phone) newErrors.phone = 'Required'
        if (!formData.nationality) newErrors.nationality = 'Required'
        break
      case 2:
        if (!formData.employmentType) newErrors.employmentType = 'Required'
        if (!formData.employerName) newErrors.employerName = 'Required'
        if (!formData.employmentDuration) newErrors.employmentDuration = 'Required'
        break
      case 3:
        if (!formData.monthlySalary) newErrors.monthlySalary = 'Required'
        break
      case 4:
        if (!formData.vehiclePrice) newErrors.vehiclePrice = 'Required'
        if (!formData.downPayment) newErrors.downPayment = 'Required'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    
    // Simulate API call to Zoho CRM
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }
  
  const InputField = ({ 
    label, 
    field, 
    type = 'text',
    placeholder = '',
    icon: Icon,
    prefix
  }: { 
    label: string
    field: keyof FormData
    type?: string
    placeholder?: string
    icon?: any
    prefix?: string
  }) => (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        )}
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => updateField(field, e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all',
            Icon && 'pl-11',
            prefix && 'pl-14',
            errors[field] && 'border-red-500 focus:ring-red-500'
          )}
        />
      </div>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[field]}
        </p>
      )}
    </div>
  )
  
  const SelectField = ({ 
    label, 
    field, 
    options,
    placeholder = 'Select...'
  }: { 
    label: string
    field: keyof FormData
    options: string[]
    placeholder?: string
  }) => (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        value={formData[field]}
        onChange={(e) => updateField(field, e.target.value)}
        className={cn(
          'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-white',
          errors[field] && 'border-red-500 focus:ring-red-500'
        )}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[field]}
        </p>
      )}
    </div>
  )
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your finance application. Our team will review your details and contact you within 24 hours.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold mb-4">What happens next?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </span>
                    <span>Our team will review your application and verify details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </span>
                    <span>We'll submit to our partner banks for pre-approval</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </span>
                    <span>You'll receive multiple offers to choose from</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">4</span>
                    </span>
                    <span>Select your preferred offer and complete documentation</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>Reference Number:</strong> DL-FIN-{Date.now().toString().slice(-8)}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Save this reference for tracking your application
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={`/${params.locale}/buy/cars`}
                  className="btn-primary"
                >
                  Browse Cars
                </Link>
                <Link 
                  href={`/${params.locale}/finance/calculator`}
                  className="btn-outline"
                >
                  EMI Calculator
                </Link>
              </div>
              
              <p className="text-xs text-muted-foreground mt-8">
                Note: This is a prototype. In production, this would submit to Zoho CRM.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <Link 
            href={`/${params.locale}/finance`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Finance
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Check Your Eligibility</h1>
          <p className="text-lg text-white/80">
            Get pre-approved for car financing in minutes
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center transition-all',
                      currentStep === step.id && 'bg-primary text-white',
                      currentStep > step.id && 'bg-green-500 text-white',
                      currentStep < step.id && 'bg-gray-200 text-gray-500'
                    )}>
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={cn(
                      'text-xs mt-2 font-medium hidden sm:block',
                      currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-full h-1 mx-2 rounded',
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    )} style={{ width: '60px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {currentStep === 1 && 'Tell us about yourself'}
                {currentStep === 2 && 'Your employment information'}
                {currentStep === 3 && 'Your financial details'}
                {currentStep === 4 && 'Specify your loan requirements'}
              </p>
            </div>
            
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="First Name" field="firstName" placeholder="Enter first name" icon={User} />
                  <InputField label="Last Name" field="lastName" placeholder="Enter last name" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="Email Address" field="email" type="email" placeholder="your@email.com" icon={Mail} />
                  <InputField label="Mobile Number" field="phone" placeholder="+971 50 XXX XXXX" icon={Phone} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <SelectField label="Nationality" field="nationality" options={nationalities} />
                  <InputField label="Emirates ID" field="emiratesId" placeholder="784-XXXX-XXXXXXX-X" />
                </div>
                <InputField label="Date of Birth" field="dateOfBirth" type="date" icon={Calendar} />
              </div>
            )}
            
            {/* Step 2: Employment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <SelectField label="Employment Type" field="employmentType" options={employmentTypes} />
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="Employer / Company Name" field="employerName" placeholder="Company name" icon={Building2} />
                  <InputField label="Job Title" field="jobTitle" placeholder="Your position" />
                </div>
                <SelectField 
                  label="Employment Duration" 
                  field="employmentDuration" 
                  options={['Less than 6 months', '6 months - 1 year', '1-2 years', '2-5 years', 'More than 5 years']} 
                />
                <InputField label="Work Address" field="workAddress" placeholder="Office address" icon={MapPin} />
              </div>
            )}
            
            {/* Step 3: Income */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <InputField 
                  label="Monthly Salary (AED)" 
                  field="monthlySalary" 
                  type="number" 
                  placeholder="e.g., 15000"
                  prefix="AED"
                />
                <InputField 
                  label="Additional Monthly Income (Optional)" 
                  field="additionalIncome" 
                  type="number" 
                  placeholder="Rental income, investments, etc."
                  prefix="AED"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField 
                    label="Existing Loan EMIs (Monthly)" 
                    field="existingLoans" 
                    type="number" 
                    placeholder="0"
                    prefix="AED"
                  />
                  <InputField 
                    label="Credit Card Outstanding" 
                    field="creditCardDebt" 
                    type="number" 
                    placeholder="0"
                    prefix="AED"
                  />
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Banks typically approve loans where EMI is less than 50% of your monthly salary.
                  </p>
                </div>
              </div>
            )}
            
            {/* Step 4: Loan Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <InputField 
                  label="Vehicle Price (AED)" 
                  field="vehiclePrice" 
                  type="number" 
                  placeholder="e.g., 100000"
                  prefix="AED"
                />
                <InputField 
                  label="Down Payment (AED)" 
                  field="downPayment" 
                  type="number" 
                  placeholder="Minimum 20% recommended"
                  prefix="AED"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Tenure</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['24', '36', '48', '60'].map(tenure => (
                      <button
                        key={tenure}
                        type="button"
                        onClick={() => updateField('loanTenure', tenure)}
                        className={cn(
                          'py-3 rounded-xl border-2 font-medium transition-all',
                          formData.loanTenure === tenure 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {tenure} months
                      </button>
                    ))}
                  </div>
                </div>
                
                <SelectField label="Preferred Bank (Optional)" field="preferredBank" options={banks} />
                
                {/* Loan Summary */}
                {formData.vehiclePrice && formData.downPayment && (
                  <div className="bg-gray-50 rounded-xl p-6 border">
                    <h4 className="font-semibold mb-4">Estimated Loan Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold text-lg">
                          AED {(parseInt(formData.vehiclePrice) - parseInt(formData.downPayment)).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Estimated EMI</p>
                        <p className="font-semibold text-lg text-primary">
                          AED {Math.round(
                            (parseInt(formData.vehiclePrice) - parseInt(formData.downPayment)) * 
                            (0.0399 / 12) * 
                            Math.pow(1 + 0.0399 / 12, parseInt(formData.loanTenure)) / 
                            (Math.pow(1 + 0.0399 / 12, parseInt(formData.loanTenure)) - 1)
                          ).toLocaleString()}/mo
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      *Based on 3.99% interest rate. Actual rates may vary.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 border rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              ) : (
                <div />
              )}
              
              {currentStep < steps.length ? (
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-medium">Secure</p>
              <p className="text-xs text-muted-foreground">256-bit encryption</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="font-medium">6+ Banks</p>
              <p className="text-xs text-muted-foreground">Partner network</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <p className="font-medium">24h</p>
              <p className="text-xs text-muted-foreground">Pre-approval</p>
            </div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-6">
            By submitting, you agree to our Terms & Conditions and Privacy Policy.
            <br />
            Your data will be shared with our banking partners for loan processing.
          </p>
        </div>
      </div>
    </div>
  )
}
