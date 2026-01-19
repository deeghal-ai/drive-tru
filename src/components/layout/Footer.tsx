import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const isArabic = locale === 'ar'
  const t = isArabic ? translations.ar : translations.en
  
  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-xl">
                DL
              </div>
              <span className="font-bold text-xl">Drive Life</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t.tagline}
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/buy/cars`} className="text-gray-400 hover:text-white">{t.browseCars}</Link></li>
              <li><Link href={`/${locale}/sell/valuation`} className="text-gray-400 hover:text-white">{t.sellYourCar}</Link></li>
              <li><Link href={`/${locale}/finance`} className="text-gray-400 hover:text-white">{t.financing}</Link></li>
              <li><Link href={`/${locale}/offers`} className="text-gray-400 hover:text-white">{t.offers}</Link></li>
              <li><Link href={`/${locale}/about`} className="text-gray-400 hover:text-white">{t.aboutUs}</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.support}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/tools/contact`} className="text-gray-400 hover:text-white">{t.contactUs}</Link></li>
              <li><Link href={`/${locale}/locations`} className="text-gray-400 hover:text-white">{t.locations}</Link></li>
              <li><Link href={`/${locale}/faq`} className="text-gray-400 hover:text-white">{t.faq}</Link></li>
              <li><Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white">{t.privacy}</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white">{t.terms}</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.contactInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 text-secondary" />
                <a href="tel:+97143001234" className="hover:text-white">+971 4 300 1234</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:info@drivelife.ae" className="hover:text-white">info@drivelife.ae</a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>{t.address}</span>
              </li>
            </ul>
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/971501234567" 
              target="_blank"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>{t.copyright}</p>
            <div className="flex gap-4">
              <Link href={`/${locale}/privacy`} className="hover:text-white">{t.privacy}</Link>
              <Link href={`/${locale}/terms`} className="hover:text-white">{t.terms}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const translations = {
  en: {
    tagline: 'Your trusted destination for certified pre-owned vehicles in the UAE.',
    quickLinks: 'Quick Links',
    browseCars: 'Browse Cars',
    sellYourCar: 'Sell Your Car',
    financing: 'Financing',
    offers: 'Offers',
    aboutUs: 'About Us',
    support: 'Support',
    contactUs: 'Contact Us',
    locations: 'Our Locations',
    faq: 'FAQ',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    contactInfo: 'Contact Us',
    address: 'Dubai, United Arab Emirates',
    copyright: '© 2024 Drive Life. All rights reserved.',
  },
  ar: {
    tagline: 'وجهتك الموثوقة للسيارات المستعملة المعتمدة في الإمارات.',
    quickLinks: 'روابط سريعة',
    browseCars: 'تصفح السيارات',
    sellYourCar: 'بيع سيارتك',
    financing: 'التمويل',
    offers: 'العروض',
    aboutUs: 'عن الشركة',
    support: 'الدعم',
    contactUs: 'اتصل بنا',
    locations: 'فروعنا',
    faq: 'الأسئلة الشائعة',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
    contactInfo: 'معلومات الاتصال',
    address: 'دبي، الإمارات العربية المتحدة',
    copyright: '© 2024 درايف لايف. جميع الحقوق محفوظة.',
  }
}
