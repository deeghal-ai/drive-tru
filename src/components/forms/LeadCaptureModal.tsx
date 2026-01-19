'use client'

import { useState, useEffect, useRef } from 'react'
import { X, MessageCircle, CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type LeadType = 'whatsapp' | 'test-drive'
type Step = 'form' | 'otp' | 'success'

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  type: LeadType
  locale: string
  carInfo?: {
    make: string
    model: string
    year: number
    vin: string
  }
  redirectToWhatsApp?: boolean
  whatsAppMessage?: string
}

export function LeadCaptureModal({ 
  isOpen, 
  onClose, 
  type, 
  locale,
  carInfo,
  redirectToWhatsApp = false,
  whatsAppMessage = "Hi, I'm interested in your cars"
}: LeadCaptureModalProps) {
  const isArabic = locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  
  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('form')
        setName('')
        setPhone('')
        setOtp(['', '', '', ''])
        setError('')
      }, 300)
    }
  }, [isOpen])
  
  // Auto-focus first OTP input when step changes to OTP
  useEffect(() => {
    if (step === 'otp' && otpRefs[0].current) {
      otpRefs[0].current.focus()
    }
  }, [step])
  
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name.trim()) {
      setError(t.nameRequired)
      return
    }
    
    if (!phone.trim() || phone.length < 9) {
      setError(t.phoneRequired)
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setStep('otp')
  }
  
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }
    
    if (value && !/^\d$/.test(value)) {
      return
    }
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus()
    }
  }
  
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus()
    }
  }
  
  const handleVerifyOtp = async () => {
    setError('')
    
    const otpValue = otp.join('')
    if (otpValue.length !== 4) {
      setError(t.otpRequired)
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call - Accept any 4-digit OTP for prototype
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    
    // TODO: Production - Actually verify OTP via SMS gateway
    console.log('Lead captured:', {
      type,
      name,
      phone,
      car: carInfo,
      timestamp: new Date().toISOString()
    })
    
    // If redirectToWhatsApp is true, open WhatsApp to business number and close modal
    if (redirectToWhatsApp) {
      const businessPhone = '971501234567' // Drive Tru business WhatsApp
      const messageWithName = `${whatsAppMessage}\n\nName: ${name}\nPhone: +971${phone}`
      const encodedMessage = encodeURIComponent(messageWithName)
      window.open(`https://wa.me/${businessPhone}?text=${encodedMessage}`, '_blank')
      onClose()
      return
    }
    
    setStep('success')
  }
  
  const handleResendOtp = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsLoading(false)
    setOtp(['', '', '', ''])
    otpRefs[0].current?.focus()
    // In production: resend OTP via SMS gateway
  }
  
  if (!isOpen) return null
  
  const title = type === 'whatsapp' ? t.whatsappTitle : t.testDriveTitle
  const subtitle = type === 'whatsapp' ? t.whatsappSubtitle : t.testDriveSubtitle
  const Icon = type === 'whatsapp' ? MessageCircle : CalendarCheck
  const iconBgClass = type === 'whatsapp' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        
        {/* Header */}
        <div className="pt-8 pb-4 px-6 text-center">
          <div className={cn(
            "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
            step === 'success' ? 'bg-green-100' : iconBgClass
          )}>
            {step === 'success' ? (
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            ) : (
              <Icon className="w-8 h-8" />
            )}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900">
            {step === 'success' ? t.successTitle : title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {step === 'success' 
              ? t.successSubtitle 
              : step === 'otp' 
                ? `${t.otpSentTo} ${phone}`
                : subtitle
            }
          </p>
          
          {carInfo && step !== 'success' && (
            <div className="mt-3 inline-block px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
              {carInfo.year} {carInfo.make} {carInfo.model}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="px-6 pb-8">
          {step === 'form' && (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.phoneNumber}
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600">
                    <span className="text-lg mr-1">🇦🇪</span>
                    <span>+971</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={t.phonePlaceholder}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                    maxLength={10}
                  />
                </div>
              </div>
              
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
                  type === 'whatsapp' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-secondary hover:bg-secondary/90',
                  isLoading && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.sending}
                  </>
                ) : (
                  t.continue
                )}
              </button>
              
              <p className="text-xs text-center text-gray-500">
                {t.termsNote}
              </p>
            </form>
          )}
          
          {step === 'otp' && (
            <div className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={cn(
                      "w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl outline-none transition-all",
                      digit 
                        ? 'border-secondary bg-secondary/5' 
                        : 'border-gray-200 focus:border-secondary'
                    )}
                  />
                ))}
              </div>
              
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.join('').length !== 4}
                className={cn(
                  "w-full py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
                  type === 'whatsapp' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-secondary hover:bg-secondary/90',
                  (isLoading || otp.join('').length !== 4) && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.verifying}
                  </>
                ) : (
                  t.verifyOtp
                )}
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">{t.didntReceive}</p>
                <button
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-sm font-medium text-secondary hover:underline disabled:opacity-50"
                >
                  {t.resendOtp}
                </button>
              </div>
              
              <button
                onClick={() => setStep('form')}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                ← {t.changeNumber}
              </button>
            </div>
          )}
          
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="py-4">
                <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type === 'whatsapp' ? t.whatsappSuccess : t.testDriveSuccess}
                </h3>
                <p className="text-gray-600">
                  {type === 'whatsapp' ? t.whatsappSuccessDesc : t.testDriveSuccessDesc}
                </p>
              </div>
              
              {/* CRM Note */}
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">📋</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-800">{t.leadCaptured}</p>
                    <p className="text-xs text-blue-600 mt-0.5">{t.leadCapturedNote}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
              >
                {t.done}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    whatsappTitle: 'Chat on WhatsApp',
    whatsappSubtitle: 'Get instant responses from our team',
    testDriveTitle: 'Book a Test Drive',
    testDriveSubtitle: 'Experience the car before you buy',
    fullName: 'Full Name',
    namePlaceholder: 'Enter your full name',
    phoneNumber: 'Phone Number',
    phonePlaceholder: '50 123 4567',
    continue: 'Continue',
    sending: 'Sending...',
    termsNote: 'By continuing, you agree to our Terms & Privacy Policy',
    nameRequired: 'Please enter your name',
    phoneRequired: 'Please enter a valid phone number',
    otpSentTo: 'We sent a code to',
    otpRequired: 'Please enter the 4-digit code',
    verifyOtp: 'Verify & Continue',
    verifying: 'Verifying...',
    didntReceive: "Didn't receive the code?",
    resendOtp: 'Resend OTP',
    changeNumber: 'Change phone number',
    successTitle: 'Request Submitted!',
    successSubtitle: 'We\'ll be in touch shortly',
    whatsappSuccess: 'WhatsApp Chat Requested',
    whatsappSuccessDesc: 'Our sales team will contact you on WhatsApp within the next 30 minutes.',
    testDriveSuccess: 'Test Drive Booked',
    testDriveSuccessDesc: 'Our team will call you to confirm the date and time.',
    leadCaptured: 'Lead Captured in CRM',
    leadCapturedNote: 'This inquiry has been logged in Zoho CRM for follow-up.',
    done: 'Done',
  },
  ar: {
    whatsappTitle: 'تواصل عبر واتساب',
    whatsappSubtitle: 'احصل على ردود فورية من فريقنا',
    testDriveTitle: 'حجز تجربة قيادة',
    testDriveSubtitle: 'جرب السيارة قبل الشراء',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك الكامل',
    phoneNumber: 'رقم الهاتف',
    phonePlaceholder: '50 123 4567',
    continue: 'متابعة',
    sending: 'جاري الإرسال...',
    termsNote: 'بالمتابعة، أنت توافق على الشروط وسياسة الخصوصية',
    nameRequired: 'يرجى إدخال اسمك',
    phoneRequired: 'يرجى إدخال رقم هاتف صحيح',
    otpSentTo: 'تم إرسال الرمز إلى',
    otpRequired: 'يرجى إدخال الرمز المكون من 4 أرقام',
    verifyOtp: 'تحقق ومتابعة',
    verifying: 'جاري التحقق...',
    didntReceive: 'لم تستلم الرمز؟',
    resendOtp: 'إعادة إرسال الرمز',
    changeNumber: 'تغيير رقم الهاتف',
    successTitle: 'تم إرسال الطلب!',
    successSubtitle: 'سنتواصل معك قريباً',
    whatsappSuccess: 'تم طلب محادثة واتساب',
    whatsappSuccessDesc: 'سيتواصل معك فريق المبيعات عبر واتساب خلال 30 دقيقة.',
    testDriveSuccess: 'تم حجز تجربة القيادة',
    testDriveSuccessDesc: 'سيتصل بك فريقنا لتأكيد الموعد.',
    leadCaptured: 'تم تسجيل العميل المحتمل',
    leadCapturedNote: 'تم تسجيل هذا الاستفسار في Zoho CRM للمتابعة.',
    done: 'تم',
  }
}
