// Contact Page - Drive Life
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { showrooms } from '@/data/locations'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  ChevronDown
} from 'lucide-react'

export default function ContactPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const isArabic = params.locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    preferredContact: 'call',
    showroom: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Production - Send to Zoho CRM
    setSubmitted(true)
  }
  
  const inquiryTypes = [
    { value: 'general', label: t.typeGeneral },
    { value: 'sales', label: t.typeSales },
    { value: 'service', label: t.typeService },
    { value: 'finance', label: t.typeFinance },
    { value: 'complaint', label: t.typeComplaint },
    { value: 'partnership', label: t.typePartnership },
  ]
  
  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.pageTitle}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t.pageSubtitle}</p>
        </div>
      </div>
      
      {/* Quick Contact Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <a href="tel:+97143001234" className="flex items-center gap-2 hover:text-secondary">
              <Phone className="w-5 h-5 text-secondary" />
              <span className="font-medium">+971 4 300 1234</span>
            </a>
            <a href="mailto:info@drivelife.ae" className="flex items-center gap-2 hover:text-secondary">
              <Mail className="w-5 h-5 text-secondary" />
              <span className="font-medium">info@drivelife.ae</span>
            </a>
            <a 
              href="https://wa.me/971501234567" 
              target="_blank"
              className="flex items-center gap-2 hover:text-green-600"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{t.formTitle}</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.successTitle}</h3>
                  <p className="text-muted-foreground mb-6">{t.successDesc}</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                  >
                    {t.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.inquiryType} *</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      required
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                    >
                      <option value="">{t.selectType}</option>
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.fullName} *</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                        placeholder={t.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.email} *</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                        placeholder={t.emailPlaceholder}
                      />
                    </div>
                  </div>
                  
                  {/* Phone & Preferred Contact */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.phone} *</label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                        placeholder="+971 5X XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.preferredContact}</label>
                      <div className="flex gap-4 pt-2">
                        {[
                          { value: 'call', label: t.call },
                          { value: 'email', label: t.emailOpt },
                          { value: 'whatsapp', label: 'WhatsApp' }
                        ].map(opt => (
                          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio"
                              name="preferredContact"
                              value={opt.value}
                              checked={formData.preferredContact === opt.value}
                              onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                              className="w-4 h-4 text-secondary focus:ring-secondary"
                            />
                            <span className="text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Showroom */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.preferredShowroom}</label>
                    <select 
                      value={formData.showroom}
                      onChange={(e) => setFormData({...formData, showroom: e.target.value})}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                    >
                      <option value="">{t.anyShowroom}</option>
                      {showrooms.map(s => (
                        <option key={s.id} value={s.slug}>
                          {isArabic ? s.nameAr : s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.message} *</label>
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary resize-none"
                      placeholder={t.messagePlaceholder}
                    />
                  </div>
                  
                  {/* Submit */}
                  <button type="submit" className="btn-secondary w-full flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    {t.submitBtn}
                  </button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    {t.responseNote}
                  </p>
                </form>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Showroom Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                {t.ourLocations}
              </h3>
              
              <div className="space-y-4">
                {showrooms.map(showroom => (
                  <Link 
                    key={showroom.id}
                    href={`/${params.locale}/locations/${showroom.slug}`}
                    className="block p-4 border rounded-xl hover:border-secondary hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold mb-1">
                      {isArabic ? showroom.nameAr : showroom.name}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {isArabic ? showroom.addressAr : showroom.address}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <a 
                        href={`tel:${showroom.phone}`}
                        className="text-secondary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {showroom.phone}
                      </a>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link 
                href={`/${params.locale}/locations`}
                className="btn-outline w-full mt-4"
              >
                {t.viewAllLocations}
              </Link>
            </div>
            
            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                {t.workingHours}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>{t.satWed}</span>
                  <span className="font-medium">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.thursday}</span>
                  <span className="font-medium">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.friday}</span>
                  <span className="font-medium">2:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>
            
            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">{t.quickResponse}</h3>
              <p className="text-sm opacity-90 mb-4">{t.whatsappDesc}</p>
              <a 
                href="https://wa.me/971501234567"
                target="_blank"
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 hover:bg-green-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t.startChat}
              </a>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{t.faqTitle}</h2>
            <p className="text-muted-foreground">{t.faqSubtitle}</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50"
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Map Embed */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t.findUs}</h2>
          <div className="bg-gray-200 rounded-2xl overflow-hidden h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.89784006210938!3d25.076280399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1705591234567"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const translations = {
  en: {
    pageTitle: 'Contact Us',
    pageSubtitle: 'We\'re here to help. Reach out to us through any channel.',
    formTitle: 'Send Us a Message',
    inquiryType: 'Inquiry Type',
    selectType: 'Select inquiry type',
    typeGeneral: 'General Inquiry',
    typeSales: 'Sales Inquiry',
    typeService: 'Service Booking',
    typeFinance: 'Financing Question',
    typeComplaint: 'Complaint',
    typePartnership: 'Partnership',
    fullName: 'Full Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email Address',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone Number',
    preferredContact: 'Preferred Contact Method',
    call: 'Call',
    emailOpt: 'Email',
    preferredShowroom: 'Preferred Showroom',
    anyShowroom: 'Any Showroom',
    message: 'Message',
    messagePlaceholder: 'How can we help you?',
    submitBtn: 'Send Message',
    responseNote: 'We typically respond within 24 hours during business days.',
    successTitle: 'Message Sent!',
    successDesc: 'Thank you for contacting us. Our team will get back to you within 24 hours.',
    sendAnother: 'Send Another Message',
    ourLocations: 'Our Locations',
    viewAllLocations: 'View All Locations',
    workingHours: 'Working Hours',
    satWed: 'Saturday - Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    quickResponse: 'Need Quick Response?',
    whatsappDesc: 'Chat with our team instantly on WhatsApp for immediate assistance.',
    startChat: 'Start Chat',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find quick answers to common questions',
    faq1Q: 'How can I book a test drive?',
    faq1A: 'You can book a test drive through our website by visiting the car detail page and clicking "Book Test Drive", or contact us directly via phone or WhatsApp.',
    faq2Q: 'What documents do I need to buy a car?',
    faq2A: 'You\'ll need a valid Emirates ID, passport with residence visa, and driver\'s license. For financing, additional documents like salary certificate and bank statements may be required.',
    faq3Q: 'Do you offer home delivery?',
    faq3A: 'Yes! We offer complimentary delivery within Dubai and Abu Dhabi emirates. Delivery to other emirates can be arranged for a small fee.',
    faq4Q: 'What warranty do certified cars come with?',
    faq4A: 'All our certified pre-owned vehicles come with a minimum 1-year warranty covering major mechanical components. Extended warranties up to 3 years are available.',
    faq5Q: 'Can I trade in my current car?',
    faq5A: 'Absolutely! We accept trade-ins from all makes and models. Visit our Trade-in page to get an instant valuation for your vehicle.',
    faq6Q: 'What financing options are available?',
    faq6A: 'We partner with 6+ major UAE banks offering competitive rates starting from 3.49%. Terms range from 12 to 84 months with flexible down payment options.',
    findUs: 'Find Us on the Map',
  },
  ar: {
    pageTitle: 'اتصل بنا',
    pageSubtitle: 'نحن هنا للمساعدة. تواصل معنا عبر أي قناة.',
    formTitle: 'أرسل لنا رسالة',
    inquiryType: 'نوع الاستفسار',
    selectType: 'اختر نوع الاستفسار',
    typeGeneral: 'استفسار عام',
    typeSales: 'استفسار مبيعات',
    typeService: 'حجز صيانة',
    typeFinance: 'سؤال عن التمويل',
    typeComplaint: 'شكوى',
    typePartnership: 'شراكة',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'your@email.com',
    phone: 'رقم الهاتف',
    preferredContact: 'طريقة التواصل المفضلة',
    call: 'اتصال',
    emailOpt: 'بريد',
    preferredShowroom: 'المعرض المفضل',
    anyShowroom: 'أي معرض',
    message: 'الرسالة',
    messagePlaceholder: 'كيف يمكننا مساعدتك؟',
    submitBtn: 'إرسال الرسالة',
    responseNote: 'نرد عادة خلال 24 ساعة في أيام العمل.',
    successTitle: 'تم إرسال الرسالة!',
    successDesc: 'شكراً لتواصلك معنا. سيتواصل فريقنا معك خلال 24 ساعة.',
    sendAnother: 'إرسال رسالة أخرى',
    ourLocations: 'فروعنا',
    viewAllLocations: 'عرض جميع الفروع',
    workingHours: 'ساعات العمل',
    satWed: 'السبت - الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    quickResponse: 'تحتاج رد سريع؟',
    whatsappDesc: 'تحدث مع فريقنا فوراً عبر واتساب للحصول على مساعدة فورية.',
    startChat: 'ابدأ المحادثة',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'اعثر على إجابات سريعة للأسئلة الشائعة',
    faq1Q: 'كيف يمكنني حجز تجربة قيادة؟',
    faq1A: 'يمكنك حجز تجربة قيادة من خلال موقعنا بزيارة صفحة تفاصيل السيارة والنقر على "حجز تجربة قيادة"، أو التواصل معنا مباشرة عبر الهاتف أو واتساب.',
    faq2Q: 'ما هي المستندات المطلوبة لشراء سيارة؟',
    faq2A: 'ستحتاج إلى هوية إماراتية سارية وجواز سفر مع تأشيرة إقامة ورخصة قيادة. للتمويل، قد تكون هناك حاجة لمستندات إضافية مثل شهادة الراتب وكشوف الحساب البنكية.',
    faq3Q: 'هل تقدمون خدمة التوصيل للمنزل؟',
    faq3A: 'نعم! نقدم توصيلاً مجانياً داخل إمارتي دبي وأبوظبي. يمكن ترتيب التوصيل لإمارات أخرى مقابل رسوم بسيطة.',
    faq4Q: 'ما هو الضمان المقدم للسيارات المعتمدة؟',
    faq4A: 'جميع سياراتنا المعتمدة تأتي مع ضمان لمدة سنة على الأقل يغطي المكونات الميكانيكية الرئيسية. الضمان الممتد حتى 3 سنوات متاح.',
    faq5Q: 'هل يمكنني استبدال سيارتي الحالية؟',
    faq5A: 'بالتأكيد! نقبل استبدال جميع الماركات والموديلات. قم بزيارة صفحة الاستبدال للحصول على تقييم فوري لسيارتك.',
    faq6Q: 'ما هي خيارات التمويل المتاحة؟',
    faq6A: 'نتعاون مع 6+ من البنوك الإماراتية الكبرى بأسعار تنافسية تبدأ من 3.49%. تتراوح المدة من 12 إلى 84 شهراً مع خيارات دفعة مقدمة مرنة.',
    findUs: 'موقعنا على الخريطة',
  }
}
